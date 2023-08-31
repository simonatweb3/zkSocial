import { contracts } from "../constants/contracts";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import { useNetwork } from "wagmi";

export function useCreatPoll(
    groupId: number,
    title: string,
    msg: string[],
    desc: string
) {
    const { chain } = useNetwork();
    const voteContract = getContractForNetwork(chain?.id);
    const { config, error } = usePrepareContractWrite({
        address: voteContract.address,
        abi: voteContract.abi,
        functionName: "createPollInGroup",
        args: [groupId, msg, title, desc],
        overrides: {
            gasLimit: BigNumber.from(1000000),

        }
    })
    function getContractForNetwork(chain: any) {
        switch (chain) {
            case 420:
                return contracts.optimismGoerli.voteContract
            case 59140:
                return contracts.consensysZKM.voteContract
            default:
                return contracts.optimismGoerli.voteContract
        }
    }
    return useContractWrite(config)
}