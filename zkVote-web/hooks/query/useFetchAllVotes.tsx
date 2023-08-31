import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const queryAllVotes = gql`
    query($groupId: Int, $poolId: Int) {
        poolVoteAddeds(where: {groupId : $groupId poolId: $poolId} orderBy: blockTimestamp orderDirection: desc ) {
            blockTimestamp
            groupId
            poolId
            voteMsg
            transactionHash
        }
    }
`;

export function useFetchAllVotes(groupId: number, pollId: number) {
    const [result, reexecuteQuery] = useQuery({
        query: queryAllVotes,
        variables: {
            groupId: groupId,
            poolId: pollId,
        }
    });

    useEffect(() => {
        if (result.fetching) return;
        const timerId = setTimeout(() => reexecuteQuery({ requestPolicy: "network-only" }), 1000);
        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    return {
        stat: result.data?.poolVoteAddeds
    };
}


