import { contracts } from "../constants/contracts";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { BigNumber,ethers } from "ethers";
import { useNetwork } from "wagmi";
export enum PRIVACY {
    ANYONE,     // any one can join
    NFT,        // could join group if owner of a NFT
    TOKEN       // could join group if owner of token
}

const TREE_DEPTH = 10;
export function useCreateGroup(
    name: string,
    description: string,
    privacy: PRIVACY,
    icon: string,
    asset: string,
    address: string
) {

    const { chain } = useNetwork();
    const voteContract = getContractForNetwork(chain?.id);
    const { config, error } = usePrepareContractWrite({
        address: voteContract.address,
        abi: voteContract.abi,
        functionName: "CreateGroupWithAssetDemand",
        args: [ TREE_DEPTH, address, name, description, privacy, icon, asset],
        overrides:{
            gasLimit: BigNumber.from(1000000)
            
          }
    })

    function getContractForNetwork(chain:any){
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