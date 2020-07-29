import * as crypto from "crypto";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore (dirty hack to bypass "[BigNumber Error] crypto unavailable" error
global.crypto = crypto;
import { BigNumber } from 'bignumber.js';

export const CryptoBigNumber = BigNumber.clone({
    CRYPTO: true, // cryptographically secure PRNG is used
    MODULO_MODE: BigNumber.EUCLID // remainder is always postiive
});

export function sha1(data: string): Buffer {
    return crypto.createHash('sha1')
        .update(data)
        .digest();
}

export function sha256(data: string): Buffer {
    return crypto.createHash('sha256')
        .update(data)
        .digest()
}

export function sha256hmac(data: string, key: string): string {
    return crypto.createHmac('sha256', key)
        .update(data)
        .digest('hex');
}

export function rsaPlaintextNumberToBuffer(plaintextNum: BigNumber): Buffer {
    let plaintextNumStr = plaintextNum.toString(16).slice(1); // strip '1' which was added
    if (plaintextNumStr.length % 2 != 0) {
        plaintextNumStr = '0'.concat(plaintextNumStr);
    }
    return Buffer.from(plaintextNumStr, 'hex');
}