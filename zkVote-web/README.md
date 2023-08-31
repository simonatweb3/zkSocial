# Workflow

```mermaid
sequenceDiagram
	participant U 	as User
	participant F 	as Frontend
	participant M 	as Metamask(Snap)
	participant VC 	as Vote-Contract
	participant NC 	as NFT-Contract
	
  U -->> F : click "connect"
  F -->> M : install snap to metamask
  F -->> M : set identity "seed"

  U -->> F : click "Create Group (name, desc, icon asset(nft/token) request, asset address)"
  F -->> VC : Create Group Tx
  VC -->> F : Group ID

  U -->> F : click "Join Group"
	rect rgba(0, 220, 220, .3)
    M -->> F : generate identity
  end
  F -->> VC : "add member(identity)" in group
  VC -->> NC : check asset demand

  U -->> F : Click "Create Poll" in Group g with Msgs [msg1, msg2, ...]
  F -->> VC : createPollInGroup(groupId, Msgs[])

  U -->> F : Click "Vote" with "Msg m" In "Group g Pool p"
  F -->> M : run snarkjs prove zkp
	rect rgba(0, 220, 220, .3)
    M -->> M : generate identity
    M -->> M : generate rc
    M -->> M : generate Group Proof, with "Group Merkle Proof"
    M -->> M : generate Signal Proof 
  end
  alt using relayer ?
    F -->> R : relayer "vote" tx
    R -->> R : verify "vote" tx
    R -->> VC : vote tx
  else direct send onchain ?
    F -->> VC : votePollInGroup(rc, msg, groupId, pollId, group proof, signal proof)
  end
  VC -->> VC : check msg valid in Pool
  VC -->> VC : verify zkp proof
  F -->> VC : check "Vote Stats"

```

# Setup Snap
```shell
  git clone git@github.com:p0x-labs/zkVote-snap.git
  nvm use v16.16.0
  yarn install
  yarn build;yarn start
```

# Setup Frontend
```shell
  nvm use lts/hydrogen
  npm install
  npm run dev
```

# [Optional] Setup Relayer
see "using_relayer"

```shell
  cd backend
  ts-node relayer.ts
```

# TODO
1. Privacy Protect of Ethereum Address   
  offchain relayer VS EIP4337(still need realyer)
  refactor vote contract for a static verify interface.