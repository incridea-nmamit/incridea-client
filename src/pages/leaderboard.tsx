"use client";

import { useQuery } from "@apollo/client";
import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "~/components/event/styles.module.css";
import FallingItem from "~/components/leaderboard/fallingItem";
import Spinner from "~/components/spinner";
import { CONSTANT } from "~/constants";
import { GetXpLeaderboardDocument } from "~/generated/generated";
import { idToPid } from "~/utils/id";

const techTeamPid = CONSTANT.PID.TECH_TEAM;

const rankColors = {
  1: {
    background:
      "linear-gradient(180deg, #F9F39F 10%, #D1A300 100%, #D1A300 100%)",
    text: "#000000",
    border: "#D1A300",
  },
  2: {
    background: "linear-gradient(180deg, #FFFFFD 0%, #666666 100%)",
    text: "#000000",
    border: "#666666",
  },
  3: {
    background: "linear-gradient(180deg, #E5B77C, #5F3316)",
    text: "#000000",
    border: " #5F3316",
  },
  4: {
    background: "linear-gradient(90deg, #4B0082 0%, #7393B3 100%)",
    text: "#FFFFFF",
    border: "#4B0082",
  },
  5: {
    background: "linear-gradient(90deg,#007c4c 0%, #007c4c 100%)",
    text: "#FFFFFF",
    border: "#6acaa5",
  },
};

const getRankStyle = (rank: number) => {
  if (rank <= 3) {
    return rankColors[rank as keyof typeof rankColors];
  }
  return rankColors[5];
};

