
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAccount } from 'wagmi';
import { InfoCircleFilled } from '@ant-design/icons';
import Link from 'next/link';
const NFTPreReq: React.FC < {
    groupId: string;
    icon: string;
    isModalOpen: boolean;
    handleCancel: () => void;
}> = ({groupId, icon, isModalOpen, handleCancel}) => {
    return (
        <>
            <Modal style={{ border: '2px solid black', borderRadius: '10px', padding: 0 }}
                open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div className='flex'>
                    <img className='w-20 h-20 rounded-full' src={icon}></img>
                    <div className='ml-5 font-mono mt-2'>
                        <p className='font-bold '>Required NFT is Missing </p>
                        <p className='text-xs'>This is a private group. You need to hold the required nft in order to join the group.</p>
                        <Link href={`/${groupId}/mint`}><button className='mt-2  bg-[#5FFF37] text-black p-2 rounded-3xl border border-2 border-black'>{"Mint NFT Now >"}</button></Link>
                      
                    </div>
                </div>
            </Modal>
        </>

    );
}


export default NFTPreReq;