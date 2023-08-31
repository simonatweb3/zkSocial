import {
  GroupInfo as GroupInfoEvent,
  JoinRequested as JoinRequestedEvent,
  MemberAdded as MemberAddedEvent,
  PollAdded as PollAddedEvent,
  PoolVoteAdded as PoolVoteAddedEvent,
  VoteAdded as VoteAddedEvent
} from "../generated/Vote/Vote"
import {
  GroupInfo,
  JoinRequested,
  MemberAdded,
  PollAdded,
  PoolVoteAdded,
  VoteAdded
} from "../generated/schema"

export function handleGroupInfo(event: GroupInfoEvent): void {
  let entity = new GroupInfo(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.name = event.params.name
  entity.desc = event.params.desc
  entity.icon = event.params.icon
  entity.privacy = event.params.privacy
  entity.asset = event.params.asset

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleJoinRequested(event: JoinRequestedEvent): void {
  let entity = new JoinRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.identityCommitment = event.params.identityCommitment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMemberAdded(event: MemberAddedEvent): void {
  let entity = new MemberAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.identityCommitment = event.params.identityCommitment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePollAdded(event: PollAddedEvent): void {
  let entity = new PollAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.pollId = event.params.pollId
  entity.title = event.params.title
  entity.voteMsgs = event.params.voteMsgs
  entity.desc = event.params.desc

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePoolVoteAdded(event: PoolVoteAddedEvent): void {
  let entity = new PoolVoteAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.poolId = event.params.poolId
  entity.voteMsg = event.params.voteMsg

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteAdded(event: VoteAddedEvent): void {
  let entity = new VoteAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.groupId = event.params.groupId
  entity.voteMsg = event.params.voteMsg

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
