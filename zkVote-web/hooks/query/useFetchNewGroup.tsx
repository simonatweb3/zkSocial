import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

export const queryAllGroupInfo = gql`
      query{
            groupInfos (orderBy:groupId orderDirection:desc){
                groupId
                name
                desc
                icon
                privacy
                asset
            }
        }
`;

export function useFetchNewGroupRealTime() {
    const [result, reexecuteQuery] = useQuery({
        query: queryAllGroupInfo,
    });

    useEffect(() => {
        if (result.fetching) return;
        const timerId = setTimeout(() => reexecuteQuery({ requestPolicy: "network-only" }), 1000);
        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    return {
        stat: result.data?.groupInfos
    };
}


