import React from "react";
import ManualHeader from "../components/ManualHeader";
import { useState } from "react";
import ManualContestInfo from "./manualComponents/ManualContestInfo";
import ConfirmationModal from "../modals/ConfirmationModal";
import ManualContestOrders from "./manualComponents/ManualContestOrders";

import ManualRankingBase from "./manualComponents/ManualRankingBase";
import ManualRankingReport from "./manualComponents/ManualRankingReport";
import ManualRankingReportType2 from "./manualComponents/ManualRankingReportType2";
import ManualRankingReportV2 from "./manualComponents/ManualRankingReportV2";
import ManualWinnerReportV2 from "./manualComponents/ManualWinnerReportV2";
import ManualTotalReport from "./manualComponents/ManualTotalReport";
import ManualEntryReport from "./manualComponents/ManualEntryReport";

const ManualRank = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { idx: 0, title: "대회정보세팅" },
    { idx: 1, title: "출전선수명단" },
    { idx: 2, title: "심판배정" },
    { idx: 3, title: "심사표입력" },
    { idx: 4, title: "출전명단출력" },
    { idx: 5, title: "심판배정출력" },
    { idx: 6, title: "집계표출력" },
    { idx: 7, title: "개별순위표출력" },
    { idx: 8, title: "통합순위표출력" },
  ];

  return (
    <div className="flex w-full h-screen justify-center px-10">
      <div className="flex w-full flex-col">
        <div className="flex w-full">
          <ManualHeader />
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <div className="flex w-full h-14 bg-green-300 justify-between items-center rounded-lg px-2">
            {tabs.map((tab, tIdx) => (
              <div className="flex w-full h-10 justify-center items-center">
                <button
                  className={`${
                    selectedTab === tIdx ? "bg-green-600 text-white" : ""
                  } w-full h-10 rounded-lg`}
                  onClick={() => setSelectedTab(tIdx)}
                >
                  {tab.title}
                </button>
              </div>
            ))}
          </div>
          <div className="flex w-full h-full bg-green-300 justify-between items-center rounded-lg px-2">
            {selectedTab === 0 && <ManualContestInfo />}
            {selectedTab === 1 && <ManualContestOrders />}
            {selectedTab === 3 && <ManualRankingBase />}
            {selectedTab === 4 && <ManualEntryReport />}
            {selectedTab === 6 && <ManualRankingReportV2 />}
            {selectedTab === 7 && <ManualWinnerReportV2 />}
            {selectedTab === 8 && <ManualTotalReport />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualRank;
