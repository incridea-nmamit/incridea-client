import { useQuery } from "@apollo/client";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import Button from "~/components/button";

import Dashboard from "~/components/layout/dashboard";
import Spinner from "~/components/spinner";
import { CONSTANT } from "~/constants";
import {
  EventCategory,
  PublishedEventsDocument,
  type PublishedEventsQuery,
  Role,
} from "~/generated/generated";
import { GetAllWinnersDocument } from "~/generated/generated";
import { useAuth } from "~/hooks/useAuth";

enum AllCategory {
  ALL = "ALL",
}

const Jury = () => {
  const { user, loading } = useAuth();

  const { data: allWinners } = useQuery(GetAllWinnersDocument);

  const router = useRouter();
  const { data: Events, loading: EventLoading } = useQuery(
    PublishedEventsDocument,
  );

  const branchFilters = [
    "ALL",
    "CORE",
    "CSE",
    "ISE",
    "AIML",
    "CCE",
    "ECE",
    "EEE",
    "MECH",
    "CIVIL",
    "BTE",
  ] as const;

  const dayFilters = ["ALL", "DAY 1", "DAY 2", "DAY 3"] as const;

  const [currentBranchFilter, setCurrentBranchFilter] =
    useState<(typeof branchFilters)[number]>("ALL");
  const [currentDayFilter, setCurrentDayFilter] =
    useState<(typeof dayFilters)[number]>("ALL");
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState<
    EventCategory | AllCategory
  >(AllCategory.ALL);
  const [query, setQuery] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(Events?.publishedEvents);

  useEffect(() => {
    let tempFilteredEvents = Events?.publishedEvents;
    if (currentBranchFilter !== branchFilters[0])
      tempFilteredEvents = tempFilteredEvents?.filter(
        (event) => event.branch.name === currentBranchFilter,
      );
    if (currentDayFilter !== dayFilters[0]) {
      const filteredDay = new Date(
        currentDayFilter === "DAY 1"
          ? CONSTANT.DATE.INCRIDEA.DAY1
          : currentDayFilter === "DAY 2"
            ? CONSTANT.DATE.INCRIDEA.DAY2
            : CONSTANT.DATE.INCRIDEA.DAY3,
      ).getDate();
      tempFilteredEvents = tempFilteredEvents?.filter((event) =>
        event.rounds.some((round) => round.date && new Date(round.date).getDate() === filteredDay),
      );
    }
    if (currentCategoryFilter !== AllCategory.ALL) {
      tempFilteredEvents = tempFilteredEvents?.filter(
        (event) => event.category === currentCategoryFilter,
      );
    }
    setFilteredEvents(tempFilteredEvents);
  }, [currentBranchFilter, currentDayFilter, currentCategoryFilter, Events, branchFilters, dayFilters]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentBranchFilter("ALL");
    setCurrentDayFilter("ALL");
    setCurrentCategoryFilter(AllCategory.ALL);
    if (e.target.value === "") {
      setFilteredEvents(Events?.publishedEvents ?? []);
    } else {
      setFilteredEvents(
        Events?.publishedEvents.filter((event) =>
          event.name.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    }
  };

  function DownloadWinnersCSV() {
    let csv = "Event Name,Participant Name, Position, Phone no,";

    if (allWinners?.allWinners.__typename === "QueryAllWinnersSuccess")
      allWinners?.allWinners.data.map((winner) => {
        if (currentBranchFilter === "CORE") {
          if (
            currentDayFilter === "DAY 1" ||
            currentDayFilter === "DAY 2" ||
            currentDayFilter === "DAY 3"
          ) {
            if (
              winner.event.rounds[
                winner.event.rounds.length - 1
              ]!.date && new Date(winner.event.rounds[
                winner.event.rounds.length - 1
              ]!.date!).getDate() ===
              new Date(
                currentDayFilter === "DAY 1"
                  ? CONSTANT.DATE.INCRIDEA.DAY1
                  : currentDayFilter === "DAY 2"
                    ? CONSTANT.DATE.INCRIDEA.DAY2
                    : CONSTANT.DATE.INCRIDEA.DAY3,
              ).getDate()
            ) {
              if (winner.event.branch.name === "CORE") {
                winner.team.members.map((member) => {
                  csv +=
                    "\n" +
                    winner.event.name +
                    "," +
                    member.user.name +
                    "," +
                    winner.type +
                    "," +
                    member.user.phoneNumber;
                });
              }
            }
          } else {
            if (winner.event.branch.name === "CORE") {
              winner.team.members.map((member) => {
                csv +=
                  "\n" +
                  winner.event.name +
                  "," +
                  member.user.name +
                  "," +
                  winner.type +
                  "," +
                  member.user.phoneNumber;
              });
            }
          }
        } else {
          if (
            currentDayFilter === "DAY 1" ||
            currentDayFilter === "DAY 2" ||
            currentDayFilter === "DAY 3"
          ) {
            if (
              winner.event.rounds[
                winner.event.rounds.length - 1
              ]!.date && (winner.event.rounds[
                winner.event.rounds.length - 1
              ]!.date!).getDate() ===
              new Date(
                currentDayFilter === "DAY 1"
                  ? CONSTANT.DATE.INCRIDEA.DAY1
                  : currentDayFilter === "DAY 2"
                    ? CONSTANT.DATE.INCRIDEA.DAY2
                    : CONSTANT.DATE.INCRIDEA.DAY3,
              ).getDate()
            ) {
              if (winner.event.branch.name !== "CORE") {
                winner.team.members.map((member) => {
                  csv +=
                    "\n" +
                    winner.event.name +
                    "," +
                    member.user.name +
                    "," +
                    winner.type +
                    "," +
                    member.user.phoneNumber;
                });
              }
            }
          } else {
            if (winner.event.branch.name !== "CORE") {
              winner.team.members.map((member) => {
                csv +=
                  "\n" +
                  winner.event.name +
                  "," +
                  member.user.name +
                  "," +
                  winner.type +
                  "," +
                  member.user.phoneNumber;
              });
            }
          }
        }
      });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${currentDayFilter} ${currentBranchFilter === "ALL" ? "Branch" : "Core"
      } Winners.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // --------------------------------------------------

  if (loading || EventLoading)
    return (
      <div className="flex h-screen w-screen justify-center">
        <Spinner />
      </div>
    );

  if (!user) {
    void router.push("/login");
    return <div>Redirecting...</div>;
  }

  if (user.role !== Role.Jury && user.role !== Role.Admin) {
    void router.push("/profile");
    return <div>Redirecting...</div>;
  }

  return (
    <Dashboard>
      <Toaster />
      <div className="relative top-14 mb-3 flex items-center justify-between md:top-0">
        <h1 className="-translate-y-12 px-5 text-3xl lg:translate-y-0">
          Hello <span className="font-semibold">{user?.name}</span>!
        </h1>
      </div>
      {/* --------------------- */}
      <div className="mb-7 mt-8 flex flex-wrap items-center gap-2 px-4 lg:mx-auto lg:flex-col lg:justify-between">
        <div className="flex w-full flex-col items-center gap-2 lg:w-[800px] lg:flex-nowrap">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="relative w-full basis-full lg:w-auto lg:basis-[75%]">
              <input
                value={query}
                onChange={handleSearch}
                className="w-full rounded-sm bg-black/30 p-2 pl-3 pr-14 text-white placeholder:text-gray-200/70 focus:outline-none"
                placeholder="Search away!"
                type="text"
              />
              <AiOutlineSearch
                size={"1.4rem"}
                className="absolute right-3 top-2.5 text-gray-300/70"
              />
            </div>
            <div className="hidden basis-[12.5%] justify-center py-2 lg:flex">
              <Menu as={"div"} className={"relative inline-block w-full"}>
                <Menu.Button
                  className={
                    "inline-flex h-[40px] w-full justify-center rounded-sm bg-black/30 px-4 py-2 text-sm font-medium leading-6 text-white"
                  }
                >
                  {currentBranchFilter !== "ALL"
                    ? currentBranchFilter
                    : "Branch"}
                </Menu.Button>
                <Menu.Items className="absolute z-10 mt-1 overflow-hidden rounded-sm bg-[#286D8C] pb-1.5 text-center shadow-2xl shadow-black/80">
                  {branchFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {() => (
                        <button
                          className={`${currentBranchFilter === filter
                            ? "bg-black/50"
                            : "bg-black/20"
                            } m-1.5 mb-0 w-32 rounded-sm px-3 py-2 text-sm text-white`}
                          onClick={() => setCurrentBranchFilter(filter)}
                        >
                          {filter}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <div className="hidden basis-[12.5%] justify-center py-2 lg:flex">
              <Menu as={"div"} className={"relative inline-block w-full"}>
                <Menu.Button
                  className={
                    "inline-flex h-[40px] w-full shrink-0 justify-center whitespace-nowrap rounded-sm bg-black/30 px-4 py-2 text-sm font-medium leading-6 text-white"
                  }
                >
                  {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-[1] mt-1 overflow-hidden rounded-sm bg-[#286D8C] pb-1.5 text-center shadow-2xl shadow-black/80">
                  {dayFilters.map((filter) => (
                    <Menu.Item key={filter}>
                      {() => (
                        <button
                          className={`${currentDayFilter === filter
                            ? "bg-black/50"
                            : "bg-black/20"
                            } m-1.5 mb-0 w-36 rounded-sm px-3 py-2 text-sm text-white`}
                          onClick={() => setCurrentDayFilter(filter)}
                        >
                          {filter}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <button
              onClick={DownloadWinnersCSV}
              className="flex items-center gap-x-2 rounded-xl border border-white px-4 py-2"
            >
              <BiDownload />
              Winners
            </button>
            <Link href="/dashboard/analytics">
              <Button intent={"info"}>
                Leaderboard
              </Button>
            </Link>
          </div>
          <div className="mx-auto hidden gap-3 font-semibold lg:flex lg:w-[800px]">
            {[Object.keys(EventCategory), Object.keys(AllCategory)].map((e) =>
              e.map((filter) => (
                <span
                  key={filter}
                  className={`${(filter as EventCategory | AllCategory) ===
                    currentCategoryFilter
                    ? "border-b-4 bg-black/10"
                    : "hover:bg-black/10"
                    } grow cursor-pointer rounded-sm border-black/30 px-3 py-1 text-center text-white`}
                  onClick={() =>
                    setCurrentCategoryFilter(
                      filter as EventCategory | AllCategory,
                    )
                  }
                >
                  {filter.replace("_", " ")}
                </span>
              )),
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex basis-full justify-between gap-3">
          <div className="flex basis-1/3 justify-between py-2 lg:hidden">
            <Menu as={"div"} className={"relative inline-block grow"}>
              <Menu.Button
                className={
                  "inline-flex h-[40px] w-full justify-center rounded-sm bg-black/30 px-4 py-2 text-sm font-medium leading-6 text-white"
                }
              >
                {currentBranchFilter !== "ALL" ? currentBranchFilter : "Branch"}
              </Menu.Button>
              <Menu.Items className="absolute z-50 mt-1 overflow-hidden rounded-sm bg-[#2e768a] pb-1.5 text-center shadow-2xl shadow-black/80">
                {branchFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {() => (
                      <button
                        className={`${currentBranchFilter === filter
                          ? "bg-black/50"
                          : "bg-black/20"
                          } m-1.5 mb-0 w-36 rounded-sm px-3 py-2 text-sm text-white`}
                        onClick={() => setCurrentBranchFilter(filter)}
                      >
                        {filter}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
          <div className="flex shrink grow-0 basis-1/3 justify-center py-2 lg:hidden">
            <Menu as={"div"} className={"relative inline-block grow"}>
              <Menu.Button
                className={
                  "inline-flex h-[40px] w-full justify-center overflow-hidden whitespace-nowrap rounded-sm bg-black/30 px-4 py-2 text-sm font-medium leading-6 text-white"
                }
              >
                {currentCategoryFilter !== AllCategory.ALL
                  ? currentCategoryFilter.replace("_", " ")
                  : "Category"}
              </Menu.Button>
              <Menu.Items className="absolute right-1/2 z-50 mt-1 translate-x-1/2 overflow-hidden rounded-sm bg-[#2e768a] pb-1.5 text-center shadow-2xl shadow-black/80">
                {[Object.keys(EventCategory), Object.keys(AllCategory)].map(
                  (e) =>
                    e.map((filter) => (
                      <Menu.Item key={filter}>
                        {() => (
                          <button
                            className={`${currentCategoryFilter ===
                              (filter as EventCategory | AllCategory)
                              ? "bg-black/50"
                              : "bg-black/20"
                              } m-1.5 mb-0 w-36 rounded-sm px-3 py-2 text-sm text-white`}
                            onClick={() =>
                              setCurrentCategoryFilter(
                                filter as EventCategory | AllCategory,
                              )
                            }
                          >
                            {filter.replace("_", " ")}
                          </button>
                        )}
                      </Menu.Item>
                    )),
                )}
              </Menu.Items>
            </Menu>
          </div>
          <div className="flex basis-1/3 justify-center py-2 lg:hidden">
            <Menu as={"div"} className={"relative inline-block grow"}>
              <Menu.Button
                className={
                  "inline-flex h-[40px] w-full justify-center whitespace-nowrap rounded-sm bg-black/30 px-4 py-2 text-sm font-medium leading-6 text-white"
                }
              >
                {currentDayFilter !== "ALL" ? currentDayFilter : "Day"}
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-50 mt-1 overflow-hidden rounded-sm bg-[#2e768a] pb-1.5 text-center shadow-2xl shadow-black/80">
                {dayFilters.map((filter) => (
                  <Menu.Item key={filter}>
                    {() => (
                      <button
                        className={`${currentDayFilter === filter
                          ? "bg-black/50"
                          : "bg-black/20"
                          } m-1.5 mb-0 w-36 rounded-sm px-3 py-2 text-sm text-white`}
                        onClick={() => setCurrentDayFilter(filter)}
                      >
                        {filter.replace("_", " ")}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      {/* -------------------- */}

      {filteredEvents?.length === 0 ? (
        <div className="flex min-h-[20rem] w-full items-center justify-center text-center text-xl italic text-gray-200/70">
          <span>No events found</span>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents?.map((Event) => (
            <EventCard key={Event.id} event={Event} />
          ))}
        </div>
      )}
    </Dashboard>
  );
};

export default Jury;

const EventCard = ({
  event,
}: {
  event: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const getCompletedRounds = () => {
    let completedRounds = 0;
    event.rounds.forEach((round) => {
      if (round.completed === true) completedRounds++;
    });
    return completedRounds;
  };
  const totalRounds = event.rounds.length;
  const getRoundStatus = () => {
    if (getCompletedRounds() === totalRounds) return "COMPLETED";
    const tempDate = event.rounds.find((r) => r.roundNo === 1)?.date
    if (
      (tempDate ? new Date(tempDate).getTime() : 0) >
      new Date().getTime()
    )
      return "YET_TO_START";
    return "ONGOING";
  };
  return (
    <Link
      href={`/dashboard/jury/event/${event.name
        .toLowerCase()
        .replaceAll(" ", "-")}-${event.id}`}
      key={event.id + event.name}
      className="flex w-full max-w-xl cursor-pointer flex-col rounded-md bg-black/20 p-8 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
    >
      <div>
        <div className="mb-2 flex justify-between px-2">
          <div className="flex flex-col">
            <h1>{event.name}</h1>
            <span className="flex items-center text-sm">
              <IoPeopleOutline className="mr-2 text-base" />
              {event.maxTeamSize !== 1
                ? `${event.minTeamSize} - ${event.maxTeamSize} members`
                : `${event.minTeamSize} member`}
            </span>
          </div>
          <h2>Venue:{" " + event.venue}</h2>
        </div>
        <div className="flex justify-between py-2">
          <div className="rounded-md bg-white/20 p-2">
            <div className="flex items-center justify-center">
              <span className="text-md pr-2">Rounds</span>
              <span className="text-xl font-semibold">
                {getCompletedRounds()}
              </span>
              <span className="text-xl">/</span>
              <span className="text-xl font-semibold">{totalRounds}</span>
            </div>
          </div>
          <StatusBadge status={getRoundStatus()} />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {event.rounds.map((round, idx) => {
            return (
              <div
                key={idx}
                className="grid grid-rows-2 rounded-sm bg-white/20 p-2 text-sm"
              >
                <span>Round :{" " + round.roundNo}</span>
                <span>
                  Date: {" " + round.date?.toString().substring(0, 14)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  if (status === "COMPLETED")
    return (
      <div className="h-fit rounded-full border-2 border-green-400 px-2 py-1 text-xs text-green-400">
        Completed
      </div>
    );
  if (status === "ONGOING")
    return (
      <div className="h-fit rounded-full border-2 border-yellow-400 px-2 py-1 text-xs text-yellow-400">
        OnGoing
      </div>
    );
  if (status === "YET_TO_START")
    return (
      <div className="h-fit rounded-full border-2 border-red-500 px-2 py-1 text-xs text-red-500">
        yet to start
      </div>
    );
  return null;
};
