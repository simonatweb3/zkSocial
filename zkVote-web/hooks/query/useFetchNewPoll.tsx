import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const queryGroupPoll = gql`
    query($groupId: Int) {
        pollAddeds(where: {groupId : $groupId} orderBy: pollId orderDirection: desc ) {
            groupId
            pollId
            title
            voteMsgs
            desc
            transactionHash
        }
    }
`;

export function useGroupPollRealTime(groupId: number) {
    const [result, reexecuteQuery] = useQuery({
        query: queryGroupPoll,
        variables: {
            groupId: groupId,
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


