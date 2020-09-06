import * as crypto from 'crypto';
import {CompressionFn, DigestDictionary} from './challenge52';
import {AES_128_BLOCK_LENGTH_BYTES} from '../set1/challenge7';
import {splitIntoBlocks} from '../set1/challenge6';

export type DifferingLengthCollisionPair = {
    shortMsgBlock: Buffer;
    longMsgBlock: Buffer;
    digest: Buffer;
}

export function findCollisionForMessagesOfDifferentLength(
    inputState: Buffer,
    dummyBlocks: Buffer[],
    digestSizeInBytes: number,
    compressionFn: CompressionFn
): DifferingLengthCollisionPair {
    // compute hash of dummy blocks
    let curBlockDigest = inputState;
        for (let bIdx = 0; bIdx < dummyBlocks.length; bIdx++) {
        curBlockDigest = compressionFn(curBlockDigest, dummyBlocks[bIdx]);
    }
    let collisionPair: DifferingLengthCollisionPair | null = null;
    do {
        // generate 2^(n/2) different messages
        const msgs = Array(Math.pow(2, (digestSizeInBytes / 2) * 8));
        let msg: Buffer;
        for (let i = 0; i < msgs.length; i++) {
            msg = crypto.randomBytes(AES_128_BLOCK_LENGTH_BYTES);
            msgs[i] = msg;
        }
        // compute their hashes & look for a collision
        const inputStateDigests: DigestDictionary = {};
        const intermediateStateDigests: DigestDictionary = {};
        let curInputStateDigestHex: string, curIntermediateStateDigestHex: string;
        for (let i = 0; i < msgs.length; i++) {
            curInputStateDigestHex = compressionFn(inputState, msgs[i]).toString('hex');
            curIntermediateStateDigestHex = compressionFn(curBlockDigest, msgs[i]).toString('hex');
            if (inputStateDigests[curIntermediateStateDigestHex]) {
                collisionPair = {
                    shortMsgBlock: Buffer.from(inputStateDigests[curIntermediateStateDigestHex], 'hex'),
                    longMsgBlock: Buffer.from(msgs[i], 'hex'),
                    digest: Buffer.from(curIntermediateStateDigestHex, 'hex')
                };
                break;
            } else if (intermediateStateDigests[curInputStateDigestHex]) {
                collisionPair = {
                    shortMsgBlock: Buffer.from(msgs[i], 'hex'),
                    longMsgBlock: Buffer.from(intermediateStateDigests[curInputStateDigestHex], 'hex'),
                    digest: Buffer.from(curInputStateDigestHex, 'hex')
                };
                break;
            }
            inputStateDigests[curInputStateDigestHex] = msgs[i].toString('hex');
            intermediateStateDigests[curIntermediateStateDigestHex] = msgs[i].toString('hex');
        }
    } while (!collisionPair);
    return collisionPair;
}

export type ExpandableMessageBlock = {
    shortMsg: Buffer;
    longMsg: Buffer;
    state: Buffer;
}

export function createExpandableMessage(
    k: number,
    initialState: Buffer,
    digestSizeInBytes: number,
    compressionFn: CompressionFn,
): ExpandableMessageBlock[] {
    const pairs: ExpandableMessageBlock[] = Array(k);
    // create dummy blocks
    const dummyBlock = Buffer.alloc(AES_128_BLOCK_LENGTH_BYTES, 0xFF);
    const dummyBlocksArr = Array(Math.pow(2, k-1));
    for (let i = 0; i < dummyBlocksArr.length; i++) dummyBlocksArr[i] = dummyBlock;
    let collisionPair: DifferingLengthCollisionPair, dummyBlocks: Buffer[], numOfDummyBlocks: number;
    let curBlockDigest = initialState;
    for (let i = k-1; i >= 0; i--) {
        numOfDummyBlocks = Math.pow(2, i);
        dummyBlocks = dummyBlocksArr.slice(0, numOfDummyBlocks);
        collisionPair = findCollisionForMessagesOfDifferentLength(curBlockDigest, dummyBlocks, digestSizeInBytes, compressionFn);
        pairs[i] = {
            longMsg: Buffer.concat([...dummyBlocks, collisionPair.longMsgBlock]),
            shortMsg: Buffer.concat([collisionPair.shortMsgBlock]),
            state: curBlockDigest
        };
        curBlockDigest = collisionPair.digest;
    }
    return pairs;
}

