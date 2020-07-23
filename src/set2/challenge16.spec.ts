import {cbcFlipBits, encryptData, isAdmin} from './challenge16';

describe('Challenge 16', () => {
    describe('CBC flip bits attack', () => {
       let encryptionFn: (userInput: string) => Buffer;
       let validationFn: (ciphertext: Buffer) => boolean;

       beforeEach(() => {
           encryptionFn = encryptData;
           validationFn = isAdmin;
       });

       it('should validate modified ciphertext', () => {
           const result = cbcFlipBits(encryptionFn, validationFn); // TEST

           expect(result).toBeDefined();
       });
    });
});