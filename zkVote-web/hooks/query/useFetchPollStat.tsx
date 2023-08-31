import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const queryPollStat = gql`
      query($groupId: String $poolId: String, $voteMsg: String) {
        poolVoteAddeds(where: {groupId: $groupId, poolId:$poolId, voteMsg:$voteMsg}) {
            groupId
            poolId
            voteMsg
        }
    }
`;

export function useFetchPollStatRealTime(groupId: string, poolId: string, voteMsg: string) {
  const [result, reexecuteQuery] = useQuery({
    query: queryPollStat,
    variables: {
        groupId: groupId.toString(),
        poolId: poolId.toString(),
        voteMsg: voteMsg.toString()
        }
    });

    useEffect(() => {
        if (result.fetching) return;
        const timerId = setTimeout(() => reexecuteQuery({ requestPolicy: "network-only" }), 1000);
        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    return { 
        stat: result.data?.poolVoteAddeds.length };
}


export const queryTotalPollLength = gql`
      query($groupId: String $poolId: String) {
        poolVoteAddeds(where: {groupId: $groupId, poolId:$poolId}) {
            groupId
            poolId
        }
    }
`;

export function useFetchTotalVoteLength(groupId: string, poolId: string) {
  const [result, reexecuteQuery] = useQuery({
    query: queryTotalPollLength,
    variables: {
        groupId: groupId.toString(),
        poolId: poolId.toString(),
        }
    });

    useEffect(() => {
        if (result.fetching) return;
        const timerId = setTimeout(() => reexecuteQuery({ requestPolicy: "network-only" }), 1000);
        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    return { 
        stat: result.data?.poolVoteAddeds.length };
}


