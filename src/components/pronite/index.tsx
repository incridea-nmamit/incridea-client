import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import Spinner from "~/components/spinner";
import {
  RegisterProniteDocument,
} from "~/generated/generated";
import { pidToId } from "~/utils/id";

function Pronite({
  pId,
  stopCamera,
  startCamera,
  clearScanResults,
}: {
  pId: string;
  stopCamera: () => void;
  startCamera: () => void;
  clearScanResults: () => void;
}) {
  const [cameraOn, setCameraOn] = useState(true);
  const [showPopup,setShowPopup]=useState(false);
  const [registerPronite, { data, loading }] = useMutation(
    RegisterProniteDocument,
    {
      variables: {
        userId: pidToId(pId),
      },
    },
  );
  useEffect(() => {
    if (
      data?.registerPronite.__typename === "MutationRegisterProniteSuccess" ||
      data?.registerPronite.__typename === "Error"
    ) {
      stopCamera();
      setCameraOn(false);
    }
  }, [data, stopCamera]);
  return (
    <>
      <div className="mb-20 mt-1 max-w-sm">
        {!cameraOn ? (
          <Button
            onClick={() => {
              startCamera();
              clearScanResults();
              setCameraOn(true);
            }}
            intent={"success"}
            className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700"
          >
            Scan Again
          </Button>
        ) : (
          <div className="flex flex-wrap mt-2">
        <Button
          intent={"success"}
          className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700 mr-2"
          onClick={() => setShowPopup(true)}
        >
          Register
        </Button>
        {showPopup && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-1000 m-0">
            <div className="bg-primary-900 border border-secondary-500 p-5 rounded shadow-lg m-5 h-fit fixed top-1/4 transform  -translate-y-1/2">
              <h2 className="text-lg font-bold mb-4">Confirm Registration</h2>
              <p className="mb-4">Are you sure you want to register for Pronite?</p>
              <div className="flex justify-end space-x-3">
            <Button
            intent={"danger"}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() => setShowPopup(false)}
            >
            Cancel
            </Button>
            <Button
            intent={"success"}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={async () => {
              await registerPronite();
              setShowPopup(false);
            }}
            >
            Confirm
            </Button>
              </div>
            </div>
          </div>
        )} 
          <Button 
          intent={"info"}
          className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700"
          onClick={clearScanResults}>
          Scan Again
          </Button>
          </div>

        )}
      </div>
      {loading ? (
        <>
          <Spinner className="mt-3" intent={"white"} size={"small"} />
        </>
      ) : data?.registerPronite.__typename ===
        "MutationRegisterProniteSuccess" ? (
        <div className="rounded-md bg-white/10 p-3">
          <div className="mb-2 text-lg leading-snug text-green-500">
            <span className="font-bold">{pId}</span> registered for Pronite
          </div>
          {/* <div className="text-white">
            <div className="text-lg leading-snug">
              {data.registerPronite.data.user.name}
            </div>
            <div className="text-sm leading-snug">
              {data.registerPronite.data.user.college?.name}
            </div>
            <div className="text-sm leading-snug">
              {data.registerPronite.data.user.phoneNumber}
            </div>
          </div> */}
        </div>
      ) : (
        <div className="rounded-md bg-white/10 font-semibold text-red-500">
          {data?.registerPronite.message && (
            <div>
              <p className="p-3 py-2">{data.registerPronite.message}</p>
              {/* {userData?.userById.__typename === "QueryUserByIdSuccess" &&
                !data.registerPronite.message.includes("authorized") && (
                  <div className="rounded-md bg-white/10 p-3">
                    <div className="mb-1 text-lg leading-snug">
                      <span className="font-bold text-green-500">{pId}</span>
                    </div>
                    <div className="text-white">
                      <div className="text-lg leading-snug">
                        {userData.userById.data.name}
                      </div>
                      <div className="text-sm leading-snug">
                        {userData.userById.data.college?.name}
                      </div>
                      <div className="text-sm leading-snug">
                        {userData.userById.data.phoneNumber}
                      </div>
                    </div>
                  </div>
                )} */}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Pronite;