function createPreimage(
    expandableMessageBlocks: ExpandableMessageBlock[],
    linkIdx: number,
    linkingBlock: Buffer,
    originalMsgBlocks: Buffer[]
): Buffer {
    const preimageMsgBlocks = Array(originalMsgBlocks.length);
    // copy linking block
    preimageMsgBlocks[linkIdx - 1] = linkingBlock;
    // copy blocks of the original message
    for (let i = linkIdx; i < originalMsgBlocks.length; i++) {
        preimageMsgBlocks[i] = originalMsgBlocks[i];
    }
    // copy (and expand prefix blocks)
    const numOfMissingBlocks = linkIdx - 1 - expandableMessageBlocks.length;
    let prefixBlockIdx = 0;
    let expandedBlocks: Buffer[];
    for (let i = 0; i < expandableMessageBlocks.length; i++) {
        if (numOfMissingBlocks & (1 << i)) {
            expandedBlocks = splitIntoBlocks(expandableMessageBlocks[i].longMsg, AES_128_BLOCK_LENGTH_BYTES);
            for (let j = 0; j < expandedBlocks.length; j++) {
                preimageMsgBlocks[prefixBlockIdx++] = expandedBlocks[j];
            }
        } else {
            preimageMsgBlocks[prefixBlockIdx++] = expandableMessageBlocks[i].shortMsg;
        }
    }
    return Buffer.concat(preimageMsgBlocks);
}

export function findSecondPreimageForLongMessage(
    msg: Buffer,
    initialState: Buffer,
    digestSizeInBytes: number,
    compressionFn: CompressionFn,
): Buffer {
    const msgBlocks = splitIntoBlocks(msg, AES_128_BLOCK_LENGTH_BYTES);
    // 1. Generate an expandable message of length (k, k + 2^k - 1) using the strategy outlined above
    const k = Math.ceil(Math.log2(msgBlocks.length));
    const expandableMessageBlocks = createExpandableMessage(k, initialState, digestSizeInBytes, compressionFn);
    const digestBlockIdxMap: { [key: string]: number } = {};
    let digest = initialState;
    // 2. Hash M and generate a map of intermediate hash states to the block indices that they correspond to.
    for (let bIdx = k+1; bIdx < msgBlocks.length; bIdx++) {
        digestBlockIdxMap[digest.toString('hex')] = bIdx;
        digest = compressionFn(digest, msgBlocks[bIdx]);
    }
    // 3. From your expandable message's final state, find a single-block "bridge" to intermediate state in your map.
    const finalState = compressionFn(
        expandableMessageBlocks[expandableMessageBlocks.length - 1].state,
        expandableMessageBlocks[expandableMessageBlocks.length - 1].shortMsg
    );
    let linkingBlock: Buffer | null = null, linkingDigest: Buffer, linkIdx = null;
    do {
        const numOfAttempts = Math.pow(2, (digestSizeInBytes * 8) - k);
        for (let i = 0; i < numOfAttempts; i++) {
            linkingBlock = crypto.randomBytes(AES_128_BLOCK_LENGTH_BYTES);
            linkingDigest = compressionFn(finalState, linkingBlock);
            if (digestBlockIdxMap[linkingDigest.toString('hex')]) {
                // Note the index i it maps to.
                linkIdx = digestBlockIdxMap[linkingDigest.toString('hex')];
                break;
            }
        }
    } while (!linkIdx || !linkingBlock);
    // 4. Use your expandable message to generate a prefix of the right length such that len(prefix || bridge || M[i..]) = len(M).
    return createPreimage(expandableMessageBlocks, linkIdx, linkingBlock, msgBlocks);
}