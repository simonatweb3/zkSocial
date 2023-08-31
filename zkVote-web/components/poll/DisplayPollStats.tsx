import StatButton from "./StatButton";
export default function DisplayPollStats(props: any) {
  const { poll, groupId} = props;
  const pollChoices = poll.voteMsgs;
  //get the total length of the pollChoices

  
  return (
    <>
      <div className="bg-white border border-2 rounded-3xl border-black py-6 px-6 w-full">
        <div className="flex flex-col mt-2">
          {poll && pollChoices &&
            <>
              <p className='font-mono text-xl font-bold mb-4'>Current Results</p>
              {pollChoices.map((choice: any, idx: number) => (
                <div key={idx}>
                  <StatButton choice={choice} groupId={groupId} pollId={poll.pollId} />
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </>
  )

}
