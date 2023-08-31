import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import DisplayPollContent from '../../../components/poll/DisplayPollContent';
import { useQueryAllGroupInfo } from '../../../hooks/query/useQueryAllGroupInfo';
import { getSpecificGroupInfo } from '../../../utils/group';
import MainPage from '../../../components/layout/MainPage';
import DisplayPollStats from '../../../components/poll/DisplayPollStats';
import { useFetchTxn } from '../../../hooks/txn/useFetchTxn';
import Link from 'next/link';
import DisplayVote from '../../../components/poll/DisplayVote';
import { useFetchSpecificPoll } from '../../../hooks/query/useFetchSpecificPoll';
import { useGroupMemberRealTime } from '../../../hooks/query/useQueryGroupMember';
import { useIdc } from '../../../hooks/useIdc';
import { useConnect, useAccount } from 'wagmi'
import { useSnapConnect } from '../../../hooks/useSnapInstalled';
import { useIsMember } from '../../../hooks/useIsMember';
export async function getServerSideProps(context: any) {
    const { group, poll } = context.query;
    return {
        props: { group, poll }
    }
}

export default function Poll(props: any) {
    const groupId = props.group;
    const allGroup = useQueryAllGroupInfo();
    const [currentGroup, setCurrentGroup] = useState<any>();
    const numGroupId = parseInt(groupId);
    const members = useGroupMemberRealTime(numGroupId);
    const { isConnected } = useAccount()
    const isSnapInstalled = useSnapConnect();
    const idc = useIdc(isConnected, isSnapInstalled);
    const isMember = useIsMember(members,idc)
    const pollId = props.poll;
    const numPollId = parseInt(pollId);
    useEffect(() => {
        if (allGroup && allGroup.stat) {
            const currentGroup = getSpecificGroupInfo(allGroup.stat, groupId);
            setCurrentGroup(currentGroup);
        }
    }, [groupId, allGroup]);
    const poll = useFetchSpecificPoll(numGroupId, numPollId).stat;
    const result = useFetchTxn(poll && poll[0].transactionHash ? poll[0].transactionHash.slice(2) : "0000000000000000000000000000000000000000000000000000000000000000")
    //given group id and poll id, get the transaction hash
    return (
        <>
            {currentGroup &&
                <>
                    <Link href={`/${groupId}`}>
                        <button className='ml-2 text-lg font-bold'>{'< Back'}</button>
                    </Link>

                    <MainPage>
                        {poll &&
                            <>
                                <p className='font-mono text-3xl font-bold mt-8 ml-10'>{poll[0].title}</p>
                                {result && result.from && <>
                                    <div className='flex flex-row'>
                                        <button className='border border-2 border-black bg-[#5FFF37] rounded-3xl mt-4 ml-10  px-5 py-2 text-black font-mono font-bold '>Active</button>
                                        <Link href={`/${groupId}`}>
                                            <img className="w-10 h-10 mt-4 ml-4 rounded-full" src={currentGroup.icon} />
                                        </Link>

                                        <p className='mt-5 text-lg text-[#A5A5A5]  ml-2'>{currentGroup.name}</p>
                                        <a href={`https://goerli-optimism.etherscan.io/address/${result.from}`}>
                                            <button className='mt-5 ml-2 w-40 text-[#A073FF] text-lg trucate font-mono  '
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>by <b>{result.from}</b></button>
                                        </a>
                                    </div>
                                </>
                                }


                                <p className='mt-8 ml-10 text-lg mx-10'>
                                    {poll[0].desc}
                                    {/* Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...
                                    Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...
                                    Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...
                                    Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...
                                    Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...
                                    Lorem Ipsum...Lorem Ipsum...Lorem Ipsum...Lorem Ipsum.. */}

                                </p>


                                <div className='flex mx-10 '>

                                    <div className='mt-10  w-2/3'>
                                        <DisplayPollContent groupId={numGroupId} poll={poll[0]} isMember={isMember} />
                                    </div>
                                    <div key={'stats'} className='mt-10 ml-10 w-1/3'>
                                        <DisplayPollStats groupId={groupId} poll={poll[0]} />
                                    </div>

                                </div>
                                <div className='my-10 mx-10'>
                                    <DisplayVote groupId={numGroupId} pollId={numPollId} />
                                </div>
                            </>
                        }
                    </MainPage>
                </>
            }
        </>
    );
}