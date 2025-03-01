import { useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

import Button from "~/components/button";
import CreateCardModal from "~/components/general/dashboard/easter-egg/createCardModal";
import Dashboard from "~/components/layout/dashboard";
import SearchBox from "~/components/searchbox";
import Spinner from "~/components/spinner";
import { CONSTANT } from "~/constants";
import {
  type DayType,
  DeleteCardDocument,
  GetAllSubmissionsDocument,
  type GetAllSubmissionsQuery,
  GetCardsDocument,
} from "~/generated/generated";
import { useAuth } from "~/hooks/useAuth";
import { idToPid } from "~/utils/id";

const EasterEggDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [query, setQuery] = useState("");
  const [showSubmissions, setShowSubmissions] = useState(true);
  const [selected, setSelected] = useState("Day1");
  const [highlightedImage, setHighlightedImage] = useState<string | null>(null);

  const {
    data,
    loading: submissionsLoading,
    refetch: submissionsRefetch,
  } = useQuery(GetAllSubmissionsDocument, {
    variables: {
      day: selected as DayType,
    },
  });

  const [sortedSubmissions, setSortedSubmissions] = useState<
    Extract<
      GetAllSubmissionsQuery["getAllSubmissions"],
      {
        __typename: "QueryGetAllSubmissionsSuccess";
      }
    >["data"]
  >([]);

  useEffect(() => {
    if (
      data?.getAllSubmissions.__typename === "QueryGetAllSubmissionsSuccess"
    ) {
      const sorted = [...data.getAllSubmissions.data].sort((a, b) => {
        if (a.user.name < b.user.name) return -1;
        if (a.user.name > b.user.name) return 1;
        return 0;
      });
      setSortedSubmissions(sorted);
    }
  }, [data]);

  useEffect(() => {
    if (query === "") {
      if (
        data?.getAllSubmissions.__typename === "QueryGetAllSubmissionsSuccess"
      ) {
        const sorted = [...data.getAllSubmissions.data].sort((a, b) => {
          if (a.user.name < b.user.name) return -1;
          if (a.user.name > b.user.name) return 1;
          return 0;
        });
        setSortedSubmissions(sorted);
        return;
      }
    }
    // filter submissions by query
    const filtered = sortedSubmissions.filter((submission) => {
      const name = submission.user.name.toLowerCase();
      const pid = idToPid(submission.user.id);
      const clue = submission.card.clue.toLowerCase();
      const queryLower = query.toLowerCase();
      return (
        name.includes(queryLower) ||
        pid.includes(queryLower) ||
        clue.includes(queryLower)
      );
    });
    setSortedSubmissions(filtered);
  }, [query, data, sortedSubmissions]);

  const {
    data: cards,
    loading: cardsLoading,
    refetch: cardsRefetch,
  } = useQuery(GetCardsDocument, {
    variables: {
      day: selected as DayType,
    },
  });

  useEffect(() => {
    if (showSubmissions) void submissionsRefetch();
    else void cardsRefetch();
  }, [selected, showSubmissions, cardsRefetch, submissionsRefetch]);

  const [deleteCardMutation, { loading: deleteCardLoading }] =
    useMutation(DeleteCardDocument);

  if (loading)
    return (
      <div className="flex h-screen w-screen justify-center">
        <Spinner />
      </div>
    );

  if (!user) {
    void router.push("/login");
    return <div>Redirecting...</div>;
  }

  if (data?.getAllSubmissions.__typename === "Error") {
    void router.push("/profile");
  }

  if (!CONSTANT.PID.EASTER_PID.includes(Number(user.id))) {
    void router.push("/profile");
    return null
  }

  return (
    <Dashboard>
      <Transition appear show={Boolean(highlightedImage)} as={Fragment}>
        <Dialog
          onClick={() => setHighlightedImage(null)}
          as="div"
          className="relative z-[900]"
          onClose={() => setHighlightedImage(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className={`fixed inset-0 z-10 overflow-y-auto p-4 md:p-8`}>
            <div className="flex min-h-[full] items-center justify-center py-5 text-center md:py-7">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <img
                  src={highlightedImage ?? ""}
                  width={1000}
                  height={1000}
                  className="h-[85vh] w-[85vw] rounded-md object-contain"
                  alt="submission"
                />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Toaster />
      <div className="mx-auto mb-5 flex max-w-6xl flex-col items-center justify-center px-3">
        <div className="mx-auto mb-3 flex w-full flex-col gap-3 md:flex-row">
          <SearchBox
            className="grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CreateCardModal cardsRefetch={cardsRefetch} />
        </div>
        <div className="mb-3 flex w-full justify-between gap-4">
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day1")}
            intent={selected === "Day1" ? "primary" : "ghost"}
            fullWidth
          >
            Day 1
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day2")}
            intent={selected === "Day2" ? "primary" : "ghost"}
            fullWidth
          >
            Day 2
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day3")}
            intent={selected === "Day3" ? "primary" : "ghost"}
            fullWidth
          >
            Day 3
          </Button>
          <Button
            noScaleOnHover
            onClick={() => setSelected("Day4")}
            intent={selected === "Day4" ? "primary" : "ghost"}
            fullWidth
          >
            Day 4
          </Button>
        </div>
        <div className="flex w-full justify-between gap-4">
          <Button
            onClick={() => setShowSubmissions(true)}
            noScaleOnHover
            intent={showSubmissions ? "info" : "secondary"}
            fullWidth
          >
            Submissions
          </Button>
          <Button
            onClick={() => setShowSubmissions(false)}
            noScaleOnHover
            intent={!showSubmissions ? "info" : "secondary"}
            fullWidth
          >
            Cards
          </Button>
        </div>
        <div className="pt-5">
          {showSubmissions ? (
            submissionsLoading ? (
              <Spinner intent={"secondary"} className="mt-10" />
            ) : (
              <div className="flex flex-wrap justify-between gap-3">
                {data?.getAllSubmissions.__typename ===
                  "QueryGetAllSubmissionsSuccess" ? (
                  sortedSubmissions.length === 0 ? (
                    <span className="text-white/70">No submissions found</span>
                  ) : (
                    sortedSubmissions.map((submission, i) => (
                      <div
                        className="flex flex-col justify-between overflow-hidden rounded-sm bg-white/20 md:shrink-0 md:grow md:flex-row"
                        key={i}
                      >
                        <div className="flex max-w-sm flex-col gap-1.5 p-3">
                          <span>
                            <span className="font-semibold">Name:</span>{" "}
                            {submission.user.name}
                          </span>
                          <span>
                            <span className="font-semibold">PID:</span>{" "}
                            {idToPid(submission.user.id)}
                          </span>
                          <span>
                            <span className="font-semibold">Clue ID:</span>{" "}
                            {submission.card.id}
                          </span>
                          <span>
                            <span className="font-semibold">Clue:</span>{" "}
                            {submission.card.clue}
                          </span>
                        </div>
                        <Image
                          onClick={() => setHighlightedImage(submission.image)}
                          className="max-h-[200px] max-w-full cursor-pointer object-contain object-center md:ml-auto md:max-w-[250px] md:object-right"
                          alt="submission"
                          src={submission.image}
                          width={500}
                          height={500}
                        />
                      </div>
                    ))
                  )
                ) : (
                  <span className="mt-10 text-white/70">
                    Error: Could not fetch submissions
                  </span>
                )}
              </div>
            )
          ) : (
            <>
              {cardsLoading ? (
                <Spinner intent={"secondary"} className="mt-10" />
              ) : cards?.getCards.__typename === "QueryGetCardsSuccess" ? (
                <>
                  <div className="flex max-w-6xl flex-wrap justify-center gap-8 text-white/90">
                    {cards.getCards.data.length > 0 ? (
                      cards.getCards.data.map((card, index) => (
                        <div
                          key={index}
                          className={`${(deleteCardLoading || cardsLoading) &&
                            "pointer-events-none opacity-80"
                            } flex min-w-[300px] basis-full flex-col rounded-md bg-white/20 shadow-sm md:basis-[45%]`}
                        >
                          <div className="mb-2 flex items-center gap-2 px-4 pt-4 text-xl md:px-4 md:pt-4">
                            <h2>Clue ID: {card.id}</h2>
                            <MdDelete
                              onClick={async () =>
                                await deleteCardMutation({
                                  variables: {
                                    id: card.id,
                                  },
                                }).then(async (res) => {
                                  if (
                                    res.data?.deleteCard.__typename ===
                                    "MutationDeleteCardSuccess"
                                  )
                                    await cardsRefetch();
                                })
                              }
                              className="ml-auto cursor-pointer justify-self-end text-red-500 hover:text-red-700"
                            />
                          </div>
                          <h2 className="mb-4 px-4 md:px-4">{card.clue}</h2>
                        </div>
                      ))
                    ) : (
                      <span className="text-white/70">No cards found</span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-white/70">
                  Error: Could not fetch cards, please try again later
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default EasterEggDashboard;
