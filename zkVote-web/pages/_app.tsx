import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "tailwindcss/tailwind.css";
import { optimismGoerli } from 'wagmi/chains'
import { WagmiConfig, createClient, configureChains, goerli } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import UrqlProvider from "../providers/urqlProvider";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import "../styles/global.css";
import { ToastContainer } from 'react-toastify';
import { consensys } from "../components/chains/consensys";

const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli, consensys],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY?.toString()! }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_CONSENSYS_RPC_API_KEY?.toString()! }),
    publicProvider()],
  { targetQuorum: 2 },
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider,
  webSocketProvider,
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider>
      <WagmiConfig client={client}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </WagmiConfig>
    </UrqlProvider>
  );
}

export default MyApp;
