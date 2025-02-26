import { useMutation } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { differenceInHours } from "date-fns";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { type FC, useEffect, useState } from "react";
import { BiLoaderAlt, BiTrash } from "react-icons/bi";
import { BsQrCodeScan } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import Button from "~/components/button";
import Modal from "~/components/modal";
import createToast from "~/components/toast";
import { env } from "~/env";
import {
  DeleteCriteriaDocument,
  DeleteJudgeDocument,
  DeleteRoundDocument,
  EndQuizDocument,
  type EventByOrganizerQuery,
  NotifyParticipantsDocument,
  UpdateQuizStatusDocument,
} from "~/generated/generated";

import CreateCriteriaModal from "./createCriteriaModal";
import CreateJudgeModal from "./createJudgeModal";
import CreateQuizModal from "./createQuizModal";
import EndQuizModal from "./endQuizModal";
import RoundAddModal from "./roundsAddModal";

const RoundsSidebar: FC<{
  rounds: Extract<
    EventByOrganizerQuery["eventByOrganizer"],
    { __typename: "QueryEventByOrganizerSuccess" }
  >["data"][number]["rounds"];
  eventId: string;
  isPublished: boolean;
}> = ({ rounds, eventId, isPublished }) => {
  const [endQuizMutation] = useMutation(EndQuizDocument, {
    refetchQueries: ["EventByOrganizer"],
    awaitRefetchQueries: true,
  });
  const [deleteRound, { loading: loading2 }] = useMutation(
    DeleteRoundDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      variables: {
        eventId: eventId,
      },
      awaitRefetchQueries: true,
    },
  );

  const [deleteJudge, { loading: deleteJudgeLoading }] = useMutation(
    DeleteJudgeDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      awaitRefetchQueries: true,
    },
  );

  const [deleteCriteria, { loading: deleteCriteriaLoading }] = useMutation(
    DeleteCriteriaDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      awaitRefetchQueries: true,
    },
  );

  const [notifyParticipants, { loading: notifyLoading }] = useMutation(
    NotifyParticipantsDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      awaitRefetchQueries: true,
    },
  );

  const [showNotifyModal, setShowNotifyModal] = useState(false);

  const [updateQuizStatus, { loading: updateQuizStatusLoading }] = useMutation(
    UpdateQuizStatusDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      awaitRefetchQueries: true,
    },
  );

  const [selectedRound, setSelectedRound] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDeleteRound = async () => {
    const promise = deleteRound();
    await createToast(promise, "Deleting round...");
  };

  const handleDeleteJudge = async (id: string) => {
    const promise = deleteJudge({
      variables: {
        eventId: eventId,
        roundNo: selectedRound,
        userId: id,
      },
    });
    await createToast(promise, "Deleting judge...");
  };

  const handleDeleteCriteria = async (id: string) => {
    const promise = deleteCriteria({
      variables: {
        eventId: eventId,
        roundNo: selectedRound,
        criteriaId: id,
      },
    });
    await createToast(promise, "Deleting criteria...");
  };

  const handleNotify = async () => {
    const roundDate = new Date(rounds[selectedIndex]?.date ?? "");
    const currentTime = new Date();
    const hoursDifference = differenceInHours(roundDate, currentTime);

    if (hoursDifference > 2) {
      await createToast(
        Promise.reject(
          new Error("Cannot notify more than 2 hours before the round"),
        ),
        "Notification error",
      );
      return;
    }

    // Show confirmation modal if within 2 hours
    setShowNotifyModal(true);
  };

  useEffect(() => {
    rounds.map((round) => {
      if (round.quiz?.endTime && new Date(round.quiz.endTime) < new Date()) {
        if (!round.quiz.completed) {
          void endQuizMutation({
            variables: {
              quizId: round.quiz.id,
            },
          });
        }
      }
    });
  }, [rounds]);

  const handlePublishQuiz = async (quizId: string, allowAttempts: boolean) => {
    const promise = updateQuizStatus({
      variables: {
        quizId,
        allowAttempts,
      },
    })
      .then((res) => {
        if (
          res.data?.updateQuizStatus.__typename !==
          "MutationUpdateQuizStatusSuccess"
        )
          throw new Error(
            res.data?.updateQuizStatus.message ?? "Error publishing quiz",
          );
      })
      .catch(async (err) => {
        const error = err instanceof Error ? err : new Error(String(err));
        await createToast(Promise.reject(error), "Failed to publish quiz");
      });

    await createToast(promise, "Publishing quiz...");
  };

  const handleCopyURL = async (copyString: string) => {
    try {
      await navigator.clipboard.writeText(copyString);
      await createToast(Promise.resolve(), "URL copied to clipboard");
    } catch (error) {
      // console.log(error);
      await createToast(
        Promise.reject(new Error("Failed to copy URL to clipboard")),
        "Failed to copy URL to clipboard",
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 px-2 pb-2">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex w-full flex-row items-center gap-2 overflow-x-auto rounded-2xl border border-gray-600 bg-gray-900/30 p-3 backdrop-blur-md">
          {rounds.map((round) => (
            <Tab key={round.roundNo} className="focus:outline-none md:w-full">
              {({ selected }) => (
                <button
                  onClick={() => {
                    setSelectedRound(round.roundNo);
                  }}
                  className={`w-full whitespace-nowrap rounded-lg px-3 py-2 ${
                    selected
                      ? "bg-blue-900/40 text-white"
                      : "bg-gray-600/40 text-gray-300"
                  }`}
                >
                  Round {round.roundNo}
                </button>
              )}
            </Tab>
          ))}
          <div className="flex items-end justify-center gap-2 text-xs">
            <RoundAddModal
              published={isPublished}
              eventID={eventId}
              roundNo={rounds.length}
            />
            <Button
              intent={"danger"}
              disabled={loading2 || isPublished}
              onClick={handleDeleteRound}
            >
              {loading2 ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Deleting...
                </>
              ) : (
                <>
                  <MdDelete className="text-xl" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </Tab.List>

        <Tab.List className="mt-2 flex flex-col lg:flex-row">
          <div className="mx-2 mb-2 w-full rounded-lg bg-gray-700 p-3 lg:mb-0">
            <h1 className="text-xl font-bold">Judges</h1>
            {/* List of judges for this round */}
            {rounds.map((round) => (
              <div key={round.eventId}>
                {round.roundNo === selectedRound && (
                  <>
                    {round.judges.length === 0 ? (
                      <p className="text-gray-400">No judges added yet.</p>
                    ) : (
                      round.judges.map((judge) => (
                        <div
                          key={round.roundNo}
                          className="my-2 flex items-center justify-between rounded-lg bg-white bg-opacity-10 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter"
                        >
                          <div>
                            <h1 className="text-lg font-bold">
                              {judge.user.name}
                            </h1>
                            <h1 className="text-sm text-gray-400">
                              {judge.user.email}
                            </h1>
                          </div>
                          <Button
                            intent={"danger"}
                            size="small"
                            outline
                            className="h-8 w-8"
                            onClick={async () =>
                              await handleDeleteJudge(judge.user.id)
                            }
                            disabled={deleteJudgeLoading}
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            ))}

            <CreateJudgeModal eventId={eventId} roundNo={selectedRound} />
          </div>

          <div className="mx-2 mb-2 w-full rounded-lg bg-gray-700 p-3 lg:mb-0">
            <h1 className="text-xl font-bold">Criterias</h1>
            {/* List of Criterias for this round */}
            {rounds.map((round) => (
              <div key={round.eventId}>
                {round.roundNo === selectedRound && (
                  <>
                    {round.criteria?.length === 0 ? (
                      <p className="text-gray-400">No Criterias added yet.</p>
                    ) : (
                      round.criteria?.map((criteria) => (
                        <div
                          key={round.roundNo}
                          className="my-2 flex items-center justify-between rounded-lg bg-white bg-opacity-10 bg-clip-padding p-3 backdrop-blur-lg backdrop-filter"
                        >
                          <div>
                            <h1 className="text-lg font-bold">
                              {criteria.name}
                            </h1>
                            <h1 className="text-sm text-gray-400">
                              {criteria.type}
                            </h1>
                          </div>
                          <Button
                            intent={"danger"}
                            size="small"
                            outline
                            className="h-8 w-8"
                            onClick={async () =>
                              await handleDeleteCriteria(criteria.id)
                            }
                            disabled={deleteCriteriaLoading}
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            ))}

            <CreateCriteriaModal eventId={eventId} roundNo={selectedRound} />
          </div>

          {rounds.length !== selectedRound && (
            <div className="relative mx-2 w-full rounded-lg bg-gray-700 p-3">
              <h1 className="mx-1 flex items-center justify-between text-xl font-bold">
                Quiz
              </h1>
              {rounds.map((round) => (
                <div key={round.eventId}>
                  {round.roundNo === selectedRound && (
                    <>
                      {round.quiz ? (
                        <div className="mt-2">
                          {!round.quiz.completed &&
                            (!round.quiz.allowAttempts ? (
                              <div className="mr-1 flex items-center justify-between">
                                <Button
                                  intent={"dark"}
                                  className="w-auto rounded-md"
                                >
                                  <Link
                                    href={`./organizer/quiz/${eventId}-${selectedRound}`}
                                  >
                                    Edit Quiz
                                  </Link>
                                </Button>
                                <Link
                                  href={`./organizer/quiz/${eventId}-${selectedRound}/preview`}
                                >
                                  <EyeIcon />
                                </Link>
                              </div>
                            ) : (
                              <Dialog>
                                <DialogTrigger>
                                  <Button
                                    intent={"dark"}
                                    className="w-auto rounded-md"
                                  >
                                    <BsQrCodeScan className="text-lg" />
                                    QR Code
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[20%]">
                                  <DialogHeader>
                                    <h1 className="text-center text-3xl font-bold">
                                      {round.quiz.name}
                                    </h1>
                                  </DialogHeader>
                                  <div className="flex flex-col items-center justify-center space-y-4">
                                    <QRCodeSVG
                                      value={`${env.NEXT_PUBLIC_THIS_APP_URL}/event/${round.quiz.name}-${selectedRound}/quiz/${round.quiz.id}`}
                                      size={200}
                                    />
                                    <div className="flex">
                                      <Button
                                        intent="secondary"
                                        className="rounded-md bg-black"
                                        onClick={() =>
                                          handleCopyURL(
                                            `${env.NEXT_PUBLIC_THIS_APP_URL}/event/${round.quiz?.name}-${selectedRound}/quiz/${round.quiz?.id}`,
                                          )
                                        }
                                      >
                                        Copy URL to clipboard
                                        <IoCopy size={25} />
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ))}
                          {!round.quiz.completed && (
                            <HoverCard>
                              <HoverCardTrigger>
                                <Button
                                  intent={
                                    round.quiz.allowAttempts
                                      ? "danger"
                                      : "success"
                                  }
                                  className="mt-2 w-auto rounded-md"
                                  onClick={() =>
                                    handlePublishQuiz(
                                      round.quiz?.id ?? "",
                                      !round.quiz?.allowAttempts,
                                    )
                                  }
                                  disabled={updateQuizStatusLoading}
                                >
                                  {round.quiz.allowAttempts
                                    ? "Unpublish "
                                    : "Publish "}
                                  Quiz
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="absolute -right-20 bottom-10 z-10 sm:-right-10 lg:bottom-0 lg:right-20">
                                <div className="text-sm sm:text-lg">
                                  <p className="text-center text-lg font-semibold sm:text-xl">
                                    {round.quiz.name}
                                  </p>
                                  <p>{round.quiz.description}</p>
                                  <p>
                                    <span className="font-semibold">
                                      Date:{" "}
                                    </span>
                                    {new Date(round.date ?? "")?.toDateString()}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Start Time:{" "}
                                    </span>
                                    {new Date(
                                      round.quiz.startTime,
                                    ).toLocaleTimeString()}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      End Time:{" "}
                                    </span>
                                    {new Date(
                                      round.quiz.endTime,
                                    ).toLocaleTimeString()}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Points awarded:{" "}
                                    </span>
                                    {round.quiz.points}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Qualifying Teams:{" "}
                                    </span>
                                    {round.quiz.qualifyNext}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      {round.quiz.allowAttempts
                                        ? "Published"
                                        : "Unpublished"}{" "}
                                      questions:{" "}
                                    </span>
                                    {round.quiz.questions.length}
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          )}
                          {round.quiz.completed && (
                            <Button
                              intent={"dark"}
                              className="mt-2 w-auto rounded-md"
                            >
                              <Link
                                // TODO(Omkar): Wont this link break
                                href={`./organizer/quiz/${eventId}-${selectedRound}/leaderboard`}
                              >
                                Leaderboard
                              </Link>
                            </Button>
                          )}
                          {round.quiz.allowAttempts &&
                            !round.quiz.completed && (
                              <EndQuizModal
                                quizName={round.quiz.name}
                                quizId={round.quiz.id}
                              />
                            )}
                        </div>
                      ) : (
                        <p className="text-gray-400">No Quiz added yet.</p>
                      )}
                      {!round.quiz?.allowAttempts && !round.quiz?.completed && (
                        <CreateQuizModal
                          eventId={eventId}
                          roundNo={selectedRound}
                          roundDate={new Date(
                            round.date ?? new Date(),
                          ).toISOString()}
                          quizDetails={
                            round.quiz && {
                              name: round.quiz.name,
                              description: round.quiz.description ?? "",
                              password: round.quiz.password,
                              startTime: new Date(round.quiz.startTime),
                              endTime: new Date(round.quiz.endTime),
                              points: round.quiz.points,
                              qualifyNext: round.quiz.qualifyNext,
                              overridePassword: round.quiz.overridePassword,
                            }
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Tab.List>
      </Tab.Group>
      <Button
        variant="outline"
        onClick={handleNotify}
        disabled={
          notifyLoading ||
          differenceInHours(
            new Date(rounds[selectedIndex]?.date ?? ""),
            new Date(),
          ) > 2
        }
        className="m-2 flex items-center justify-center"
      >
        {notifyLoading ? (
          <BiLoaderAlt className="animate-spin" />
        ) : (
          "Notify Participants"
        )}
      </Button>
      {showNotifyModal && (
        <Modal
          onClose={() => setShowNotifyModal(false)}
          title="Send Notification"
          size="small"
          showModal={showNotifyModal}
        >
          <div className="mt-3 pl-6 pr-6">
            Do you really want to send notifications to all participants?
            <div className="mb-6 mt-6 flex justify-center gap-4">
              <Button
                className="transform rounded-md bg-emerald-600 text-amber-100 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-500"
                intent={"dark"}
                size={"medium"}
                onClick={() => setShowNotifyModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="transform rounded-md bg-emerald-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-emerald-500"
                intent={"success"}
                size={"medium"}
                onClick={async () => {
                  const roundNo = rounds[selectedIndex]?.roundNo ?? 0;
                  const promise = notifyParticipants({
                    variables: {
                      eventId,
                      roundNo,
                    },
                  }).then((response) => {
                    const message = response.data?.notifyParticipants;
                    if (!message || message.__typename === "Error") {
                      throw new Error("Failed to send notifications");
                    }
                    if (message.data.includes("already sent")) {
                      throw new Error(
                        "Notifications were already sent for this round",
                      );
                    }
                    return message;
                  });

                  try {
                    await createToast(promise, "Sending notifications...");
                    setShowNotifyModal(false);
                  } catch (err) {
                    const error =
                      err instanceof Error ? err : new Error(String(err));
                    await createToast(
                      Promise.reject(error),
                      "Sending notifications...",
                      error.message,
                    );
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoundsSidebar;
