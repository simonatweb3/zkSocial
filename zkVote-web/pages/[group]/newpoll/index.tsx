import React, { use } from "react";
import { ChangeEvent } from "react";
import MainPage from '../../../components/layout/MainPage';
import { useRouter } from 'next/router';
import PollForm from "../../../components/poll/PollForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { getSpecificGroupInfo } from "../../../utils/group";
import { Space, Spin } from 'antd';
import { useCreatPoll } from "../../../hooks/useCreatePoll";
import { useWaitForTransaction } from 'wagmi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from 'antd';
import { useQueryAllGroupInfo } from "../../../hooks/query/useQueryAllGroupInfo";

export interface CreatePollFormInputs {
  choices: string[];
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}
export async function getServerSideProps(context: any) {
  const { group } = context.query;
  return {
    props: { group }
  }
}
export default function NewPoll(props: any) {
  const groupId: string = props.group;
  const numId = parseInt(groupId);
  const allGroup = useQueryAllGroupInfo();
  const router = useRouter();
  const [currentGroup, setCurrentGroup] = useState<any>();

  useEffect(() => {
    try {
      if (allGroup && allGroup.stat) {
        
        const currentGroup = getSpecificGroupInfo(allGroup.stat, groupId);
        setCurrentGroup(currentGroup);
      }
    } catch (e) {
      console.log(e);
      router.reload();
    }

  }, [allGroup]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreatePollFormInputs>({
    defaultValues: {
      choices: [""],
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const setElemAtIndex = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    formKey: keyof CreatePollFormInputs,
    formVal: string[]
  ) => {
    setValue(formKey, [
      ...formVal.slice(0, index),
      event.target.value,
      ...formVal.slice(index + 1),
    ]);
  };
  const removeElemAtIndex = (
    index: number,
    event: any,
    formKey: keyof CreatePollFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(
      formKey,
      formVal.filter((e, i) => i !== index)
    );
  };
  const addNewElem = (
    event: any,
    formKey: keyof CreatePollFormInputs,
    formVal: string[]
  ) => {
    event.preventDefault();
    setValue(formKey, [...formVal, ""]);
  };
  const choices = watch("choices");
  const title = watch("title");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const description = watch("description");
  useEffect(() => {
  }, [startDate, endDate, choices, title, description]);


  const fn = useCreatPoll(numId, title, choices, description);
  const onSubmit = async () => {
    fn.write?.();
  }
  const waitForTransaction = useWaitForTransaction({
    hash: fn?.data?.hash,
  })

  const voteCreatedNotify = () =>
    toast.success("Successfully created a vote! 🥳 Sit tight, it may take up to 30 secs to show up in the group! 🍹", {
      position: "bottom-right",
      theme: "light",
      onClose: () => router.push(`/${groupId}`),
    });


  useEffect(() => {
    if (waitForTransaction.data) {
      setIsVoteCreated(true);
    }
  }, [waitForTransaction])

  const [isVoteCreated, setIsVoteCreated] = useState<any>();
  useEffect(() => {
    if (isVoteCreated) {
      voteCreatedNotify();
    }
  }, [isVoteCreated])




  return (
    <MainPage>
      {!currentGroup &&
        <div className='justify-center flex py-24' >
          <Spin tip="Loading..." size="large" />
        </div>
      }
      {currentGroup && <>
        <h1 className="text-2xl text-md ml-6 ">{currentGroup.name}/New Poll/</h1>
        <Divider style={{ borderWidth: 0.5, borderColor: "#000000", margin: '12px 0px' }} />
        <div className="pt-10 pb-10">
          <div className="mx-20">
            <PollForm groupId={groupId} setValue={setValue} startDate={startDate} endDate={endDate} register={register} choices={choices} setElemAtIndex={setElemAtIndex} removeElemAtIndex={removeElemAtIndex} addNewElem={addNewElem} onSubmit={onSubmit} />
          </div>
        </div>
      </>
      }
    </MainPage>
  );
}