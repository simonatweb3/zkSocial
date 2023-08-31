import React, { useEffect } from 'react';
import { useState } from 'react';
import { Layout } from 'antd';
const { Header, Content } = Layout;
import GroupNav from './GroupNav';
import { useRouter } from 'next/router';
import { getIdentityCommitment, hasNFT } from "../../utils/vote";
import { useAddMember } from '../../hooks/useAddMember';
import { useWaitForTransaction } from 'wagmi';
import { useGroupMemberRealTime } from '../../hooks/query/useQueryGroupMember'
import { ToastContainer, toast } from "react-toastify";
import NFTPreReq from '../notification/NFTPreReq';
import { useAccount } from 'wagmi';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />
import "react-toastify/dist/ReactToastify.css";
export default function GroupSide(props: any) {
    const { item } = props;
    const { groupId, name, icon, onGoing, asset } = item;
    const numGroupId = parseInt(groupId);
    const { isConnected } = useAccount()
    const members = useGroupMemberRealTime(numGroupId);
    console.log("members -- ", members)
    const [idc, setIdc] = useState<any>();
    const router = useRouter();
    const [isMember, setIsMember] = useState<any>(false);
    const [isJoined, setIsJoined] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getIdc = async () => {
            const idc = await getIdentityCommitment();
            setIdc(idc);
        };
        getIdc();
    }, []);
    useEffect(() => {
    }, [idc]);


    useEffect(() => {
        if (members && members.stat && idc) {
            const isMember = members.stat.find((member: any) => member.identityCommitment === idc);
            if (isMember) {
                setIsMember(true)
            }
        }
    }, [members, idc]);


    const joiningNotify = () =>
        toast.info("Joining the Group...", {
            position: "bottom-right",
            theme: "light",
        });

    const joinedNotify = () =>
        toast.success("Successfully joined the group! 🥳", {
            position: "bottom-right",
            theme: "light",
        });


    const fn = useAddMember(numGroupId, idc);

    async function handleOnClick(groupId: any, idc: any, tokenAddress: string) {
        if (isConnected) {
            const checkNFT = await hasNFT(tokenAddress);
            const userHasNFT = (checkNFT.toNumber() > 0)
            if (!userHasNFT) {
                showModal();

            } else {
                // joiningNotify();
                fn.write?.();
                setIsLoading(true);

            }
        }
    }

    const waitForTransaction = useWaitForTransaction({
        hash: fn?.data?.hash,
    })

    useEffect(() => {
        if (waitForTransaction.data) {
            setIsMember(true)
            setIsJoined(true)
            setIsLoading(false);

        }
        else if (waitForTransaction.error) {
            setIsLoading(false);
        }
    }, [waitForTransaction])
    useEffect(() => {
        if (fn.error) {
            setIsLoading(false);
        }
    }, [fn.error])


    useEffect(() => {
    }, [isMember]);

    useEffect(() => {
        if (isJoined) {
            joinedNotify();
        }
    }, [isJoined])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>

            <Layout style={{ background: '#F3EFFB', border: '2px solid #BED7BE', borderRadius: '30px' }}>
                <Content
                    style={{
                        padding: "24px 24px 24px",
                        margin: 0,
                        minHeight: '60vh',
                        minWidth: '15vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div className='flex flex-col w-full justify-center object-center items-center '>
                        <img className='rounded-full h-24 w-24' src={icon ? icon : '/icons/step3.png'} />
                        <p className='text-lg font-bold mt-4'>{name}</p>
                        <p className='text-sm text-gray-500'>{(members && members.stat) ? members.stat.length : 0}  members</p>
                        {(isLoading && !isMember) ? (
                            <div className="flex mt-2 bg-white border border-2 border-black hover:bg-[#A073FF] hover:text-white text-black font-bold font-mono py-2 px-8 rounded-full">
                                <Spin indicator={antIcon} className="mr-2" style={{ color: "black", marginTop: 0 }} />
                                <p className='mt-1'>Joining</p>
                            </div>
                        ) : isMember ? (
                            <button className=" mt-2 bg-[#A073FF] text-black font-bold font-mono py-2 px-8 rounded-full border border-2 border-black">Joined</button>) : (
                            <>
                                <button onClick={() => handleOnClick(item.groupId, idc, item.asset)} className=" mt-2 bg-white border border-2 border-black hover:bg-[#A073FF] hover:text-white text-black font-bold font-mono py-2 px-8 rounded-full">Join+</button>
                                <NFTPreReq handleCancel={handleCancel} isModalOpen={isModalOpen} groupId={item.groupId} icon={item.icon} />
                            </>

                        )}
                        <GroupNav groupId={groupId} />

                    </div>
                </Content>
                {/* <ToastContainer className="toast-container" pauseOnFocusLoss={false} /> */}
            </Layout>

        </>
    );
}