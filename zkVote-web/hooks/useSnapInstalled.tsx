import { useEffect, useState } from "react";
declare const window: any;
import { getSnap } from '../utils/snap';

export function useSnapConnect() {
    const [snapConnected, setSnapConnected] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            const checkSnap = async () => {
                const snap = await getSnap();
                if (snap) {
                    setSnapConnected(true);
                } else {
                    setSnapConnected(false);
                }
            }
            checkSnap();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return snapConnected;


}
