import { useState } from "react";
import { useZxing } from "react-zxing";

import Badge from "~/components/badge";
import Pronite from "~/components/pronite";

import AddParticipantToEvent from "./addParticipantToEvent";
import MarkAttendance from "./scanMarkAttendance";
import ScanParticipantToTeam from "./scanParticipantToTeam";
import { useQuery } from "@apollo/client";
import { UserByIdDocument } from "~/generated/generated";
import { pidToId } from "~/utils/id";
import Spinner from "~/components/spinner";

export const QRCodeScanner: React.FC<{
  intent: "attendance" | "addToTeam" | "addToEvent" | "pronite";
  eventId?: string;
  teamId?: string;
  eventType?: string;
  pId?: string;
}> = ({ intent, eventId, teamId, eventType }) => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const { data: userData, loading: userLoading } = useQuery(UserByIdDocument, {
    variables: userId ? { id: pidToId(userId) } : undefined,
    skip: !userId,
  });

  const { ref } = useZxing({
    onDecodeResult: (result) => {
      setResult(result.getText());
      setUserId(result.getText());
    },
    onDecodeError(error) {
      setError(error.message);
    },
  });

  const stopCamera = () => {
    const stream = ref.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
  };

  const startCamera = () => {
    // start the camera again
    void navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const video = ref.current;
        if (video) {
          video.srcObject = stream;
        }
      });
  };

  const clearScanResults = () => {
    setResult(null);
    setError(null);
  };
  console.log(result);

  return (
    <div className="relative flex flex-col items-center">
      <video
        className="w-full rounded-lg border border-emerald-900"
        ref={ref}
      />
      {!result && (
        <div className="mt-2 text-center text-sm text-gray-400">
          <span className="text-amber-500">Note:</span> Detection is retried
          every 300ms. If you are not seeing the detection, try moving the
          camera closer to the QR code.
        </div>
      )}
      <div className="mt-4">
        {result && (
          <div className="flex flex-col items-center">
            <Badge color={"info"}>Scanned ID: {result}</Badge>
            <div className="m-2">
              {intent === "attendance" && (
                <MarkAttendance
                  eventId={eventId}
                  eventType={eventType ?? ""}
                  result={result}
                />
              )}
              {intent === "addToEvent" && (
                <AddParticipantToEvent
                  eventId={eventId ?? ""}
                  userId={result}
                />
              )}
              {intent === "addToTeam" && (
                <ScanParticipantToTeam teamId={teamId ?? ""} userId={result} />
              )}
              {intent === "pronite" && (
                <>
                {userLoading && <Spinner intent={"white"} size={"small"} />}
                  {userData?.userById.__typename === "QueryUserByIdSuccess" && (
                    <div className="rounded-md bg-white/10 p-3">
                      <div className="mb-1 text-lg leading-snug text-center">
                        <span className="font-bold text-green-500">{result}</span>
                      </div>
                      <div className="text-white">
                        <div className="text-lg leading-snug text-center">
                          {userData.userById.data.name}
                        </div>
                        <div className="text-sm leading-snug text-center">
                          {userData.userById.data.college?.name}
                        </div>
                        <div className="text-sm leading-snug text-center">
                          {userData.userById.data.phoneNumber}
                        </div>
                      </div>
                    </div>
                  )}
                  <Pronite
                    pId={result}
                    stopCamera={stopCamera}
                    startCamera={startCamera}
                    clearScanResults={clearScanResults}
                  />
                </>
              )}
            </div>
          </div>
        )}
        {error && !result && (
          <Badge color={"danger"}>No QR Code in sight</Badge>
        )}
      </div>
    </div>
  );
};
