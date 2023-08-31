import { PropsWithChildren } from "react";
import { createClient, Provider } from "urql";
import { useNetwork } from "wagmi";

export default function UrqlProvider({ children }: PropsWithChildren<{}>) {
  const { chain } = useNetwork();

  const subgraphUrl = getSubgraphUrlForNetwork(chain?.id);
  const client = createClient({
    url: subgraphUrl as string,
  });

  function getSubgraphUrlForNetwork(chain: any) {
    switch (chain) {
      case 420:
        return process.env.NEXT_PUBLIC_SUBGRAPH_URL;
      case 59140:
        return process.env.NEXT_PUBLIC_SUBGRAPH_URL_CONSENSYS;
      default:
        return process.env.NEXT_PUBLIC_SUBGRAPH_URL;
    }
  }
  return <Provider value={client}>{children}</Provider>;
}
