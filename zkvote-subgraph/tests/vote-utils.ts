import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  GroupInfo,
  JoinRequested,
  MemberAdded,
  PollAdded,
  PoolVoteAdded,
  VoteAdded
} from "../generated/Vote/Vote"

export function createGroupInfoEvent(
  groupId: BigInt,
  name: string,
  desc: string,
  icon: string,
  privacy: i32,
  asset: Address
): GroupInfo {
  let groupInfoEvent = changetype<GroupInfo>(newMockEvent())

  groupInfoEvent.parameters = new Array()

  groupInfoEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  groupInfoEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  groupInfoEvent.parameters.push(
    new ethereum.EventParam("desc", ethereum.Value.fromString(desc))
  )
  groupInfoEvent.parameters.push(
    new ethereum.EventParam("icon", ethereum.Value.fromString(icon))
  )
  groupInfoEvent.parameters.push(
    new ethereum.EventParam(
      "privacy",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(privacy))
    )
  )
  groupInfoEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return groupInfoEvent
}

export function createJoinRequestedEvent(
  groupId: BigInt,
  identityCommitment: BigInt
): JoinRequested {
  let joinRequestedEvent = changetype<JoinRequested>(newMockEvent())

  joinRequestedEvent.parameters = new Array()

  joinRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  joinRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "identityCommitment",
      ethereum.Value.fromUnsignedBigInt(identityCommitment)
    )
  )

  return joinRequestedEvent
}

export function createMemberAddedEvent(
  groupId: BigInt,
  identityCommitment: BigInt
): MemberAdded {
  let memberAddedEvent = changetype<MemberAdded>(newMockEvent())

  memberAddedEvent.parameters = new Array()

  memberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  memberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "identityCommitment",
      ethereum.Value.fromUnsignedBigInt(identityCommitment)
    )
  )

  return memberAddedEvent
}

export function createPollAddedEvent(
  groupId: BigInt,
  pollId: BigInt,
  title: string,
  voteMsgs: Array<string>,
  desc: string
): PollAdded {
  let pollAddedEvent = changetype<PollAdded>(newMockEvent())

  pollAddedEvent.parameters = new Array()

  pollAddedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  pollAddedEvent.parameters.push(
    new ethereum.EventParam("pollId", ethereum.Value.fromUnsignedBigInt(pollId))
  )
  pollAddedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  pollAddedEvent.parameters.push(
    new ethereum.EventParam(
      "voteMsgs",
      ethereum.Value.fromStringArray(voteMsgs)
    )
  )
  pollAddedEvent.parameters.push(
    new ethereum.EventParam("desc", ethereum.Value.fromString(desc))
  )

  return pollAddedEvent
}

export function createPoolVoteAddedEvent(
  groupId: BigInt,
  poolId: BigInt,
  voteMsg: string
): PoolVoteAdded {
  let poolVoteAddedEvent = changetype<PoolVoteAdded>(newMockEvent())

  poolVoteAddedEvent.parameters = new Array()

  poolVoteAddedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  poolVoteAddedEvent.parameters.push(
    new ethereum.EventParam("poolId", ethereum.Value.fromUnsignedBigInt(poolId))
  )
  poolVoteAddedEvent.parameters.push(
    new ethereum.EventParam("voteMsg", ethereum.Value.fromString(voteMsg))
  )

  return poolVoteAddedEvent
}

export function createVoteAddedEvent(
  groupId: BigInt,
  voteMsg: Bytes
): VoteAdded {
  let voteAddedEvent = changetype<VoteAdded>(newMockEvent())

  voteAddedEvent.parameters = new Array()

  voteAddedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  voteAddedEvent.parameters.push(
    new ethereum.EventParam("voteMsg", ethereum.Value.fromFixedBytes(voteMsg))
  )

  return voteAddedEvent
}
