import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const queryGroupMember = gql`
 query($groupId: Int) {
        memberAddeds(where: {groupId : $groupId} orderBy: blockTimestamp) {
            groupId
            identityCommitment
        }
    }   
`;

export function useGroupMemberRealTime(groupId: number) {
    const [result, reexecuteQuery] = useQuery({
        query: queryGroupMember,
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
        stat: result.data?.memberAddeds
    };
}


