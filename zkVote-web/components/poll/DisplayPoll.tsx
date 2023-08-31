import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Spin } from 'antd';
import { useGroupPollRealTime } from "../../hooks/query/useFetchNewPoll"
import PollCard from "./PollCard";
import { Skeleton } from 'antd';

export default function DisplayPoll(props: any) {
    const { groupId } = props;
    const groupPolls = useGroupPollRealTime(parseInt(groupId));

    return (
        <>
            <div className="flex flex-col mt-4 mx-6">
               
                {groupPolls && groupPolls.stat && groupPolls.stat.length === 0 &&
                    <div className='justify-center flex py-24' >
                        <p className="font-mono text-xl font-bold">No Polls</p>
                    </div>
                }
                {groupPolls && groupPolls.stat && groupPolls.stat.map((poll: any) => (
                    <PollCard key={poll.pollId} poll={poll} groupId={groupId} />

                ))}
            </div>
        </>
    )

}
