import { useQuery } from '@apollo/client';
import Button from "~/components/button";
import toast from "react-hot-toast";
import React, { useState } from 'react'
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Criterias from '~/components/general/dashboard/judge/criterias';
import SelectedTeamList from '~/components/general/dashboard/judge/selectedTeamList';
import TeamList from '~/components/general/dashboard/judge/teamList';
import Spinner from '~/components/spinner';
import { JudgeGetTeamsByRoundDocument, RoundByJudgeDocument, WinnersByEventDocument } from '~/generated/generated';
import { useAuth } from '~/hooks/useAuth';

const JudgeTab = ({ shouldPoll }: { shouldPoll: boolean }) => {
  const { user, loading } = useAuth();

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const { data, loading: EventLoading } = useQuery(RoundByJudgeDocument, {
    skip: !user || loading,
  });

  const roundNo =
    data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess"
      ? data.roundByJudge.data.roundNo
      : null;
  const eventId =
    data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess"
      ? data.roundByJudge.data.eventId
      : null;

  const { data: TeamsData, loading: TeamsLoading } = useQuery(
    JudgeGetTeamsByRoundDocument,
    {
      ...(shouldPoll ? { pollInterval: 1000 } : {}),
      variables: {
        roundId: roundNo!,
        eventId: Number(eventId!),
      },
      skip:
        !user ||
        loading ||
        !(data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess"),
    },
  );

  const { data: winners, loading: winnersLoading } = useQuery(
    WinnersByEventDocument,
    {
      variables: {
        eventId: eventId!,
      },
      skip:
        !eventId ||
        !(
          data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess" &&
          data?.roundByJudge.data.roundNo ===
          data.roundByJudge.data.event.rounds.length
        ),
    },
  );

  const isCompleted =
    (data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess" &&
      data.roundByJudge.data.event.rounds.find(
        (round) => roundNo === round.roundNo,
      )?.completed) ??
    false;

  return (
    <div
      className={isCompleted ? "pointer-events-none relative opacity-30" : ""}
    >
      <div className="relative flex flex-wrap items-center justify-between px-4 py-4 sm:px-10">
        <h1 className="mb-3 text-2xl sm:text-3xl">
          Hello <span className="font-semibold">{user?.name}</span>!
        </h1>
          {!isCompleted && (
            <Button
              intent={"danger"}
              className="flex gap-2"
              onClick={async () => {
                toast.loading("Logging out...");
                await signOut();
                toast.success("Logged out successfully");
              }}
            >
              Log Out
              <LogOut />
            </Button>
          )}
        <h1 className="mb-3 text-2xl sm:text-3xl">
          {data?.roundByJudge.__typename === "QueryRoundByJudgeSuccess" && (
            <span>
              Round {data.roundByJudge.data.roundNo} of{" "}
              {data.roundByJudge.data.event.name}
            </span>
          )}
        </h1>
      </div>
        {isCompleted && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black/50 z-50">
            <h1 className="text-3xl font-semibold text-white mb-6">
              Thank you for judging this event!
            </h1>
            <div className="mt-4 pointer-events-auto">
              <Button
                intent={"danger"}
                className="flex gap-2"
                onClick={async () => {
                  toast.loading("Logging out...");
                  await signOut();
                  toast.success("Logged out successfully");
                }}
              >
                Log Out
                <LogOut />
              </Button>
            </div>
          </div>
        )}
      <div className="mb-10 flex min-h-[80vh] w-full flex-wrap justify-center gap-3 px-8 sm:flex-nowrap sm:px-0">
        <div className="w-full shrink-0 grow-0 rounded-lg bg-black/20 sm:w-auto sm:basis-1/2">
          {EventLoading ? (
            <Spinner />
          ) : (
            <>
              {data?.roundByJudge.__typename ===
                "QueryRoundByJudgeSuccess" && (
                  <TeamList
                    shouldPoll={shouldPoll}
                    data={TeamsData}
                    loading={TeamsLoading}
                    selectionMode={selectionMode}
                    setSelectionMode={setSelectionMode}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    roundNo={data.roundByJudge.data.roundNo}
                    eventType={data.roundByJudge.data.event.eventType}
                    eventId={data.roundByJudge.data.eventId}
                    finalRound={
                      data.roundByJudge.data.roundNo ===
                      data.roundByJudge.data.event.rounds.length
                    }
                    winners={winners}
                  />
                )}
            </>
          )}
        </div>
        <div className="w-full shrink-0 grow-0 rounded-lg bg-black/20 sm:w-auto sm:basis-1/2">
          {EventLoading ? (
            <Spinner />
          ) : (
            <>
              {selectionMode ? (
                <>
                  {data?.roundByJudge.__typename ===
                    "QueryRoundByJudgeSuccess" &&
                    TeamsData && (
                      <SelectedTeamList
                        shouldPoll={shouldPoll}
                        eventId={data.roundByJudge.data.eventId}
                        teams={TeamsData}
                        roundNo={data.roundByJudge.data.roundNo}
                        finalRound={
                          data.roundByJudge.data.roundNo ===
                          data.roundByJudge.data.event.rounds.length
                        }
                        winners={winners}
                        winnersLoading={winnersLoading}
                        eventType={data.roundByJudge.data.event.eventType}
                      />
                    )}
                </>
              ) : selectedTeam ? (
                <>
                  {data?.roundByJudge.__typename ===
                    "QueryRoundByJudgeSuccess" && (
                      <Criterias
                        selectedTeam={selectedTeam}
                        eventId={data?.roundByJudge.data.eventId}
                        roundNo={data?.roundByJudge.data.roundNo}
                        criterias={data.roundByJudge.data.criteria}
                      />
                    )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <h1 className="text-2xl font-semibold">
                    Choose a team to start judging.
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default JudgeTab
