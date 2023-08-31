import { useEffect, useState } from "react";
import { useFetchAllVotes } from "../../hooks/query/useFetchAllVotes";
import DisplayVoteItem from "./DisplayVoteItem";
import StatButton from "./StatButton";

export default function DisplayVote(props: any) {
    const { groupId, pollId } = props;
    const allVotes = useFetchAllVotes(groupId, pollId);

    return (
        <>
            <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full justify-end">
                {allVotes && allVotes.stat &&
                    <div className="flex">
                        <p className="font-mono text-xl font-bold">Votes</p>
                        <button className="px-6 ml-4 bg-[#D9D9D9] rounded-3xl">{allVotes.stat.length}</button>
                        <p className="font-mono absolute right-28 text-lg text-[#A073FF]">How anonymous voting works?</p>
                    </div>
                }
                <div className="flex flex-col mt-2 justify-end">
                    {allVotes && allVotes.stat && allVotes.stat.map((vote: any, idx: number) => (
                        <div key={idx}>
                            <DisplayVoteItem vote={vote} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )

}
