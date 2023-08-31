import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
declare const window: any;

const START_BLOCK = 2758972
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import voteJson from '../constants/abi/Vote.json'
import { useGroupMemberOnce } from '../hooks/query/useQueryGroupMemberOnce';
import axios from "axios";
import { FullProof as groupFullProof } from "../prover/group/proof";
import { FullProof as signalFullProof } from "../prover/signal/proof";
function packToSolidityProof(proof: any) {
  return [
    proof.pi_a[0],
    proof.pi_a[1],
    proof.pi_b[0][1],
    proof.pi_b[0][0],
    proof.pi_b[1][1],
    proof.pi_b[1][0],
    proof.pi_c[0],
    proof.pi_c[1]
  ];
}
import { SolidityProof } from "@semaphore-protocol/proof"

import "@ethersproject/shims"
import { BigNumber, ethers } from 'ethers';
import { requestSnap } from './snap';
import { queryGroupMember } from './thegraph';
import { useGroupMemberRealTime } from '../hooks/query/useQueryGroupMember';

export async function getVoteContract(chainId: number) {
  let provider;
  let accounts;
  let voteContract;
  let VOTE_CONTRACT_ADDR = "";
  if (chainId === 420) {
    VOTE_CONTRACT_ADDR = "0xbFF54DEA53D243E35389e3f2C7F9c148b0113104"
  } else if (chainId === 59140) {
    VOTE_CONTRACT_ADDR = "0xA610bE3F3220C932D7215dA9C16f1105F1b278C2"
  }
  let signer;
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL);
    accounts = await provider.listAccounts();

    if (accounts && accounts[0]) {
      signer = provider.getSigner(accounts[0])
      // console.log("signer is", signer)
      return new ethers.Contract(VOTE_CONTRACT_ADDR, voteJson.abi, signer)
    }
  }
  return new ethers.Contract(VOTE_CONTRACT_ADDR, voteJson.abi, signer)

}

export const showMsg = async (msg: string) => {
  console.log("-----")
  return await requestSnap('show_msg', [msg])
};

export const updatePrivSeed = async (seedSeeq: string) => {
  const ethNode = await getBIP44()
  const deriveEthNodeddress = await getBIP44AddressKeyDeriver(ethNode as string);
  const addressKey = await deriveEthNodeddress(Number(seedSeeq)); // 0 is default walletAddress
  const res = await requestSnap('update_priv_seed', [addressKey.address.toString()])
  const storeSeed = await requestSnap('get_seed')
  const identityCommitment = await getIdentityCommitment()
  //window.alert("Seed now is \"" + storeSeed + "\" " + "commitment is \"" + identityCommitment + "\"")
  return res
};

export async function mint_nft(
  nft_contract: string
) {
  // console.log("nft_contract : ", nft_contract)
  const NFT_ABI = [
    "function mint()"
  ]
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_URL);
  const signer = provider.getSigner(window.ethereum.selectedAddress)
  const nftContract = new ethers.Contract(nft_contract, NFT_ABI, signer)
  try {
    await nftContract.mint()
    window.alert("mint nft " + nft_contract + " done !")
    return true
  } catch (e) {
    console.log("mint error", e)
  }
}


export async function hasNFT(
  nft_contract: string
) {
  const NFT_ABI = [
    "function balanceOf(address owner) returns(uint256)"
  ]
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const nftContract = new ethers.Contract(nft_contract, NFT_ABI, provider)
  console.log("im here", window.ethereum.selectedAddress)
  const has_nft = await nftContract.callStatic.balanceOf(window.ethereum.selectedAddress)
  console.log("has_nft", has_nft)
  return has_nft
}

export const getBIP44 = async () => {
  return await requestSnap('get_bip44')
};

export const getIdentityCommitment = async () => {
  return await requestSnap('get_identity_commitment')
};

export const getRC = async (rand: string) => {
  return await requestSnap('get_rc', [rand])
};

export const getGroupProof = async (rand: string, idcs: string[]) => {
  return await requestSnap('get_group_proof', [rand, idcs])
};

