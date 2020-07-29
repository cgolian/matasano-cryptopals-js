import * as crypto from "crypto";
import {initRSA, RSAKeyPair} from "../set5/challenge39";

export interface PKCS1v1dot5Padder {
    /**
     * Pad input to desired length
     * @param input
     * @param length
     */
    pad(input: Buffer, length: number): Buffer;

    /**
     * Strip padding
     * @param input
     */
    strip(input: Buffer): Buffer;
}

export interface PKCSPaddingOracle {
    /**
     * Return true if RSA encrypted plaintext is padded in PKCS1v1.5 format
     * @param ciphertext
     */
    isPlaintextPadded(ciphertext: Buffer): boolean;
}

export function initPKCSPaddingOracle(rsaKeyPair: RSAKeyPair): PKCSPaddingOracle {
    const rsaFunctions = initRSA(true);

    function isPlaintextPadded(ciphertext: Buffer): boolean {
        const plaintext = rsaFunctions.decryptMessage(ciphertext, rsaKeyPair.privateKey);
        return plaintext[0] == 0x00 && plaintext[1] == 0x02;
    }

    return {
        isPlaintextPadded
    }
}

export function initPKCS1v1dot5Padder(): PKCS1v1dot5Padder {
    function pad(input: Buffer, length: number): Buffer {
        // padded input =  0x00 + 0x02 + eight non-zero bytes (at least) + 0x00 + input
        if ((input.length + 11) > length) {
            throw Error(`Input of length ${input.length} can not be padded to length ${length}`);
        }
        const padded = Buffer.alloc(length);
        padded[0] = 0x00;
        padded[1] = 0x02;
        const msgStart = padded.length - input.length;
        // generate random non-zero bytes
        let randomBytes = crypto.randomBytes(msgStart - 2);
        while (randomBytes.indexOf(0x00) != -1) {
            randomBytes = crypto.randomBytes(msgStart - 2);
        }
        randomBytes.copy(padded, 2);
        padded[msgStart - 1] = 0x00;
        input.copy(padded, padded.length - input.length);
        return padded;
    }

    function strip(input: Buffer): Buffer {
        const msgStart = input.indexOf(0x00, 2);
        if (input[0] != 0x00 || input[1] != 0x02 || msgStart === -1) {
            throw Error(`Input not PKCS1v1.5 padded`);
        }
        return input.slice(msgStart + 1, input.length);
    }

    return {
        pad,
        strip
    }
}