import Link from 'next/link';
import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content } = Layout;
import GroupNav from './GroupNav';
import { Skeleton } from 'antd';
export default function EmptyGroupSide(props: any) {
    return (
        <>
            <Layout style={{ background: '#F3EFFB', border: '2px solid #BED7BE', borderRadius: '30px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        margin: 0,
                        minHeight: '80vh',
                        minWidth: '15vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div className='flex flex-col w-full justify-center object-center items-center '>
                        <Skeleton.Avatar active={true} style={{ width: 100, height: 100 }} shape={'circle'} />
                        <Skeleton active={true} style={{ padding: '20px 20px 20px' }} />
                        <Skeleton active={true} style={{ padding: '20px 20px 20px' }} />
                    </div>
                </Content>
            </Layout>
        </>
    );
}