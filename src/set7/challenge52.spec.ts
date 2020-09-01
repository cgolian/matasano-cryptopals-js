import * as crypto from 'crypto';
import {
    createCustomMDHashFunction,
    findCollisionPair,
    findCollisionPairForCascadedMDHashFunction,
    generateCollisions
} from './challenge52';

describe('Challenge 52', () => {
   describe('Custom MD hash function', () => {
       let customMDHash: (state: Buffer, input: Buffer) => Buffer;

       beforeEach(() => {
           customMDHash = createCustomMDHashFunction(2);
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
       let customMDHash: (state: Buffer, input: Buffer) => Buffer;

       beforeEach(() => {
           customMDHash = createCustomMDHashFunction(2);
       });

       it('should find pair of messages with the same digest for "custom MD hash function"', () => {
           const initialState = crypto.randomBytes(2);

           const result = findCollisionPair(2, (msg: Buffer) => customMDHash(initialState, msg)); // TEST

           expect(result.msgPair.msg1).not.toEqual(result.msgPair.msg2);
           expect(customMDHash(initialState, result.msgPair.msg1)).toEqual(customMDHash(initialState, result.msgPair.msg2));
       });
   });

   describe('Generate 2^n collisions', () => {
       let customMDHash: (state: Buffer, input: Buffer) => Buffer;

       beforeEach(() => {
           customMDHash = createCustomMDHashFunction(2);
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
       let cheapMDHashFn: (state: Buffer, input: Buffer) => Buffer;
       let expensiveMDHashFnDigestSize: number;
       let expensiveMDHashFn: (state: Buffer, input: Buffer) => Buffer;

       beforeEach(() => {
           cheapMDHashFnDigestSize = 2;
           cheapMDHashFn = createCustomMDHashFunction(cheapMDHashFnDigestSize);
           expensiveMDHashFnDigestSize = 4;
           expensiveMDHashFn = createCustomMDHashFunction(expensiveMDHashFnDigestSize);
       });

       it('should find collision for both functions', () => {
          const result = findCollisionPairForCascadedMDHashFunction(
               cheapMDHashFn, cheapMDHashFnDigestSize, expensiveMDHashFn, expensiveMDHashFnDigestSize); // TEST

          expect(cheapMDHashFn(result.state, result.msgPair.msg1)).toEqual(cheapMDHashFn(result.state, result.msgPair.msg2));
          expect(expensiveMDHashFn(result.state, result.msgPair.msg1)).toEqual(expensiveMDHashFn(result.state, result.msgPair.msg2));
       });
   });
});