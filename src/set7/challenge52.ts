import {padBlockPKCS7} from '../set2/challenge9';
import {
    AES_128_BLOCK_LENGTH_BYTES
} from '../set1/challenge7';
import {splitIntoBlocks} from '../set1/challenge6';
import * as crypto from 'crypto';
import { padMessageMD } from '../set4/challenge29';

export type MsgPair = {
    msg1: Buffer;
    msg2: Buffer;
};

export type CollisionPair = {
    msgPair: MsgPair;
    digest: Buffer;
};

export function createCustomMDHashFunction(digestSizeInBytes: number): (state: Buffer, input: Buffer) => Buffer {
    if (digestSizeInBytes > AES_128_BLOCK_LENGTH_BYTES) throw Error(`Unsupported digest size`);
    return function customMDHash(state: Buffer, input: Buffer): Buffer {
        const padded = padMessageMD(input, AES_128_BLOCK_LENGTH_BYTES * 8, 'BE');
        const blocks = splitIntoBlocks(padded, AES_128_BLOCK_LENGTH_BYTES);
        let digest = state, key, encrypted;
        let cipher;
        for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
            key = padBlockPKCS7(digest, AES_128_BLOCK_LENGTH_BYTES);
            cipher = crypto.createCipheriv('aes-128-ecb', key, null);
            encrypted = Buffer.concat([cipher.update(blocks[bIdx]), cipher.final()]);
            digest = encrypted.slice(0, digestSizeInBytes);
        }
        return digest;
    }
}

/**
 * Find a pair of messages having the same digest
 * @param digestSizeInBytes digest size in bytes
 * @param hashFn hash function used in computing the digest
 */
export function findCollisionPair(
    digestSizeInBytes: number,
    hashFn: (msg: Buffer) => Buffer
): CollisionPair {
    const q = Math.pow(2, Math.ceil((digestSizeInBytes * 8) / 2));
    let collision: CollisionPair | null = null;
    while (!collision) {
        // generate random messages
        const msgs = Array(q);
        for (let i = 0; i <= q; i++) {
            msgs[i] = crypto.randomBytes(AES_128_BLOCK_LENGTH_BYTES);
        }
        // compute their hashes
        const digestDict: { [key: string]: string } = {};
        let hexDigest, curMsgHex, matchingDigestMsgHex;
        for (let i = 0; i < q; i++) {
            hexDigest = hashFn(msgs[i]).toString('hex');
            curMsgHex = msgs[i].toString('hex');
            // and look for collisions
            if (digestDict[hexDigest]) {
                matchingDigestMsgHex = digestDict[hexDigest];
                if (matchingDigestMsgHex != curMsgHex) {
                    collision = {
                        msgPair: {
                            msg1: Buffer.from(curMsgHex, 'hex'),
                            msg2: Buffer.from(matchingDigestMsgHex, 'hex')
                        },
                        digest: Buffer.from(hexDigest, 'hex')
                    }
                    break;
                }
            }
            digestDict[hexDigest] = curMsgHex;
        }
    }
    return collision;
}

export type Collisions = {
    messages: Buffer[];
    state: Buffer;
}

/**
 * Generate 2^t collisions for given hash function
 * @param t
 * @param digestSizeInBytes digest size
 * @param hashFn hash function
 */
export function generateCollisions(
    t: number,
    digestSizeInBytes: number,
    hashFn: (state: Buffer, msg: Buffer) => Buffer
): Collisions {
    const collisionPairs: CollisionPair[] = Array(t);
    const initialState = crypto.randomBytes(digestSizeInBytes);
    let collisionPair: CollisionPair, state: Buffer;
    state = initialState;
    const initializedHashFn: (input: Buffer) => Buffer = msg => hashFn(state, msg);
    // make t calls to the "collision finding machine"
    for (let i = 0; i < t; i++) {
        collisionPair = findCollisionPair(digestSizeInBytes, initializedHashFn);
        state = collisionPair.digest;
        // save blocks b_i and b'_i
        collisionPairs[i] = collisionPair;
    }
    // construct 2^t messages from stored blocks
    const numOfMsgs = Math.pow(2, t), generatedMsgs: Buffer[] = Array(numOfMsgs), msg: Buffer[] = Array(t);
    let block1: Buffer, block2: Buffer;
    for (let i = 0; i < numOfMsgs; i++) {
        for (let j = 0; j < t; j++) {
            block1 = padMessageMD(collisionPairs[j].msgPair.msg1, AES_128_BLOCK_LENGTH_BYTES * 8, 'BE');
            block2 = padMessageMD(collisionPairs[j].msgPair.msg2, AES_128_BLOCK_LENGTH_BYTES * 8, 'BE');
            msg[j] = (i & (1 << j)) ? block1 : block2;
        }
        generatedMsgs[i] = Buffer.concat(msg);
    }
    return {
        messages: generatedMsgs,
        state: initialState
    };
}

export function findCollisionPairForCascadedMDHashFunction(
    cheapMDHashFn: (state: Buffer, input: Buffer) => Buffer,
    cheapMDHashFnDigestSizeBytes: number,
    expensiveMDHashFn: (state: Buffer, input: Buffer) => Buffer,
    expensiveMDHashFnDigestSizeBytes: number,
): {
    msgPair: MsgPair;
    state: Buffer;
    collisionFnCalls: number;
} {
    let msgPair: MsgPair | null = null, state: Buffer | null = null;
    let collisionForBothFnsFound = false;
    let collisions: Collisions, hashesDict: { [key: string]: string };
    let collisionFnCalls = 0, t;
    while (!collisionForBothFnsFound) {
        t = Math.ceil((expensiveMDHashFnDigestSizeBytes * 8) / 2);
        collisions = generateCollisions(t, cheapMDHashFnDigestSizeBytes, cheapMDHashFn);
        hashesDict = {};
        collisionFnCalls += t;
        let digest: Buffer, hexDigest: string;
        for (let msgIdx = 0; msgIdx < collisions.messages.length; msgIdx++) {
            digest = expensiveMDHashFn(collisions.state, collisions.messages[msgIdx]);
            hexDigest = digest.toString('hex');
            if (hashesDict[hexDigest]) {
                collisionForBothFnsFound = true;
                state = collisions.state;
                msgPair = { msg1: Buffer.from(hashesDict[hexDigest], 'hex'), msg2: collisions.messages[msgIdx] };
                break;
            }
            hashesDict[hexDigest] = collisions.messages[msgIdx].toString('hex');
        }
    }
    if (!msgPair || !state) throw Error(`Could not find collision`);
    return {
        collisionFnCalls,
        state,
        msgPair
    };
}