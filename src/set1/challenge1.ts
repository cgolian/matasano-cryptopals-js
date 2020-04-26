const base64Table = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"];

export interface BitArrayConstructor {
    new(nrOfBits: number): BitArray;
}

export interface BitArray {
    readonly length: number;

    setBit(idx: number): void;
    clearBit(idx: number): void;
    getBit(idx: number): 0 | 1;
    getWord(start: number, end: number): number;
}

export class Uint8BitArray implements BitArray {
    readonly bitArray: Uint8Array;
    readonly length: number;

    constructor(nrOfBits: number) {
        this.length = nrOfBits;
        this.bitArray = new Uint8Array(Math.ceil(nrOfBits / 8));
    }

    checkIdxInBounds(idx: number): void {
        if (idx > this.length || idx < 0) {
            throw Error(`Index out of bounds`);
        }
    }

    getBit(idx: number): 0 | 1 {
        this.checkIdxInBounds(idx);
        const rightOffset = (7 - (idx % 8));
        const mask = 1 << rightOffset;
        const bitIdx = Math.floor(idx / 8);
        return (this.bitArray[bitIdx] & mask) === 0 ? 0 : 1;
    }

    setBit(idx: number): void {
        this.checkIdxInBounds(idx);
        const rightOffset = (7 - (idx % 8));
        const mask = 1 << rightOffset;
        const bitIdx = Math.floor(idx / 8);
        this.bitArray[bitIdx] |= mask;
    }

    clearBit(idx: number): void {
        this.checkIdxInBounds(idx);
        const mask = 1 << (7 - (idx));
        const bitIdx = Math.floor(idx / 8);
        this.bitArray[bitIdx] &= ~mask;
    }

    getWord(start: number, end: number): number {
        if ((end - start) >= 8 || (end <= start)) {
            throw Error(`Invalid indices`);
        }
        const endMod8 = end % 8;
        const startWordIdx = Math.floor(start / 8);
        const endWordIdx = Math.floor(end / 8);
        const rightOffset = (7 - endMod8);
        if (startWordIdx != endWordIdx) {
            // word starts in one number and continues in another number
            // retrieve first part of the word
            const firstPartMask = Math.pow(2, (8 - (start % 8))) - 1;
            const firstPart = (this.bitArray[startWordIdx] & firstPartMask) << endMod8 + 1;
            // retrieve second part of the word
            const secondPartMask = (Math.pow(2, endMod8 + 1) - 1) << rightOffset;
            const secondPart = (this.bitArray[endWordIdx] & secondPartMask) >> rightOffset;
            return firstPart + secondPart;
        } else {
            // word is stored in one number
            const mask = (Math.pow(2, (end - start) + 1) - 1) << rightOffset;
            return (this.bitArray[Math.floor(startWordIdx)] & mask) >> rightOffset;
        }
    }
}

export const BitArray: BitArrayConstructor = Uint8BitArray;

function isHexString(input: string): boolean {
    if (input.length % 2 != 0) {
        return false;
    }
    let containsOnlyHexChars = true;
    let curByte;
    for (let chrIdx = 0; chrIdx < input.length; chrIdx++) {
        curByte = input.charCodeAt(chrIdx);
        // input only contains 0...9 or A...F or a...f
        if (!(0x30 <= curByte && curByte <= 0x39) &&
            !(0x41 <= curByte && curByte <= 0x46) &&
            !(0x61 <= curByte && curByte <=  0x66)) {
            containsOnlyHexChars = false;
            break;
        }
    }
    return containsOnlyHexChars;
}

function hexStringToBitArray(hexInput: string): BitArray {
    const bin = new BitArray(hexInput.length * 4);
    let curChr;
    for (let chrIdx = 0; chrIdx < hexInput.length; chrIdx++) {
        curChr = parseInt(hexInput[chrIdx], 16);
        // convert hex digit to four bits
        for (let i = 0; i < 4; i++) {
            const mask = 1 << (3 - i);
            if ((curChr & mask) !== 0) bin.setBit(4 * chrIdx + i);
        }
    }
    return bin;
}

function bitArrayToBase64(bitArray: BitArray): Buffer {
    // output array - use Buffer because of easier conversion to string
    // ratio of output bytes to input bytes 4 : 3
    const output = Buffer.alloc(4*Math.ceil((bitArray.length/8)/3), '=');
    // create bit sextets and look them up in the table
    let outputIdx = 0;
    let curSextet;
    for (let sextetStartIdx = 0; sextetStartIdx < bitArray.length; sextetStartIdx += 6) {
        curSextet = bitArray.getWord(sextetStartIdx, sextetStartIdx + 5);
        output[outputIdx++] = base64Table[curSextet].charCodeAt(0);
    }
    return output;
}

/**
 * Convert hex string to base64
 * @param input hex string
 */
export function hex2Base64(input: string): string {
    if (!isHexString(input)) {
        throw Error(`Input not in hexadecimal format`);
    }
    const bitArray = hexStringToBitArray(input);
    const output = bitArrayToBase64(bitArray);
    return output.toString();
}
