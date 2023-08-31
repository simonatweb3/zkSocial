import { LinkOutlined } from '@ant-design/icons';
import { useNetwork } from 'wagmi';
export default function DisplayVoteItem(props: any) {
    const { chain } = useNetwork()
    let prefix;
    if (chain?.id === 420) {
        prefix = 'https://goerli-optimism.etherscan.io/tx/'
    } else if (chain?.id === 59140) {
        prefix = 'https://explorer.goerli.zkevm.consensys.net/tx/'
    }

    const { vote } = props;
    const date = new Date(vote.blockTimestamp * 1000);
    const dateString: string = date.toLocaleDateString();
    const timeString: string = date.toLocaleTimeString();
    return (
        <>
            <div className="flex mt-2 text-lg grid grid-cols-3 justify-end gap-x-4 bg-[#F3EFFB] rounded-3xl p-3">
                <div className="flex flex-row">
                    <img className="w-10 " src={'/vote/anon.png'} />
                    <p className="ml-4">Anonymous</p>
                </div>
                <p >{dateString} {timeString}</p>
                <a target="_blank" rel="noreferrer" href={`${prefix}${vote.transactionHash}`}>
                    <p className="absolute right-28 "><LinkOutlined style={{ color: '#A073FF' }} /></p>
                </a>
            </div>
        </>
    )

}
