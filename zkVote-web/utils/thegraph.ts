import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
export async function queryGroupMember(
    groupId: number,
    chainId: number
) {
    let VOTE_SUBGRAPH_URL = "";
    console.log("1111", chainId)
    if (chainId === 420) {
        VOTE_SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL as string
    } else if (chainId === 59140) {
        VOTE_SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL_CONSENSYS as string
    }
    const client = new ApolloClient({
        uri: VOTE_SUBGRAPH_URL,
        cache: new InMemoryCache(),
    })

    const query = `
        query($groupId: Int) {
            memberAddeds(where: {groupId : $groupId} orderBy: blockTimestamp) {
                groupId
                identityCommitment
            }
        }
    `
    let members: string[] = []
    const data = await client.query({
        query: gql(query),
        variables: {
            groupId: groupId,
        }
    })
    data.data.memberAddeds.forEach((m: any) => members.push(m.identityCommitment))
    return members
}
