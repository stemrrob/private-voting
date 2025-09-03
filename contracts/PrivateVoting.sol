// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Private Voting – Encrypted Ballot System with FHEVM
contract PrivateVoting is SepoliaConfig {
    address public admin;
    uint256 public votingEnd;

    mapping(uint256 => euint64) private _votes; // optionId => encrypted count
    mapping(address => bool) private _hasVoted;

    error AlreadyVoted();
    error VotingClosed();

    constructor(uint256 durationSeconds) {
        admin = msg.sender;
        votingEnd = block.timestamp + durationSeconds;
    }

    /// @notice Cast an encrypted vote for a given option
    function vote(uint256 optionId, externalEuint64 encryptedOne, bytes calldata proof) external {
        if (block.timestamp > votingEnd) revert VotingClosed();
        if (_hasVoted[msg.sender]) revert AlreadyVoted();

        euint64 one = FHE.fromExternal(encryptedOne, proof);
        _votes[optionId] = FHE.add(_votes[optionId], one);

        FHE.allowThis(_votes[optionId]);

        _hasVoted[msg.sender] = true;
    }

    /// @notice Get encrypted tally for a given option
    function getTally(uint256 optionId) external view returns (euint64) {
        require(block.timestamp > votingEnd, "Voting still ongoing");
        return _votes[optionId];
    }
}
