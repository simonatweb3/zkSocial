
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content } = Layout;
import { hasNFT } from '../../utils/vote';
import { useAddMember } from '../../hooks/useAddMember';
import NFTPreReq from '../notification/NFTPreReq';
import { useWaitForTransaction } from 'wagmi';
import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useGroupMemberRealTime } from '../../hooks/query/useQueryGroupMember'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from 'wagmi';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
export default function GroupCard(props: any) {
  const { item, idc } = props;
  const numGroupId = parseInt(item.groupId);
  const { isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false);

  const members = useGroupMemberRealTime(numGroupId);
  const [isMember, setIsMember] = useState<any>(false);
  useEffect(() => {
    if (members && members.stat && idc) {
      const isMember = members.stat.find((member: any) => member.identityCommitment === idc);
      if (isMember) {
        setIsMember(true)
      }
    }
  }, [members, idc]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoined, setIsJoined] = useState<any>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const fn = useAddMember(item.groupId, idc);


  async function handleOnClick(tokenAddress: string) {
    if (isConnected) {
      const checkNFT = await hasNFT(tokenAddress);
      const userHasNFT = (checkNFT.toNumber() > 0)
      if (!userHasNFT) {
        showModal();
      } else {
        fn.write?.();
        setIsLoading(true);
      }
    }
  }
  const joinedNotify = () =>
    toast.success("Successfully joined the group! 🥳", {
      position: "bottom-right",
      theme: "light",
    });
  const waitForTransaction = useWaitForTransaction({
    hash: fn?.data?.hash,

  })

  useEffect(() => {
  }, [isLoading])

  useEffect(() => {
    if (waitForTransaction.data) {
      setIsMember(true)
      setIsJoined(true)
      setIsLoading(false);

    } else if (waitForTransaction.error) {
      setIsLoading(false);
    }
  }, [waitForTransaction])

  useEffect(() => {
    if (fn.error) {
      setIsLoading(false);
    }
  }, [fn.error])


  useEffect(() => {
    if (isJoined) {
      joinedNotify();
    }
  }, [isJoined])


  return (

    <Row gutter={0}>
      <Col span={24}>
        <Card bordered={false} className=' flex flex-col justify-center object-center text-center items-center rounded-3xl w-full' >
          <Link href={`/${item.groupId}`}>

            <div className='flex flex-col w-full justify-center object-center  items-center'>
              <div className='mx-10 '>
                <img src={item.icon ? item.icon : '/icons/step3.png'} className='w-24 h-24 flex flex-col justify-center object-center  items-center  w-full rounded-full ' />
              </div>
              <p className='text-lg font-bold mt-2'>{item.name}</p>
              <p className='text-sm text-gray-500'>{(members && members.stat) ? members.stat.length : 0} members</p>
              {/* <p className='text-sm text-[#5FFF37]'>{ } votes ongoing</p> */}
            </div>
          </Link>

          <div className='w-full'>

            {(isLoading && !isMember) ? (
              <div className="flex font-mono mt-4 bg-white border border-2 border-black hover:bg-[#A073FF] hover:text-white text-black text-lg py-2 px-10 rounded-full">
                <Spin indicator={antIcon} className="mr-2" style={{ color: "black" }} />
                <p >Joining</p>
              </div>
            ) : isMember ? (
              <button className="font-mono mt-4 bg-[#A073FF] border border-2 border-black text-black text-lg py-2 px-16 rounded-full">Joined</button>
            ) : (
              <>
                <button onClick={() => handleOnClick(item.asset)} className="font-mono mt-4 bg-white border border-2 border-black hover:bg-[#A073FF] hover:text-white text-black text-lg py-2 px-16 rounded-full">Join+</button>
                <NFTPreReq handleCancel={handleCancel} isModalOpen={isModalOpen} groupId={item.groupId} icon={item.icon} />
              </>
            )}


          </div>
        </Card>
      </Col>
    </Row>
  );
}
