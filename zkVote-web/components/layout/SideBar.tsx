import Link from 'next/link';
import React from 'react';
import Item from './SideItem';
import { useJoinedGroups } from '../../hooks/useJoinedGroups'
import GroupItem from './GroupItem';

type Props = {
    children: React.ReactNode;
};
export default function SideBar() {
    const joinedGroup = useJoinedGroups();
    const explore = {
        id: '0',
        title: 'Explore',
        icon: '/icons/explore.png',
        link: '/explore'
    }
    const create = {
        id: '0',
        title: 'Explore',
        icon: '/icons/create.png',
        link: '/create'
    }
    return (
        <>
            <div className='pt-2'>
                <Item item={explore} />
                {joinedGroup && joinedGroup.map((item: any, idx: number) => (
                    <div key={item.groupId}>
                        <Link href={`/${item.groupId.toString()}`}>
                            <GroupItem item={item} />
                        </Link>

                    </div>
                ))}
                <Item item={create} />
            </div>
        </>
    );
}