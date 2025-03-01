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
        </div>
      ) : (
        <div className="rounded-md bg-white/10 font-semibold text-red-500">
          {data?.registerPronite.message && (
            <div>
              <p className="p-3 py-2">{data.registerPronite.message}</p>
            </div>
          )}
        </div>
      )}
        {!cameraOn ? (
          <Button
            onClick={() => {
              startCamera();
              clearScanResults();
              setCameraOn(true);
            }}
            intent={"success"}
            className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700 mt-1"
          >
            Scan Again
          </Button>
        ) : (
          <div className="flex flex-wrap mt-2">
        <Button
          intent={"success"}
          className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700 mr-2"
          onClick={async () => {
            await registerPronite();
          }}
        >
          Register
        </Button>
          <Button 
          intent={"info"}
          className="mx-auto rounded bg-blue-500 px-7 py-2.5 font-bold text-white hover:bg-blue-700"
          onClick={clearScanResults}>
          Scan Again
          </Button>
          </div>

        )}
      </div>
    </>
  );
}
export default Pronite;
