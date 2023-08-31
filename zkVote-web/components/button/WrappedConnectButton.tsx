import React, { useState, useContext, useEffect } from 'react';
import { connectSnap } from '../../utils/snap';
import { MetaMaskContext, MetamaskActions } from '../../contexts/MetamaskContext';
import { useSnapConnect } from '../../hooks/useSnapInstalled';
import { useIdc } from '../../hooks/useIdc';
import { useConnect, useAccount } from 'wagmi'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { WarningOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import NetworkButton from './NetworkButton';
export default function WrappedConnectButton() {
  const { connect, connectors } = useConnect()
  const { isConnected, address } = useAccount()
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);
  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [address]);
  const isSnapInstalled = useSnapConnect();
  const idc = useIdc(isConnected, isSnapInstalled);
  useEffect(() => {
  }, [idc, isConnected, isSnapInstalled]);

  async function handleOnClick(connector: any) {
    try {
      await connectSnap();
      connect({ connector })
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {

  }, [idc]);

  return (
    <>
      <div className='flex'>
        <NetworkButton isConnected={isDefinitelyConnected} />
        {(idc && isConnected) ?
          <div className='flex flex-row'>
            <button className='w-40 border border-black border-2 px-4 py-2 rounded-3xl bg-[#5FFF37] trucate font-mono'
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{address}</button>
          </div>
          :
          <>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => handleOnClick(connector)}
                style={{ cursor: "pointer" }}
              >
                <img className='h-11' src='/nav/connect.png' />
              </button>
            ))}
          </>
        }
      </div>
    </>);


};

