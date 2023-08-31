import { useQuery } from "urql";
import { useEffect } from "react";
import gql from "graphql-tag";


export const queryAllGroupInfos = gql`
      query{
            groupInfos{
                groupId
                name
                desc
                icon
                privacy
                asset
            }
        }

`;

export function useQueryAllGroupInfo() {
    const [result, reexecuteQuery] = useQuery({
        query: queryAllGroupInfos,

    });

    return {
        stat: result.data?.groupInfos
    };
}