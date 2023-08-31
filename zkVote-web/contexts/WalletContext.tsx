import { createContext } from "react";

export type WalletContextType = {
  address: string | undefined;
  setAddress: (address: string) => void;
  isSnapInstalled: boolean | undefined;
  setIsSnapInstalled: (isSnapInstalled: boolean) => void;
  isConnected: boolean | undefined;
  setIsConnected: (isConnected: boolean) => void;
};

export const WalletContext = createContext<WalletContextType>({
  address: undefined,
    setAddress: (address) => {},
  isSnapInstalled: undefined,
    setIsSnapInstalled: (isSnapInstalled) => {},
  isConnected: undefined,
    setIsConnected: (isConnected) => {},
});