export const getSignalProof = async (rand: string, msg: string, externalNullifier: string) => {
  return await requestSnap('get_signal_proof', [rand, msg, externalNullifier])
};

export type GroupProps = {
  groupId: number;
  name: string;
  description: string;
  privacy: PRIVACY;
  icon: string;
  admin: string;
  members: string[];
  votes: string[];
  asset: string;
}

export type GroupsProps = GroupProps[];

export enum PRIVACY {
  ANYONE,     // any one can join
  NFT,        // could join group if owner of a NFT
  TOKEN       // could join group if owner of token
}

export const voteInPoll = async (
  group_id: number,
  poll_id: number,
  msg: string,
  using_relayer: boolean,
  chain_id: number
) => {

  const allow_zkp = await showMsg("generate ZKP for vote \"" + msg + "\" in Group " + group_id + " Poll " + poll_id)
  if (!allow_zkp) return

  const idcs = await queryGroupMember(group_id, chain_id)
  console.log("idcs", idcs)

  const rand = Math.floor(Math.random() * 1000000).toString()
  const rc = await getRC(rand)
  console.log("rc", rc)

  const groupProof = await getGroupProof(rand, idcs) as groupFullProof
  console.log("groupProof", groupProof)
  const solidityGroupProof: SolidityProof = packToSolidityProof(groupProof.proof) as SolidityProof
  console.log("solidityGroupProof", solidityGroupProof)
  const externalNullifier = BigNumber.from(BigNumber.from(group_id).shl(128).add(poll_id))
  console.log("externalNullifier", externalNullifier)

  const msgHash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["string"], [msg]))
  const signalProof = await getSignalProof(rand, msgHash, externalNullifier.toString()) as signalFullProof
  console.log("signalProof", signalProof)
  const soliditySignalProof: SolidityProof = packToSolidityProof(signalProof.proof) as SolidityProof
  console.log("soliditySignalProof", soliditySignalProof)
  // TODO : snap_notificiation instead of snap_confirm
  await showMsg("ZKP Generated!!! Start Verify on-chain ")

  let tx_hash
  if (using_relayer) {
    const RELAYER_URL = "https://api.defender.openzeppelin.com/autotasks/a1cc2656-6aea-4e7a-8901-304514450f74/runs/webhook/002f390f-abaa-4c26-8a82-0a472ef95931/7gMaX3GEXF8BKg2semn6Db"
    const res = await axios.post(RELAYER_URL, {
      rc: rc,
      group_id: group_id,
      solidityGroupProof: solidityGroupProof,
      poll_id: poll_id,
      msg: msg,
      nullifierHash: signalProof.publicSignals.nullifierHash,
      externalNullifier: externalNullifier._hex,
      soliditySignalProof: soliditySignalProof,
    })
    try {
      tx_hash = JSON.parse(res.data.result).txhash
    } catch (e) {
      console.log("got tx_hash failed!!!")
    }
  } else {
    let voteContract: ethers.Contract | null = null;
    if (typeof window !== `undefined`) {
      if (window.ethereum && window.ethereum.selectedAddress != undefined) {
        voteContract = await getVoteContract(chain_id)
      }
    }
    let tx = await voteContract?.voteInPoll(
      rc, group_id, solidityGroupProof,
      poll_id, msg,
      signalProof.publicSignals.nullifierHash,
      soliditySignalProof,
      { gasLimit: 10000000 })

    tx_hash = tx.hash
  }
  let ETHERSCAN_IO;
  if (chain_id == 420) ETHERSCAN_IO = "https://goerli.etherscan.io/tx/"
  else if (chain_id == 59140) ETHERSCAN_IO = "https://explorer.goerli.zkevm.consensys.net/tx/"

  if (tx_hash != undefined) {
    toast.success("Done  : vote \"" + msg + "\" in Group " + group_id + ", see " + ETHERSCAN_IO + tx_hash + " 🥳", {
      position: "bottom-right",
      theme: "light",
    });
  } else {
    toast.error("vote tx fail, are you already vote? see details on " + ETHERSCAN_IO + " 😔", {
      position: "bottom-right",
      theme: "light",
    });
  }
  return tx_hash
}


