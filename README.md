# matasano-cryptopals-js

// TODO cg check and complete
// TODO cg check links  
This repository contains my (frequently naive, sometimes maybe even plain wrong) solutions to the Matasano Cryptopals Challenges written in Javascript (which the original authors of the challenges probably hated).  

I used (and slightly modified) following implementations of SHA1 and MD4 for challenges 29 and 30:  
* https://github.com/chrisveness/crypto/blob/master/sha1.js
* http://pajhome.org.uk/crypt/md5/md5.html

## Set 1 - Basics

| Challenge                      | Status |Notes |
| -------------------------------|:----:| :-----:|
| 1. Convert hex to base64       | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge1.ts) ||
| 2. Fixed XOR                   | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge2.ts) ||
| 3. Single-byte XOR cipher      | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge3.ts) ||
| 4. Detect single-character XOR | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge4.ts) ||
| 5. Implement repeating-key XOR | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge5.ts) ||
| 6. Break repeating-key XOR     | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge6.ts) ||
| 7. AES in ECB mode             | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge7.ts) ||
| 8. Detect AES in ECB mode      | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set1/challenge8.ts) ||

## Set 2 - Block crypto

| Challenge                                  | Status | Notes  |
| -------------------------------------------|:------:| :-----:|
| 9. Implement PKCS#7 padding                | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge9.ts)   ||
| 10. Implement CBC mode                     | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge10.ts)   ||
| 11. An ECB/CBC detection oracle            | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge11.ts)   ||
| 12. Byte-at-a-time ECB decryption (Simple) | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge12.ts)   ||
| 13. ECB cut-and-paste                      | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge13.ts)   ||
| 14. Byte-at-a-time ECB decryption (Harder) | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge14.ts)   ||
| 15. PKCS#7 padding validation              | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge15.ts)   ||
| 16. CBC bitflipping attacks                | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set2/challenge16.ts)   ||

## Set 3 - Block & stream crypto

| Challenge                                           | Status |Notes |
| ----------------------------------------------------|:-------:| :-----:|
| 17. The CBC padding oracle                          | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge17.ts)    ||
| 18. Implement CTR, the stream cipher mode           | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge18.ts)    ||
| 19. Break fixed-nonce CTR mode using substitutions  | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge19.ts)    ||
| 20. Break fixed-nonce CTR statistically             | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge20.ts)    ||
| 21. Implement the MT19937 Mersenne Twister RNG      | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge21.ts)    ||
| 22. Crack an MT19937 seed                           | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge22.ts)    ||
| 23. Clone an MT19937 RNG from its output            | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge23.ts)    ||
| 24. Create the MT19937 stream cipher and break it   | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set3/challenge24.ts)    ||

## Set 4 - Stream crypto and randomness

| Challenge                                                        | Status  |Notes |
| -----------------------------------------------------------------|:-------:| :-----:|
| 25. Break 'random access read/write' AES CTR                     | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge25.ts)    ||
| 26. CTR bitflipping                                              | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge26.ts)     ||
| 27. Recover the key from CBC with IV=Key                         | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge27.ts)     ||
| 28. Implement a SHA-1 keyed MAC                                  | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge28.ts)     ||
| 29. Break a SHA-1 keyed MAC using length extension               | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge29.ts)     ||
| 30. Break an MD4 keyed MAC using length extension                | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge30.ts)     ||
| 31. Implement and break HMAC-SHA1 with an artificial timing leak | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge31.ts)     ||
| 32. Break HMAC-SHA1 with a slightly less artificial timing leak  | [DONE](https://github.com/cgolian/matasano-cryptopals-js/blob/master/src/set4/challenge32.ts)     |too slow?|

## Set 5 - Diffie-Hellman and friends

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 33. Implement Diffie-Hellman                                                      | WIP    ||
| 34. Implement a MITM key-fixing attack on Diffie-Hellman with parameter injection | WIP    ||
| 35. Implement DH with negotiated groups, and break with malicious 'g' parameters  | WIP    ||
| 36. Implement Secure Remote Password (SRP)                                        | WIP    ||
| 37. Break SRP with a zero key                                                     | WIP    ||
| 38. Offline dictionary attack on simplified SRP                                   | WIP    ||
| 39. Implement RSA                                                                 | WIP    ||
| 40. Implement an E=3 RSA Broadcast attack                                         | WIP    ||


## Set 6 - RSA and DSA

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 41. Implement unpadded message recovery oracle                                    | WIP    ||
| 42. Bleichenbacher's e=3 RSA Attack                                               | WIP    ||
| 43. DSA key recovery from nonce                                                   | WIP    ||
| 44. DSA nonce recovery from repeated nonce                                        | WIP    ||
| 45. DSA parameter tampering                                                       | WIP    ||
| 46. RSA parity oracle                                                             | WIP    ||
| 47. Bleichenbacher's PKCS 1.5 Padding Oracle (Simple Case)                        | WIP    ||
| 48. Bleichenbacher's PKCS 1.5 Padding Oracle (Complete Case)                      | WIP    ||

## Set 7 - Hashes

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 49. CBC-MAC Message Forgery                                                       | WIP    ||
| 50. Hashing with CBC-MAC                                                          | WIP    ||
| 51. Compression Ratio Side-Channel Attacks                                        | WIP    ||
| 52. Iterated Hash Function Multicollisions                                        | WIP    ||
| 53. Kelsey and Schneier's Expandable Messages                                     | WIP    ||
| 54. Kelsey and Kohno's Nostradamus Attack                                         | WIP    ||
| 55. MD4 Collisions                                                                | WIP    ||
| 56. RC4 Single-Byte Biases                                                        | WIP    ||


## Set 8 - Abstract Algebra

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 57. Diffie-Hellman Revisited: Small Subgroup Confinement                          | WIP    ||
| 58. Pollard's Method for Catching Kangaroos                                       | WIP    ||
| 59. Elliptic Curve Diffie-Hellman and Invalid-Curve Attacks                       | WIP    ||
| 60. Single-Coordinate Ladders and Insecure Twists                                 | WIP    ||
| 61. Duplicate-Signature Key Selection in ECDSA (and RSA)                          | WIP    ||
| 62. Key-Recovery Attacks on ECDSA with Biased Nonces                              | WIP    ||
| 63. Key-Recovery Attacks on GCM with Repeated Nonces                              | WIP    ||
| 64. Key-Recovery Attacks on GCM with a Truncated MAC                              | WIP    ||