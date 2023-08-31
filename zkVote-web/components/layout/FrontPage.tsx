import Link from "next/link";
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import SideBar from "./SideBar";
const { Header, Content, Sider } = Layout;
import WrappedConnectButton from '../button/WrappedConnectButton';
type Props = {
  children: React.ReactNode;
};

export default function FrontPage({ children }: Props) {
  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-white">
        <nav
          className="mt-8 ml-5 relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <span className="sr-only">zkVote</span>
                <img
                  className="h-16 w-auto sm:h-16"
                  src="/icons/logo.png"
                />
              </Link>
              <div className="ml-10 mb-3 mr-32 ">
                <p className="text-2xl font-bold font-mono">zkVote</p>
              </div>
            </div>
          </div>

          <div className="items-center flex justify-end sm:flex md:flex md:flex-1 lg:w-0">

            <div className="mr-10">
              {/* <ConnectButton /> */}
              <WrappedConnectButton />
            </div>
          </div>
        </nav>


        <Layout style={{ backgroundColor: 'transparent' }}>
          <div className="flex">
            <div className="flex-row mr-6 flex-shrink-0">
              <SideBar />
            </div>
            <div>{children}</div>
          </div>
        </Layout>
      </div>
    </>
  );
}
