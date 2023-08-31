import React, { useEffect, useState } from 'react';
import MainPage from '../../components/layout/MainPage';
import { useQueryAllGroupInfo } from '../../hooks/query/useQueryAllGroupInfo';
import { mint_nft } from '../../utils/vote';
import { getSpecificGroupInfo } from '../../utils/group';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export async function getServerSideProps(context: any) {
    const { group } = context.query;
    return {
        props: { group }
    }
}

export default function Join(props: any) {
    const router = useRouter();
    const groupId = props.group;
    const allGroup = useQueryAllGroupInfo();
    const [currentGroup, setCurrentGroup] = useState<any>();
    useEffect(() => {
        if (allGroup && allGroup.stat) {
            const currentGroup = getSpecificGroupInfo(allGroup.stat, groupId);
            setCurrentGroup(currentGroup);
        }
    }, [allGroup]);
    const mintNotify = () =>
        toast.success("Successfully minted NFT! 🥳 Note that it may take 30 secs for it to be reflected on your account!", {
            position: "bottom-right",
            theme: "light",
            onClose: () => {
                router.push(`/${groupId}`)
            }
        });

    const mint = async (asset: string) => {
        console.log("asset:", asset)
        const res = await mint_nft(asset);
        console.log("res", res);
        if (res !== undefined) {
            mintNotify();
        }
    }

    return (
        <MainPage>
            {currentGroup &&
                <>
                    <h1 className="text-2xl text-md mb-3 ml-6 ">Join/{currentGroup.name}</h1>

                    <div className='flex flex-col justify-center'>
                        <img className='w-24 rounded-full mt-10 mx-auto' src={currentGroup.icon}></img>
                        <div className='mx-auto'>
                            <p className='font-mono text-lg my-10'>You need to have an NFT to join the group, you can mint it now!</p>
                        </div>
                        <button onClick={() => mint(currentGroup.asset)} className="bg-[#5FFF37] mx-80 py-4 mt-2 bg-white border border-2 border-black hover:bg-[#A073FF] hover:text-white text-black font-normal py-2 px-8 rounded-full">Mint NFT</button>

                    </div>
                </>
            }

        </MainPage>
    );
}

