import { useEffect, useState } from "react";
import { getIdentityCommitment, updatePrivSeed } from "../utils/vote";

export function useIdc(isWalletConnected:boolean, isSnapInstalled:boolean){
    //return idc when wallet and snap are both connected 
    const [idc, setIdc] = useState<any>("");
    useEffect(() => {
        //create an async function to check if the user has a wallet connected
        const checkIdc = async () => {
            if(isWalletConnected && isSnapInstalled){
                await updatePrivSeed('1');
                const idc = await getIdentityCommitment();
                setIdc(idc);
            }
            if(!isWalletConnected){
                const idc = null;
                setIdc(null)
            }
        }
        checkIdc();
    }, [isWalletConnected, isSnapInstalled]);

    useEffect(() => {
    }, [idc]);
    
    return idc;  
}
