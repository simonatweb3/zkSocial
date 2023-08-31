import { useQuery } from "urql";
import { useEffect } from "react";
import gql from "graphql-tag";


export const queryJoinedGroups = gql`
    query($identityCommitment: String) {
        memberAddeds(where: {identityCommitment : $identityCommitment}) {
                groupId
            }
    }

`;

export function useFetchJoinedGroups(identityCommitment: string) {
    const [result, reexecuteQuery] = useQuery({
        query: queryJoinedGroups,
        variables: {
            identityCommitment: identityCommitment,
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