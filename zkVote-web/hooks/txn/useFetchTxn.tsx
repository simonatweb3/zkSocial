import { fetchTransaction } from '@wagmi/core'
import { use, useState, useEffect } from 'react'
export function useFetchTxn(txnhash: string) {


    const [result, setResult] = useState<any>(null)

    useEffect(() => {
        const fetch = async () => {
            const transaction = await fetchTransaction({
                hash: `0x${txnhash}`,
            })
            setResult(transaction)
        }
        fetch()
    }, [txnhash])

    return result

}