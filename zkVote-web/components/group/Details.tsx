import { CreateGroupFormInputs } from "../../pages/create";
import { UseFormRegister } from "react-hook-form";
const Details :React.FC<{
  register: UseFormRegister<CreateGroupFormInputs>,
  preview: any,
  counter: () => void,
  }>= ({register, preview, counter}) => (
    <>

      <div className=" border border-2 border-black bg-white rounded-3xl border-black py-10 px-10 mx-32 my-10">
        <p className="font-mono text-lg font-bold">Group Name*</p>
        <div className="flex justify-center mt-2">
          <input
            type="text"
            id="groupName"
            className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4 block bg-white focus:ring-indigo-500 focus:border-indigo-500"
            {...register("groupName")}
          />
        </div>

        <p className="font-mono text-lg font-bold mt-2">Group Description</p>
        <div className="mt-2 flex justify-center">
          <textarea
            rows={5}
            id="groupDescription"
            className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4 block bg-white focus:ring-indigo-500 focus:border-indigo-500"
            {...register("groupDescription")}
          />
        </div>


        <p className="font-mono text-lg font-bold mt-2">Upload Logo URL</p>
        <div className="mt-2 flex justify-center">
          <input
            type="text"
            id="logo"
            className="w-full text-lg border border-2 border-black font-bold placeholder:text-lg placeholder:font-bold py-4 px-4 block bg-white focus:ring-indigo-500 focus:border-indigo-500"
            {...register("imageLink")}
          />
        </div>



        {/* <div className="mt-4 mb-4 text-center flex justify-center">
          <label htmlFor="file-upload" className="custom-file-upload" style={{ cursor: "pointer" }}>
            <div className="h-40 w-40 my-10">
              {preview ? (
                <img className="mx-auto" src={preview} alt="avatar" />
              ) : (
                <img
                  className="mx-auto"
                  src={"https://s2.loli.net/2022/11/19/qeyLJlnr2xv9mts.png"}
                  alt="default"
                />
              )}
            </div>
            <a style={{ cursor: "pointer" }}>
              <p className="text-black font-mono w-full px-4 font-bold text-lg border border-black border-2 rounded-3xl bg-white py-4">
                Upload Logo +
              </p>
            </a>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              {...register("image")}
            />
          </label>
        </div> */}

      </div>
      <div className="relative my-16">
        <button onClick={counter} className="absolute bottom-0 right-24">
          <img className="w-10/12"src='/create/save-next.png' />
        </button>
      </div>

    </>
  );

export default Details;
