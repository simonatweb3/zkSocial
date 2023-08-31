import React from 'react';
import { CarryOutFilled, PlusSquareFilled } from '@ant-design/icons';
import Link from 'next/link';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
export default function GroupNav(props: any) {
  const router = useRouter();
  const groupId = props.groupId;
  const items: MenuItem[] = [
    getItem('Polls', `/${groupId}`, <CarryOutFilled />),
    getItem('New Poll', `/${groupId}/newpoll`, <PlusSquareFilled />),];

  return (
    <>
      <div className='mt-4'>
        <Menu
          defaultSelectedKeys={[`/${groupId}`]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
          onClick={(e) => router.push(e.key)}
          style={{ width: 200,backgroundColor:"transparent",border:"none" }}
        />
      </div>

    </>
  );
}
