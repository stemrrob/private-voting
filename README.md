# Private Voting – Encrypted Ballot System with FHEVM

## Overview
Private Voting demonstrates how governance can be run confidentially onchain using Zama’s FHEVM.  
Votes are encrypted end-to-end, ensuring privacy while maintaining transparency and verifiability.

## Features
- Encrypted ballots using euint64
- One person, one vote (prevents double voting)
- Encrypted tally revealed only after voting closes
- Protects voters from coercion or front-running
- Fully EVM-compatible and tested with Hardhat

## Tech Stack
- Solidity + FHEVM
- Hardhat + TypeScript
- Zama SepoliaConfig

## Tests
- Cast encrypted votes for different options
- Reveal encrypted tally after voting ends
- Prevent double voting

## License
MIT
