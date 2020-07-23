import {AES_128_BLOCK_LENGTH_BYTES} from './challenge7';

type BlockMap = {
    [block: string]: number;
}

/**
 * Detect ECB mode (always encrypting the same plaintext block as the same ciphertext block) in AES encrypted ciphertext
 * @param aesEncryptedCiphertext
 */
export function isECBEncrypted(aesEncryptedCiphertext: string): {
    result: boolean;
    blocks?: BlockMap;
} {
    const blocksMap: BlockMap = {};
    let result = false;
    for (let byteIdx = 0; byteIdx < aesEncryptedCiphertext.length; byteIdx += AES_128_BLOCK_LENGTH_BYTES) {
        const block = aesEncryptedCiphertext.slice(byteIdx, byteIdx + AES_128_BLOCK_LENGTH_BYTES);
        if (blocksMap[block]) {
            blocksMap[block] = blocksMap[block] + 1;
            result = true;
        } else {
            blocksMap[block] = 1;
        }
    }
    return {
        result,
        blocks: result ? blocksMap : undefined,
    };
}