const LeaderBoard: NextPage = () => {
  type UserTotalPoints = {
    [userId: string]: {
      levelPoints: number;
      name: string;
      count: number;
      createdAt: Date;
    };
  };

  const { data: Leaderboard, loading: leaderboardLoading } = useQuery(
    GetXpLeaderboardDocument,
    {},
  );

  const [sortedLeaderboard, setSortedLeaderboard] = useState<
    {
      levelPoints: number;
      name: string;
      userId: string;
      count: number;
      createdAt: Date;
    }[]
  >([]);

  useEffect(() => {
    if (
      Leaderboard?.getXpLeaderboard.__typename ===
      "QueryGetXpLeaderboardSuccess"
    ) {
      const userTotalPoints: UserTotalPoints = {};

      Leaderboard?.getXpLeaderboard.data.forEach((item) => {
        const userId = item.user.id;
        const levelPoints = item.level.point;
        const userName = item.user.name;
        const levelCount = 1;
        const createdAt = item.createdAt;

        // Check if the user ID is already in the userTotalPoints object
        if (userTotalPoints[userId]) {
          // If yes, add the level points to the existing total
          userTotalPoints[userId].levelPoints += levelPoints;
          userTotalPoints[userId].count += levelCount;
          //store only the latest date
          if (createdAt > userTotalPoints[userId].createdAt) {
            userTotalPoints[userId].createdAt = createdAt;
          }
        } else {
          if (
            techTeamPid.includes(parseInt(userId)) &&
            parseInt(item.level.id) <= 6
          )
            return;
          // If no, create a new entry for the user ID
          userTotalPoints[userId] = {
            levelPoints,
            name: userName,
            count: 1,
            createdAt: createdAt,
          };
        }
      });
      // Convert userTotalPoints to an array of objects
      const userTotalPointsArray = Object.entries(userTotalPoints).map(
        ([userId, data]) => ({
          userId,
          ...data,
        }),
      );

      // Sort the array in descending order based on total points
      userTotalPointsArray.sort((a, b) => b.levelPoints - a.levelPoints);

      //also sort based on the latest date but points should be primary
      userTotalPointsArray.sort((a, b) => {
        if (a.levelPoints === b.levelPoints) {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        return b.levelPoints - a.levelPoints;
      });
      // Limit to the top 15 entries
      const top15Users = userTotalPointsArray.slice(0, 15);
      setSortedLeaderboard(top15Users);
    }
  }, [Leaderboard]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className={`bg-transparent`}
      style={{
        isolation: "isolate",
        overflowX: "hidden",
      }}
    >
      <div className="absolute -top-[10vh] left-2/4 -z-40 h-0 w-[65vw] -translate-x-2/4 md:w-[1000px]">
        <FallingItem delay={0} />
        <FallingItem delay={2000} />
        <FallingItem delay={4000} />
        <FallingItem delay={6000} />
        <FallingItem delay={8000} />
      </div>

      {sortedLeaderboard.length > 0 && (
        <div className={`${styles.container} overflow-hidden`}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={`${styles.confetti}`}></div>
          ))}
        </div>
      )}
      <div className="relative min-h-screen bg-gradient-to-b">
        <div className="relative min-h-screen py-32">
          <div className="flex flex-col items-center justify-center md:py-6">
            <h1 className="font-life-craft text-5xl text-center md:text-7xl tracking-wider text-white">
              Time Stone Leaderboard
            </h1>

            <h3 className="mx-2 pt-4 text-center text-base text-white md:mx-0 md:text-xl">
            Discover Hidden Time Stones & Participate in Events for Exciting Prizes!
            </h3>
          </div>

          {/* <h1
            className={`text-center font-VikingHell text-5xl text-white md:text-5xl ribbon`}
          >
            XP Leaderboard
          </h1> */}

          <div className="mx-5 mb-2 mt-10 flex h-16 items-center justify-evenly rounded-lg rounded-t-lg border border-primary-200/80 bg-primary-500 bg-opacity-20 bg-clip-padding p-1 text-xs font-bold text-white backdrop-blur-lg backdrop-filter md:mx-36 md:mt-7 md:text-xl lg:text-2xl">
            <h1 className="basis-1/4 text-center">Position</h1>
            <h1 className="basis-1/4 text-center">Timekeeper Id</h1>
            <h1 className="basis-1/4 text-center">Name</h1>
            <h1 className="basis-1/4 text-center">Time Stones Gained</h1>
          </div>
          {leaderboardLoading && (
            <div className="mt-10 flex items-center justify-center">
              <Spinner className="text-gray-300" />
            </div>
          )}
          <div className="mx-5 flex flex-col gap-2 text-center text-white md:mx-36">
            {sortedLeaderboard.map((user, i) => (
              <div
                key={user.userId}
                style={{
                  background: getRankStyle(i + 1).background,
                  color: getRankStyle(i + 1).text,
                  borderColor: getRankStyle(i + 1).border,
                }}
                className="relative flex h-16 flex-row items-center justify-center rounded-lg border-2 p-4 shadow-2xl"
              >
                <h1 className="flex basis-1/4 items-center justify-center text-center text-base md:gap-1 md:text-xl">
                  {i + 1}.
                  <Image
                    src={
                      i === 0
                        ? CONSTANT.ASSETS.LEADERBOARD.LEVEL3
                        : i === 1
                          ? CONSTANT.ASSETS.LEADERBOARD.LEVEL2
                          : i === 2
                            ? CONSTANT.ASSETS.LEADERBOARD.LEVEL1
                            : CONSTANT.ASSETS.LEADERBOARD.LEVEL4
                    }
                    width={isMobile ? 20 : 50}
                    height={isMobile ? 20 : 50}
                    alt="medal"
                    className="z-30 flex w-10 items-center justify-center bg-transparent text-5xl drop-shadow-md md:w-auto"
                  />
                </h1>
                <h1 className="mx-2 flex basis-1/4 items-center justify-center text-center text-xs sm:text-sm font-semibold md:text-xl">
                  {idToPid(user.userId)}
                </h1>
                <h1 className="flex basis-1/4 items-center justify-center text-center text-xs sm:text-sm font-semibold capitalize md:text-xl">
                  {user.name.length > 23 ? user.name.slice(0, 23) + "..." : user.name}
                </h1>
                <h1 className="flex basis-1/4 flex-row items-center justify-center text-center text-sm font-semibold md:text-xl">
                  {user.levelPoints}
                  <Image
                    src={CONSTANT.ASSETS.EXPLORE.STONE}
                    width={isMobile ? 40 : 100}
                    height={isMobile ? 40 : 100}
                    alt="Time Stone"
                    className="absolute right-[2%] w-5 bg-transparent drop-shadow-md transition-all md:right-[2%] md:w-2 lg:right-[8%] lg:w-8"
                  />
                </h1>
              </div>
            ))}
            {sortedLeaderboard.length === 0 && !leaderboardLoading && (
              <div className="mx-3 mt-2 flex items-center justify-center">
                <span className="text-base text-gray-300 md:text-xl">
                  The XP leaderboard is currently as empty as a blank canvas,
                  waiting for the vibrant colors of your achievements to fill it
                  up!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
