import { useEffect, useState } from "react";

export function useIsMember(members: any, idc: string) {

    const [isMember, setIsMember] = useState<any>(false);

    useEffect(() => {
        if (members && members.stat && idc) {
            const isMember = members.stat.find((member: any) => member.identityCommitment === idc);
            if (isMember) {
                setIsMember(true)
            }
        }
    }, [members, idc]);

    return isMember;
}
