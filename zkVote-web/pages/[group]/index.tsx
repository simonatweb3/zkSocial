import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import GroupPage from '../../components/layout/GroupPage';
import Link from 'next/link';
import DisplayPoll from '../../components/poll/DisplayPoll';
import { useQueryAllGroupInfo } from '../../hooks/query/useQueryAllGroupInfo';
import { getSpecificGroupInfo } from '../../utils/group';
import { useRouter } from 'next/router';
import EmptyGroupPage from '../../components/layout/EmptyGroupPage';
export async function getServerSideProps(context: any) {
  const { group } = context.query;
  return {
    props: { group }
  }
}

export default function GroupHome(props: any) {
  const router = useRouter();
  let groupId = props.group;
  const allGroup = useQueryAllGroupInfo();
  const [currentGroup, setCurrentGroup] = useState<any>();
  useEffect(() => {
    try {
      const fetchCurrentGroup = async () => {
        if (allGroup && allGroup.stat) {
          const currentGroup = getSpecificGroupInfo(allGroup.stat, groupId);
          setCurrentGroup(currentGroup);
        }
      }
      fetchCurrentGroup();
    } catch (e) {
      console.log(e);
      router.reload();
    }

  }, [groupId, allGroup]);

  return (
    <>
      {!currentGroup &&
        <EmptyGroupPage>
          <div className='justify-center flex py-24' >
            <Skeleton active />
          </div>
        </EmptyGroupPage>
      }
      {currentGroup &&
        <div className='relative'>
          <GroupPage item={currentGroup} >
            <div className='mt-2'>
              <p className='font-mono text-2xl font-bold mt-10 mx-6'>Polls</p>

              <DisplayPoll groupId={currentGroup.groupId} />
            </div>
          </GroupPage>
        </div>
      }
    </>
  );
}