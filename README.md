# matasano-cryptopals-js

This repository contains my naive (sometimes maybe even wrong) solutions to the Matasano Cryptopals Challenges written in Javascript (which the original authors of the challenges probably hate).  

I used (and slightly modified) following implementations of SHA1 and MD4 for challenges 29 and 30:  
* https://github.com/chrisveness/crypto/blob/master/sha1.js
* http://pajhome.org.uk/crypt/md5/md5.html

## Set 1 - Basics

| Challenge                      | Status |Notes |
| -------------------------------|:----:| :-----:|
| 1. Convert hex to base64       | DONE ||
| 2. Fixed XOR                   | DONE ||
| 3. Single-byte XOR cipher      | DONE ||
| 4. Detect single-character XOR | DONE ||
| 5. Implement repeating-key XOR | DONE ||
| 6. Break repeating-key XOR     | DONE ||
| 7. AES in ECB mode             | DONE ||
| 8. Detect AES in ECB mode      | DONE ||

## Set 2 - Block crypto

| Challenge                                  | Status | Notes  |
| -------------------------------------------|:------:| :-----:|
| 9. Implement PKCS#7 padding                | DONE ||
| 10. Implement CBC mode                     | DONE ||
| 11. An ECB/CBC detection oracle            | DONE ||
| 12. Byte-at-a-time ECB decryption (Simple) | DONE ||
| 13. ECB cut-and-paste                      | DONE ||
| 14. Byte-at-a-time ECB decryption (Harder) | DONE ||
| 15. PKCS#7 padding validation              | DONE ||
| 16. CBC bitflipping attacks                | DONE ||

## Set 3 - Block & stream crypto

| Challenge                                           | Status |Notes |
| ----------------------------------------------------|:-------:| :-----:|
| 17. The CBC padding oracle                          | DONE ||
| 18. Implement CTR, the stream cipher mode           | DONE ||
| 19. Break fixed-nonce CTR mode using substitutions  | DONE ||
| 20. Break fixed-nonce CTR statistically             | DONE ||
| 21. Implement the MT19937 Mersenne Twister RNG      | DONE ||
| 22. Crack an MT19937 seed                           | DONE ||
| 23. Clone an MT19937 RNG from its output            | DONE ||
| 24. Create the MT19937 stream cipher and break it   | DONE ||

## Set 4 - Stream crypto and randomness

| Challenge                                                        | Status  |Notes |
| -----------------------------------------------------------------|:-------:| :-----:|
| 25. Break 'random access read/write' AES CTR                     | DONE ||
| 26. CTR bitflipping                                              | DONE ||
| 27. Recover the key from CBC with IV=Key                         | DONE ||
| 28. Implement a SHA-1 keyed MAC                                  | DONE ||
| 29. Break a SHA-1 keyed MAC using length extension               | DONE ||
| 30. Break an MD4 keyed MAC using length extension                | DONE ||
| 31. Implement and break HMAC-SHA1 with an artificial timing leak | DONE ||
| 32. Break HMAC-SHA1 with a slightly less artificial timing leak  | DONE |too slow?|

## Set 5 - Diffie-Hellman and friends

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 33. Implement Diffie-Hellman                                                      | DONE ||
| 34. Implement a MITM key-fixing attack on Diffie-Hellman with parameter injection | DONE ||
| 35. Implement DH with negotiated groups, and break with malicious 'g' parameters  | DONE ||
| 36. Implement Secure Remote Password (SRP)                                        | DONE ||
| 37. Break SRP with a zero key                                                     | DONE ||
| 38. Offline dictionary attack on simplified SRP                                   | DONE ||
| 39. Implement RSA                                                                 | DONE ||
| 40. Implement an E=3 RSA Broadcast attack                                         | DONE ||


## Set 6 - RSA and DSA

| Challenge                                                                         | Status  |Notes |
| ----------------------------------------------------------------------------------|:-------:| :-----:|
| 41. Implement unpadded message recovery oracle                                    | DONE    ||
| 42. Bleichenbacher's e=3 RSA Attack                                               | DONE    ||
| 43. DSA key recovery from nonce                                                   | DONE    ||
| 44. DSA nonce recovery from repeated nonce                                        | DONE    ||
| 45. DSA parameter tampering                                                       | DONE    ||
| 46. RSA parity oracle                                                             | DONE    ||
| 47. Bleichenbacher's PKCS 1.5 Padding Oracle (Simple Case)                        | DONE    ||
| 48. Bleichenbacher's PKCS 1.5 Padding Oracle (Complete Case)                      | DONE    ||

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
