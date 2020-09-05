import * as crypto from 'crypto';
import {
    CompressionFn,
    createCustomMDCompressionFunction,
    createCustomMDHashFunction,
    findCollisionPair,
    findCollisionPairForCascadedMDHashFunction,
    generateCollisions, HashFn
} from './challenge52';

describe('Challenge 52', () => {
   describe('Custom MD hash function', () => {
       let customMDHash: HashFn;

       beforeEach(() => {
           const customMDCompressionFn = createCustomMDCompressionFunction(2);
           customMDHash = createCustomMDHashFunction(customMDCompressionFn);
       });

       it('should compute digest of "random string"', () => {
            const input = Buffer.from('random string');
            const state = crypto.randomBytes(2);

            const digest = customMDHash(input, state); // TEST

            expect(digest).not.toBeNull();
            expect(digest.length).toEqual(2)
        });
   });

   describe('Find collision', () => {
       let customMDCompressionFn: CompressionFn;
       let customMDHash: HashFn;

       beforeEach(() => {
           customMDCompressionFn = createCustomMDCompressionFunction(2);
           customMDHash = createCustomMDHashFunction(customMDCompressionFn);
       });

       it('should find pair of messages with the same digest for "custom MD hash function"', () => {
           const initialState = crypto.randomBytes(2);

           const result = findCollisionPair(2, initialState, customMDCompressionFn); // TEST

           expect(result.msgPair.msg1).not.toEqual(result.msgPair.msg2);
           expect(customMDHash(initialState, result.msgPair.msg1)).toEqual(customMDHash(initialState, result.msgPair.msg2));
       });
   });

   describe('Generate 2^n collisions', () => {
       let customMDHash: HashFn;

       beforeEach(() => {
           const customMDCompressionFn = createCustomMDCompressionFunction(2);
           customMDHash = createCustomMDHashFunction(customMDCompressionFn);
       });

       it('should generate 8 collisions', () => {
           const collisions = generateCollisions(3, 2, customMDHash); // TEST

           expect(collisions.messages.length).toEqual(8);

           const digest = customMDHash(collisions.state, collisions.messages[0]);
           expect(collisions.messages.every((msg) => customMDHash(collisions.state, msg).equals(digest))).toEqual(true);
       });
   });

   xdescribe('Cascaded hash function', () => {
       let cheapMDHashFnDigestSize: number;
       let cheapMDCompressionFn: CompressionFn;
       let cheapMDHashFn: HashFn;
       let expensiveMDHashFnDigestSize: number;
       let expensiveMDCompressionFn: CompressionFn;
       let expensiveMDHashFn: HashFn;

       beforeEach(() => {
           cheapMDHashFnDigestSize = 2;
           cheapMDCompressionFn = createCustomMDCompressionFunction(cheapMDHashFnDigestSize);
           cheapMDHashFn = createCustomMDHashFunction(cheapMDCompressionFn);
           expensiveMDHashFnDigestSize = 4;
           expensiveMDCompressionFn = createCustomMDCompressionFunction(expensiveMDHashFnDigestSize);
           expensiveMDHashFn = createCustomMDHashFunction(expensiveMDCompressionFn);
       });

       it('should find collision for both functions', () => {
          const result = findCollisionPairForCascadedMDHashFunction(
              cheapMDCompressionFn, cheapMDHashFnDigestSize, expensiveMDCompressionFn, expensiveMDHashFnDigestSize); // TEST

          expect(cheapMDHashFn(result.state, result.msgPair.msg1)).toEqual(cheapMDHashFn(result.state, result.msgPair.msg2));
          expect(expensiveMDHashFn(result.state, result.msgPair.msg1)).toEqual(expensiveMDHashFn(result.state, result.msgPair.msg2));
       });
   });
});