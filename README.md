# Private Voting – Encrypted Ballot System with FHEVM

## 🌍 Why It Matters
On-chain governance is powerful, but public voting can create bias, coercion, or even bribery.  
Private Voting ensures that ballots remain confidential while the overall tally is verifiable on-chain.  

## ⚙️ How It Works
Using Zama’s Fully Homomorphic Encryption Virtual Machine (FHEVM), each ballot is cast as an encrypted value.  
The system only reveals the **final results**, never individual votes, preserving both fairness and privacy.  

## ✨ Core Features
- 🔒 Encrypted ballots stored securely on-chain.  
- ✅ Only aggregated outcomes are revealed.  
- 🔗 DAO-ready and composable with governance frameworks.  
- ⚡ EVM-compatible and easy to integrate.  
- 🧪 Tests verifying ballot casting, counting, and confidentiality.  

## 📂 Project Structure
private-voting/  
├── contracts/  
│   └── PrivateVoting.sol  
├── test/  
│   └── PrivateVoting.spec.ts  
├── hardhat.config.ts  
├── package.json  
├── .gitignore  
├── LICENSE  
└── README.md  

## 🚀 Getting Started
1. Install dependencies  
   npm install  

2. Compile the contracts  
   npx hardhat compile  

3. Run the tests  
   npx hardhat test  

## 🎯 Use Cases
- DAOs running private governance votes.  
- Corporate boards conducting confidential decision-making.  
- Municipal or organizational e-voting on sensitive issues.  

## 📝 License
This project is licensed under the MIT License.
