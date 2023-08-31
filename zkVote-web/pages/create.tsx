import React from 'react';
import CreationSteps from '../components/group/Steps';
import MainPage from '../components/layout/MainPage';
import { useState, useEffect } from 'react';
import Details from '../components/group/Details';
import { useForm } from "react-hook-form";
import Visibility from '../components/group/Visibility';
import TokenSetup from '../components/group/TokenSetup';
import {  PRIVACY } from '../utils/vote';
import { useRouter } from 'next/router';
import { useCreateGroup } from '../hooks/useCreateGroup';
import { useAccount } from 'wagmi';
import { useWaitForTransaction } from 'wagmi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from 'antd';
import { useNetwork, useSwitchNetwork } from 'wagmi'
import nfts420 from '../components/nfts/420NFT';
import nfts59140 from '../components/nfts/59140NFT';
export interface CreateGroupFormInputs {
  tokenAddress: string;
  visibility: PRIVACY;
  groupName: string;
  groupDescription: string;
  // image: any;
  imageLink: string;
}
export default function Create() {
  

  const [step, setStep] = useState(0);
  const router = useRouter();
  const {
    register,
    watch,
  } = useForm<CreateGroupFormInputs>({
    defaultValues: {
      tokenAddress: "",
      visibility: PRIVACY.ANYONE,
      groupName: "",
      groupDescription: "",
      // image: undefined,    
    },
  });

  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork()
  const [network, setNetwork] = useState<any>();
  const chainIds = chains.map((x) => x.id)
  const isRightNetwork = chainIds.includes(chain?.id!)

  useEffect(() => {
    // Set the network  if user is on the correct network
    if (isRightNetwork) {
      setNetwork(chain);
    } else {
      setNetwork(null);
    }
  }, [chain, isRightNetwork]);
  const [preview, setPreview] = useState<string>();
  // const image = watch("image");
  const tokenAddress = watch("tokenAddress");
  const visibility = watch("visibility");
  const groupName = watch("groupName");
  const groupDescription = watch("groupDescription");
  const imageLink = watch("imageLink");

  // useEffect(() => {
  //     if (image! && image![0]) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //           setPreview(reader.result as string);
  //       };
  //       reader.readAsDataURL(image[0]);
  //     }
  //   }, [image]);

  const { address } = useAccount();

  const fn = useCreateGroup(groupName, groupDescription, visibility, imageLink, tokenAddress, address!);

  const onSubmit = () => {
    console.log("submitting", tokenAddress);

    fn.write?.();
  }

  const waitForTransaction = useWaitForTransaction({
    hash: fn?.data?.hash,
  })

  useEffect(() => {
    if (waitForTransaction.data) {
      groupCreationNotify();
    }
  }, [waitForTransaction])


  const counter = () => {
    const currentStep = step + 1;
    setStep(currentStep)
  }

  const goBack = () => {
    const currentStep = step - 1;
    setStep(currentStep)
  }

  const groupCreationNotify = () =>
    toast.success("You have successfully created a group! 🥳", {
      position: "bottom-right",
      theme: "light",
      onClose: () => router.push("/explore"),
    });


  let nfts: any = null;
  if (network?.id === 420) {
    nfts = nfts420;
  } else if (network?.id === 59140) {
    nfts = nfts59140;
  }

  const renderFn = (step: number) => {
    switch (step) {
      case 0:
        return <Details register={register} preview={preview} counter={counter} />;
      case 1:
        return <Visibility register={register} counter={counter} goBack={goBack} />;
      case 2:
        return <TokenSetup register={register} onSubmit={onSubmit} goBack={goBack} nfts={nfts} />;
      default:
        return null;
    }
  }

  return (
    <>
      <MainPage>
        <h1 className="text-2xl text-md ml-6">Create Group/</h1>
        <Divider style={{ borderWidth: 0.5, borderColor: "#000000", margin: '12px 0px' }} />

        <div className="pt-10 ">
          <div className='mx-40'>
            <CreationSteps step={step} setStep={setStep} />
          </div>
        </div>
        {renderFn(step)}
      </MainPage>
    </>
  );
}