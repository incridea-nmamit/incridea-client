import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  type Counts,
  GetChampionshipLeaderboardDocument,
} from "~/generated/generated";
import { Loader2 } from "lucide-react";
import Spinner from "~/components/spinner";
import { BiDownload } from "react-icons/bi";
import toast from "react-hot-toast";

type MedalCount = {
  WINNER: number;
  RUNNER_UP: number;
  SECOND_RUNNER_UP: number;
  CATEGORY: string;
};

export default function Leaderboard() {
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const { data, loading, error } = useQuery(GetChampionshipLeaderboardDocument);
  const [popupData, setPopupData] = useState<MedalCount | null>(null);
  const [popupTitle, setPopupTitle] = useState("");

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error.message}
      </div>
    );

  const championshipData =
    data?.getChampionshipLeaderboard?.__typename ===
    "QueryGetChampionshipLeaderboardSuccess"
      ? data.getChampionshipLeaderboard.data
      : [];

  const points = championshipData.map((college) => {
    const totalGold =
      (college.goldCount?.winner ?? 0) +
      (college.goldCount?.runner_up ?? 0) +
      (college.goldCount?.second_runner_up ?? 0);
    const totalDiamond =
      (college.diamondCount?.winner ?? 0) +
      (college.diamondCount?.runner_up ?? 0) +
      (college.diamondCount?.second_runner_up ?? 0);
    const totalSilver =
      (college.silverCount?.winner ?? 0) +
      (college.silverCount?.runner_up ?? 0) +
      (college.silverCount?.second_runner_up ?? 0);
    const totalBronze =
      (college.bronzeCount?.winner ?? 0) +
      (college.bronzeCount?.runner_up ?? 0) +
      (college.bronzeCount?.second_runner_up ?? 0);

    return {
      id: college.id,
      collegeName: college.name,
      isEligible: college.isEligible,
      techCount: college.techCount,
      nonTechCount: college.nonTechCount,
      coreCount: college.coreCount,
      techLastRound: college.techLastRound,
      nonTechLastRound: college.nonTechLastRound,
      totalgoldCount: totalGold,
      totalsilverCount: totalSilver,
      totalbronzeCount: totalBronze,
      totaldiamondCount: totalDiamond,
      totalPoints: college.championshipPoints,
      diamondCount: college.diamondCount,
      goldCount: college.goldCount,
      bronzeCount: college.bronzeCount,
      silverCount: college.silverCount,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints);

  const filteredPoints = points.filter((college) => {
    if (eligibilityFilter === "eligible") return college.isEligible;
    if (eligibilityFilter === "ineligible") return !college.isEligible;
    return true;
  });

  function handleOpenPopup(title: string, data: Counts, category: string) {
    setPopupTitle(title);
    setPopupData({
      WINNER: data.winner ?? 0,
      RUNNER_UP: data.runner_up ?? 0,
      SECOND_RUNNER_UP: data.second_runner_up ?? 0,
      CATEGORY: category,
    });
  }

  function DownloadLeaderboardCSV() {
    if (!filteredPoints.length) {
      toast.error("No data available to download.", {
        position: "bottom-left",
      });
      return;
    }

    const headers = [
      "Sl No",
      "College Name",
      "Tech",
      "Non-Tech",
      "Core",
      "Tech Last Round",
      "Non-Tech Last Round",
      "Diamond",
      "Gold",
      "Silver",
      "Bronze",
      "Total Points",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredPoints.map((college, idx) =>
        [
          idx + 1,
          `"${college.collegeName}"`,
          college.techCount,
          college.nonTechCount,
          college.coreCount,
          college.techLastRound,
          college.nonTechLastRound,
          college.totaldiamondCount,
          college.totalgoldCount,
          college.totalsilverCount,
          college.totalbronzeCount,
          college.totalPoints,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Leaderboard_${eligibilityFilter}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-lg shadow-lg overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
          {loading && <Loader2 className="animate-spin text-white w-6 h-6" />}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={DownloadLeaderboardCSV}
            className="flex items-center gap-x-2 rounded-md border border-white px-4 py-2 h-10 text-sm text-white bg-transparent hover:bg-white/10 transition"
          >
            <BiDownload />
            Leaderboard
          </button>
          <select
            value={eligibilityFilter}
            onChange={(e) => setEligibilityFilter(e.target.value)}
            className="rounded-md border border-white px-4 py-2 h-10 text-sm text-white bg-primary-800 backdrop-blur-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="all">All Colleges</option>
            <option value="eligible">Eligible</option>
            <option value="ineligible">Ineligible</option>
          </select>
        </div>
      </div>
      <div className="p-6 overflow-x-auto overflow-y-auto max-h-80">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                Sl No
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                College Name
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Tech
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Non-Tech
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Core
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Tech Last Round
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Non-Tech Last Round
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Diamond
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Gold
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Silver
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Bronze
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                Total Points
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.map((college, idx) => (
              <tr
                key={college.id}
                className="border-b border-white/20 hover:bg-white/5"
              >
                <td className="px-4 py-3 text-center text-white">{idx + 1}</td>
                <td className="px-4 py-3 text-white">{college.collegeName}</td>
                <td className="px-4 py-3 text-center text-white">
                  {college.techCount}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {college.nonTechCount}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {college.coreCount}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {college.techLastRound}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {college.nonTechLastRound}
                </td>
                <td
                  className="px-4 py-3 text-center text-white cursor-pointer hover:bg-white/10"
                  onClick={() =>
                    handleOpenPopup(
                      `${college.collegeName}`,
                      college.diamondCount,
                      "Diamond Split Up",
                    )
                  }
                >
                  {college.totaldiamondCount}
                </td>
                <td
                  className="px-4 py-3 text-center text-white cursor-pointer hover:bg-white/10"
                  onClick={() =>
                    handleOpenPopup(
                      `${college.collegeName}`,
                      college.goldCount,
                      "Gold Split Up",
                    )
                  }
                >
                  {college.totalgoldCount}
                </td>
                <td
                  className="px-4 py-3 text-center text-white cursor-pointer hover:bg-white/10"
                  onClick={() =>
                    handleOpenPopup(
                      `${college.collegeName}`,
                      college.silverCount,
                      "Silver Split Up",
                    )
                  }
                >
                  {college.totalsilverCount}
                </td>
                <td
                  className="px-4 py-3 text-center text-white cursor-pointer hover:bg-white/10"
                  onClick={() =>
                    handleOpenPopup(
                      `${college.collegeName}`,
                      college.bronzeCount,
                      "Bronze Split Up",
                    )
                  }
                >
                  {college.totalbronzeCount}
                </td>
                <td className="px-4 py-3 text-center font-semibold text-white">
                  {college.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popupData && (
        <div className="fixed inset-0 bg-white/10 flex items-center justify-center z-50">
          <div className="bg-primary-800 rounded-lg p-6 max-w-sm w-full border border-white/20">
            <h3 className="text-xl font-bold mb-4 text-white">{popupTitle}</h3>
            <h6 className="text-lg font-bold mb-4 text-white">
              {popupData.CATEGORY}
            </h6>
            <div className="space-y-3">
              <p className="text-white flex justify-between">
                <span className="font-medium">WINNER</span>
                <span>{popupData.WINNER}</span>
              </p>
              <p className="text-white flex justify-between">
                <span className="font-medium">RUNNER UP</span>
                <span>{popupData.RUNNER_UP}</span>
              </p>
              <p className="text-white flex justify-between">
                <span className="font-medium">SECOND RUNNER UP</span>
                <span>{popupData.SECOND_RUNNER_UP}</span>
              </p>
            </div>
            <button
              onClick={() => setPopupData(null)}
              className="mt-6 w-full px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
