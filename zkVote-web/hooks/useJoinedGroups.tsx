import { useEffect, useState } from "react";
import { useSnapConnect } from "./useSnapInstalled";
import { useIdc } from "./useIdc";
import { useAccount } from 'wagmi'
import { useFetchJoinedGroups } from "./query/useFetchJoinedGroup";
import { useQueryAllGroupInfo } from "./query/useQueryAllGroupInfo";

export function useJoinedGroups() {
    const { isConnected } = useAccount()
    const isSnapInstalled = useSnapConnect();
    const idc = useIdc(isConnected, isSnapInstalled);

    const joinedGroups = useFetchJoinedGroups(idc);
    // const groupIds = joinedGroups.stat.map((group: any) => group.groupId);
    const [joinedGroupId, setJoinedGroupId] = useState<any>();
    const [joinedGroup, setJoinedGroup] = useState<any>();
    const allGroups = useQueryAllGroupInfo();

    useEffect(() => {
        if (idc && joinedGroups && joinedGroups.stat) {
            const groupIds = joinedGroups.stat.map((group: any) => group.groupId);
            setJoinedGroupId(groupIds);
        }
    }, [idc, joinedGroups.stat]);

    useEffect(() => {
        const fetchSpecificGroup = async () => {
            if (joinedGroupId && allGroups && allGroups.stat) {
                const joinedGroups = allGroups.stat.filter((group: any) => joinedGroupId.includes(group.groupId.toString()));
                setJoinedGroup(joinedGroups);
            }
        }
        fetchSpecificGroup();
    }, [joinedGroupId])

    useEffect(() => {
    }, [joinedGroup]);

    return joinedGroup;
}
