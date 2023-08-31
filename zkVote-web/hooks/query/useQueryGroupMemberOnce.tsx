import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";
import { Context } from 'urql';



const queryGroupMember = gql`
 query($groupId: Int) {
        memberAddeds(where: {groupId : $groupId} orderBy: blockTimestamp) {
            groupId
            identityCommitment
        }
    }   
`;

export async function useGroupMemberOnce(groupId: number) {
    const useClient = () => React.useContext(Context);
    const client = useClient();
    const result = await client.query(queryGroupMember, { groupId: groupId }).toPromise();
    return result.data.memberAddeds;

}


