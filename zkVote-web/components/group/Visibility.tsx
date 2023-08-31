
import { PRIVACY } from '../../utils/vote';
import { CreateGroupFormInputs } from "../../pages/create";
import { UseFormRegister } from "react-hook-form";
const Visibility: React.FC<{
  register: UseFormRegister<CreateGroupFormInputs>,
  counter: () => void,
  goBack: () => void 
  }>= ({register, counter, goBack}) => (
    <>
      <div className=" border border-2 border-black bg-white rounded-3xl border-black py-10 px-10 mx-32 my-10">
        <p className="font-mono text-lg font-bold">Decide Who Can Join the Group. Public or NFT or TOKEN holders*</p>
        <div className="flex ml-4 mt-2">
          <div className="flex flex-col font-mono text-lg font-bold">
            {/* <label>
              <input
                type="radio"
                name="visibility"
                value={PRIVACY.ANYONE}
                {...register("visibility")}
              />
              Anyone
            </label> */}
            <label>
              <input
                type="radio"
                value={PRIVACY.NFT}
                {...register("visibility")}
              />
              NFT
            </label>
            {/* <label>
              <input
                type="radio"
                name="visibility"
                value={PRIVACY.TOKEN}
                {...register("visibility")}
              />
              Token
            </label> */}
          </div>
        </div>
      </div>
      <div className="relative my-16">
      <button onClick={goBack} className="absolute bottom-0 left-32">
        <img className="w-10/12" src='/create/cancel2.png' />
      </button>
        <button onClick={counter} className="absolute bottom-0 right-24">
          <img className="w-10/12"src='/create/save-next.png' />
        </button>
      </div>
    </>
  );

export default Visibility;
