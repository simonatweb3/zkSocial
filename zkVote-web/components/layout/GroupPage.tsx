import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import SideBar from './SideBar';
import GroupSide from './GroupSide';
const { Header, Content } = Layout;


export default function GroupPage(props:any) {
  const { item } = props;
  
  return (
    <div className="mt-6 " >
      <div className="flex" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        <div className="flex-row mr-6 flex-shrink-0 ">
          <GroupSide item={item}/>
        </div>

        <div className="flex flex-col" style={{ width: '100%' }}>
    <Layout className="site-layout" style={{ width:'100%',padding: '0 24px 24px', background: '#FDFBFF', border:'2px solid #BED7BE', borderRadius:'30px' }}>
      <Content className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: '80vh',
                minWidth: '65vw',
              }}
              >
        {props.children}
      </Content>
    </Layout>
  </div>

    </div>
</div>
  );
}
