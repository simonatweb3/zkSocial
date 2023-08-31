import type { NextPage } from "next";
import Explore from "./explore";
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>zkVote</title>

      </Head>
      <Explore />

    </>
  );
};

export default Home;
