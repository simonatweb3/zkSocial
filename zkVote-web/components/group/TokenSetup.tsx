
import { CreateGroupFormInputs } from "../../pages/create";
import { MenuProps, Select } from 'antd';
import nfts420 from "../nfts/420NFT";
import nfts59140 from "../nfts/59140NFT";
import { UseFormRegister } from "react-hook-form";
const TokenSetup: React.FC<{
  register: UseFormRegister<CreateGroupFormInputs>,
  onSubmit: () => void,
  goBack: () => void,
  nfts: any,
}> = ({ register, onSubmit, goBack, nfts }) => (
  <>
    <div className=" border border-2 border-black bg-white rounded-3xl border-black py-10 px-10 mx-32 my-10">
      <p className='font-mono text-lg font-bold'>Setup required token for joining</p>
      <div className="flex justify-center mt-2">
        <select
          placeholder='Import Token Contract Address...'
          id="tokenAddress"
          className="appearance-none w-full text-lg border border-2 border-black font-mono placeholder:text-lg placeholder:italic py-4 px-4  block bg-white  focus:ring-indigo-500 focus:border-indigo-500"
          {...register("tokenAddress")}
        >
          {nfts && nfts.map((nft:any, idx:any) => (
            <option key={idx} value={nft.value}>{nft.label}</option>
          ))}
        </select>
      </div>


    </div>
    <div className="relative my-16">
      <button onClick={goBack} className="absolute bottom-0 left-32">
        <img className="w-10/12" src='/create/cancel2.png' />
      </button>
      <button className="absolute bottom-0 right-24" onClick={onSubmit}>
        <img className="w-10/12" src="/create/create.png" />
      </button>

    </div>

  </>
)


export default TokenSetup