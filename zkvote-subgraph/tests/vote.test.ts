import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { GroupInfo } from "../generated/schema"
import { GroupInfo as GroupInfoEvent } from "../generated/Vote/Vote"
import { handleGroupInfo } from "../src/vote"
import { createGroupInfoEvent } from "./vote-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let groupId = BigInt.fromI32(234)
    let name = "Example string value"
    let desc = "Example string value"
    let icon = "Example string value"
    let privacy = 123
    let asset = Address.fromString("0x0000000000000000000000000000000000000001")
    let newGroupInfoEvent = createGroupInfoEvent(
      groupId,
      name,
      desc,
      icon,
      privacy,
      asset
    )
    handleGroupInfo(newGroupInfoEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GroupInfo created and stored", () => {
    assert.entityCount("GroupInfo", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "groupId",
      "234"
    )
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "desc",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "icon",
      "Example string value"
    )
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "privacy",
      "123"
    )
    assert.fieldEquals(
      "GroupInfo",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "asset",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
