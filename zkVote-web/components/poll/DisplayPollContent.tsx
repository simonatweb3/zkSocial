import { useEffect, useState } from "react";
import { voteInPoll } from "../../utils/vote";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNetwork } from "wagmi";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default function DisplayPollContent(props: any) {
    const { chain } = useNetwork();
    const [isRelayer, setIsRelayer] = useState(true);
    useEffect(() => {
        // console.log("chain?.id", chain?.id)
        if (chain?.id === 59140) {
            setIsRelayer(false);
        } else {
            setIsRelayer(true);
        }
    }, [chain?.id]);
    // console.log("isRelayer", isRelayer)

    const { poll, groupId, isMember } = props;
    const numPollId = parseInt(poll.pollId);
    const router = useRouter();
    const [isVoted, setIsVoted] = useState<any>(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
    }, [poll]);

    const [choice, setChoice] = useState<any>(null);
    //write a handle choice function
    const handleChoice = (c: any) => {
        setChoice(c);
    }
    useEffect(() => {
    }, [choice]);

    const emptyMessageNotify = () =>
        toast.error("Please select a choice!", {
            position: "bottom-right",
            theme: "light",
        });

    const notMemberNotify = () =>
        toast.error("You're not able to vote yet since you're not a member yet.", {
            position: "bottom-right",
            theme: "light",
        });

    const submitPoll = async (groupId: number, pollId: number, msg: string, isMember: boolean) => {
        if (!isMember) {
            notMemberNotify();
            return;
        }
        if (msg === "") {
            emptyMessageNotify();
            return;
        }
        setIsLoading(true);

        const tx: any = voteInPoll(groupId, pollId, msg, isRelayer, chain?.id!);
        // write?.();
        if (tx) {
            setIsVoted(true);
            setIsLoading(false);
        }
        router.push(`/${groupId}/${pollId}`)

    }
    useEffect(() => {

    }, [isVoted]);
    useEffect(() => {
    }, [isLoading]);
    return (
        <>
            <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
                <div className="flex">
                    <div className="flex flex-col mt-2 w-full">
                        {poll &&
                            <>
                                <p className='font-mono text-xl font-bold mb-4'>Vote Anonymously</p>

                                {poll.voteMsgs && poll.voteMsgs.length > 0 && poll.voteMsgs.map((choice: any, index: number) => (
                                    <div key={index}>
                                        <button onClick={() => handleChoice(choice)} className="w-full flex flex-row border border-black border-2 rounded-3xl item-center justify-center py-4 mb-4 visited:bg-violet-700 focus:ring focus:outline-none focus:ring-violet-300 hover:bg-violet-300">
                                            <p className='px-10 font-mono text-lg font-bold'>{choice}</p>
                                        </button>
                                    </div>
                                ))}
                            </>
                        }
                        {!isLoading && choice && choice != "" &&
                            <button onClick={() => submitPoll(groupId, numPollId, choice, isMember)} className="border border-black border-2 rounded-3xl py-4 mb-4 bg-[#A073FF]">
                                <p className="px-10 font-mono text-lg font-bold ">Vote</p>
                            </button>
                        }
                        {!isLoading && (choice === null || choice === "") && <>
                            <button style={{ cursor: "not-allowed" }} className="disabled opacity-50 border border-black border-2 rounded-3xl py-4 mb-4 bg-[#A073FF]">
                                <p className="px-10 font-mono text-lg font-bold ">Vote</p>
                            </button>
                        </>
                        }
                        {isLoading &&
                            <div className='justify-center flex w-full ' >
                                <button style={{ cursor: "not-allowed" }} className="w-full bg-[#A073FF] disabled opacity-75 flex border border-black border-2 rounded-3xl py-4 mb-4 text-center item-center justify-center">
                                    <div className="flex px-10 font-mono text-lg font-bold">
                                        <Spin indicator={antIcon} className="mr-2" style={{ color: "black" }} />
                                        <p >Vote</p>
                                    </div>
                                </button>

                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )

}
