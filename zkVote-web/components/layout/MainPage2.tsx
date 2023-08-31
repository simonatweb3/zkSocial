import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;


export default function MainPageV2(props:any) {
  return (
    <div className='mt-6'>
    <Layout style={{ padding: '0 24px 24px', background: '#F3EFFB', border:'2px solid #BED7BE', borderRadius:'30px' }}>
     <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: '80vh',
              minWidth: '85vw',
            }}
            >
    <div className=" py-3 flex flex-col justify-center ">
      {props.children}
    </div>
    </Content>
    </Layout>
    </div>
  );
}
