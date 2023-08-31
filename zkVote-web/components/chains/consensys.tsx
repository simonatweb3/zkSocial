import { Chain } from 'wagmi'

export const consensys = {
    id: 59140,
    name: 'ConsenSys zkEVM',
    network: 'consensys-zkevm',
    nativeCurrency: {
        name: 'ConsenSys zkEVM',
        decimals: 18,
        symbol: 'crETH',
    },
    rpcUrls: {
        public: { http: ['https://consensys-zkevm-goerli-prealpha.infura.io/v3/6de9e23229fe4a94a92882cd734306c4'].slice() },
        default: { http: ['https://consensys-zkevm-goerli-prealpha.infura.io/v3/6de9e23229fe4a94a92882cd734306c4'].slice() },
    },
    blockExplorers: {
        etherscan: { name: 'BlockScout', url: 'https://explorer.goerli.zkevm.consensys.net' },
        default: { name: 'BlockScout', url: 'https://explorer.goerli.zkevm.consensys.net' },
    },
} as const satisfies Chain
