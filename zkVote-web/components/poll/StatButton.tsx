import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import { useFetchPollStatRealTime } from '../../hooks/query/useFetchPollStat';
import { useFetchTotalVoteLength } from '../../hooks/query/useFetchPollStat';
export default function StatButton(props: any) {
    const choice = props.choice;
    const { groupId, pollId } = props;
    const stats = useFetchPollStatRealTime(groupId, pollId, choice);
    const totalVotes = useFetchTotalVoteLength(groupId, pollId);
    return (
        <>
            <p className=' font-mono text-lg font-bold'>{choice}:{stats.stat}</p>
            <Progress percent={Math.round((stats.stat/totalVotes.stat)*100)} status={"normal"} strokeColor="#5FFF37" strokeWidth={50} />
        </>
    );
}
