import { Dropdown, Menu, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useRouter } from 'next/router';
export default function NetworkButton(isConnected: any) {

    const { chain } = useNetwork()
    const { chains, switchNetwork } = useSwitchNetwork()
    const [network, setNetwork] = useState<any>();
    const chainIds = chains.map((x) => x.id)
    const isRightNetwork = chainIds.includes(chain?.id!)
    const router = useRouter();
    const handleClick420 = () => {
        router.push('/');
        switchNetwork?.(420);
    };
    const handleClick59140 = () => {
        router.push('/');
        switchNetwork?.(59140);
    };


    useEffect(() => {
        // Set the network  if user is on the correct network
        if (isRightNetwork) {
            setNetwork(chain);
        } else {
            setNetwork(null);
        }
    }, [chain, isRightNetwork]);
    const items = [
        {
            key: '1',
            label: <button className="flex flex-row" onClick={handleClick420}><img className='w-4 h-4 mr-2 mt-1' src="https://s2.loli.net/2022/12/20/p5HQJlIYosdgcWU.webp" /><p className='font-mono font-bold '>Connect to Optimism Goerli</p></button>
        },
        {
            key: '2',
            label: <button className="flex flex-row" onClick={handleClick59140}><img className='w-4 h-4 mr-2 mt-1' src="https://s2.loli.net/2023/02/21/4OJhBDGQVd1YiUw.png" /><p className='font-mono font-bold '>Connect to Consensys ZKM</p></button>
        },
    ];
    return (
        <>

            {isConnected && isConnected.isConnected && (
                <div className='flex flex-row'>
                    <Dropdown menu={{ items }}>
                        <button className={`bg-white mr-2 border border-black border-2 pr-10 pl-4 lg:px-4 py-2 rounded-3xl trucate font-mono`}>
                            <span className='flex'>
                                {network ? (
                                    <img src={`/chain/${network?.id}.png`} alt={`${network?.id} Avatar`} className="mr-2 h-6" />
                                ) : null}
                                {network?.name || 'Unsupported Network'}
                            </span>
                        </button>
                    </Dropdown>
                </div>
            )}
        </>
    );
}
