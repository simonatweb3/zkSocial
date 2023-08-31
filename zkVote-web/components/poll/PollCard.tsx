import Link from 'next/link';
import { useFetchTxn } from '../../hooks/txn/useFetchTxn';
export default function PollCard(props: any) {
    const { poll, groupId } = props;
    const result = useFetchTxn(poll.transactionHash.slice(2))


    return (
        <>
            <Link href={`/${groupId}/${poll.pollId}`}>
                <div key={poll.pollId} className="mb-4 flex flex-col border border-[#DBD2EE] border-2 pl-6 py-4 rounded-3xl hover:border-[#5FFF37] ">
                    <div className='flex flex-row'>
                        <p className='font-mono text-lg font-bold text-black'>{poll.title}</p>
                        <button className='border border-2 border-[#2CC805] rounded-3xl absolute right-24 mt-5 px-2 text-[#42B924] '>Active</button>
                    </div>
                    {result && result.from &&
                        <button className='mt-2 ml-2 w-40 text-[#A073FF] text-sm trucate font-mono'
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>By {result.from}</button>}
                    <p className='mt-2 ml-2 font-bold text-black'>{poll.desc}</p>
                    <p className='mt-2 ml-2 font-bold text-[#B3B3B3]'>5 days left</p>
                </div>
            </Link>

        </>
    );
}
