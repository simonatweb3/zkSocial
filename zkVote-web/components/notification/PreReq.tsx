
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAccount } from 'wagmi';
import { InfoCircleFilled } from '@ant-design/icons';
import { isFlask } from '../../utils/metamask';
export default function PreReq(props: any) {
    const { isConnected } = useAccount()


    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const checkFlaskInstalled = async () => {
            const isFlaskInstalled = await isFlask();
            if (!isConnected && !isFlaskInstalled) {
                showModal();
            }
        }
        checkFlaskInstalled();
    }, [isConnected]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal style={{ border: '2px solid black', borderRadius: '10px', padding: 0 }}
                open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div className='flex'>
                    <img className='w-20 h-20' src='https://s2.loli.net/2022/12/17/xHNlJaVOh5eTGUr.png'></img>
                    <div className='ml-5 font-mono mt-2'>
                        <p className='font-bold '>Install MetaMask Flask </p>
                        <p className='text-xs'>Please install MetaMask Flask before you use our product.</p>
                        <a target="_blank" rel="noreferrer" href='https://metamask.io/flask/'><button className='mt-2  bg-[#A073FF] text-black p-2 rounded-3xl border border-2 border-black'>{"Download Now >"}</button></a>
                        <div className='flex flex-row mt-3'>
                            <InfoCircleFilled />
                            <p className='ml-2 text-xs text-gray-500'>Already installed? Please <b>restart</b> chrome to use Metamask FLask.</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}
