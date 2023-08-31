var snarkjs = require('snarkjs');

import { Identity } from "@semaphore-protocol/identity"
import { BigNumberish } from "ethers"
import { generateSignalHash, Proof } from "@semaphore-protocol/proof"

export declare type FullProof = {
    proof: Proof;
    publicSignals: PublicSignals;
};
export type PublicSignals = {
    rc: BigNumberish;
    nullifierHash: BigNumberish
    signalHash: BigNumberish
    externalNullifier: BigNumberish
}

export default async function generateProof(
    identity: Identity,
    rand : bigint,
    externalNullifier: BigNumberish,
    signal: string,
    wasmFile : string,
    zkeyFile : string
): Promise<FullProof> {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        {
            r : rand,
            identityNullifier: identity.getNullifier(),
            externalNullifier : externalNullifier,
            signalHash: generateSignalHash(signal)
        },
        wasmFile,
        zkeyFile
    )

    const fullProof = {
        proof,
        publicSignals: {
            rc: publicSignals[0],
            nullifierHash: publicSignals[1],
            signalHash: publicSignals[2],
            externalNullifier: publicSignals[3]
        }
    }

    return fullProof
}