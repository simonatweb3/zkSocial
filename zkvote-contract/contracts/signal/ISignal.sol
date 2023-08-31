//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface ISignal {

    /// @dev See {ISemaphoreVoting-castVote}.
    function signal(
        uint256 rc,
        bytes32 message,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external returns (bool);
}
