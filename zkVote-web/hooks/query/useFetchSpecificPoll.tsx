import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const querySpecificPoll = gql`
    query($groupId: Int $pollId:Int) {
        pollAddeds(where: {groupId : $groupId pollId:$pollId} orderBy: pollId orderDirection: desc ) {
            groupId
            pollId
            title
            voteMsgs
            desc
            transactionHash
        }
    }
`;

export function useFetchSpecificPoll(groupId: number, pollId: number) {
    const [result, reexecuteQuery] = useQuery({
        query: querySpecificPoll,
        variables: {
            groupId: groupId,
            pollId: pollId,
        }
    });

    useEffect(() => {
        if (result.fetching) return;
        const timerId = setTimeout(() => reexecuteQuery({ requestPolicy: "network-only" }), 1000);
        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    return {
        stat: result.data?.pollAddeds
    };
}


