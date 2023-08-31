var snarkjs = require('snarkjs');

import { Identity } from "@semaphore-protocol/identity"
import { MerkleProof } from "@zk-kit/incremental-merkle-tree"
import { BigNumberish } from "ethers"
import { Proof } from "@semaphore-protocol/proof"

export declare type FullProof = {
    proof: Proof;
    publicSignals: PublicSignals;
};
export declare type PublicSignals = {
    rc: BigNumberish;
    merkleRoot: BigNumberish;
};

export default async function generateProof(
    identity: Identity,
    merkleProof: MerkleProof,
    rand : bigint,
    wasmFile : string,
    zkeyFile : string
): Promise<FullProof> {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        {
            identityTrapdoor: identity.getTrapdoor(),
            identityNullifier: identity.getNullifier(),
            treePathIndices: merkleProof.pathIndices,
            treeSiblings: merkleProof.siblings,
            r : rand
        },
        wasmFile,
        zkeyFile,
    )

    const fullProof = {
        proof,
        publicSignals: {
            rc: publicSignals[0],
            merkleRoot: publicSignals[1]
        }
    }

    return fullProof
}