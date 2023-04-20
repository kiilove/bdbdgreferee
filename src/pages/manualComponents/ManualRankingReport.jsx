import React, { useState, useEffect, useRef } from "react";
import { where } from "firebase/firestore";

import ReactToPrint from "react-to-print";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useFirestoreQuery } from "../../customHooks/useFirestores";
import { Modal } from "@mui/material";
import ManualRankingReportPrint from "./ManualRankingReportPrint";

const ManualRankingReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [rankingTableKey, setRankingTableKey] = useState(null);
  const [getRankBoard, setGetRankBoard] = useState([]);
  const getDatas = useFirestoreQuery();
  const printRef = useRef(null);

  const { manualRank } = useContext(ManualRankContext);

  const handleCancelClick = () => {
    setIsOpen(false);
  };
  const handleGroupChange = (key) => {
    setSelectedGroup(key);
    setRankingTableKey(key);
  };

  const gamesGroup = (data) => {
    const groupData = data.reduce((acc, item) => {
      const key = `${item.refGameTitle}/${item.refClassTitle}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);
      return acc;
    }, {});
    setGroupedData(groupData);
    console.log(groupedData);
  };

  const fetchRankingboards = async () => {
    const conditions = [where("refCupId", "==", manualRank.id)];
    const fetchedDatas = await getDatas.getDocuments(
      "manual_rankingboard",
      conditions
    );
    console.log(fetchedDatas);
    setGetRankBoard([...fetchedDatas]);
  };
  useEffect(() => {
    fetchRankingboards();
    console.log(manualRank);
  }, []);

  useEffect(() => {
    if (getRankBoard.length !== 0) {
      console.log(getRankBoard);
      gamesGroup(getRankBoard);
      setIsLoading(false);
    }
  }, [getRankBoard]);

  const RankingTable = React.forwardRef(({ data }, ref) => {
    const playerNumbers = [...new Set(data.map((item) => item.playerNumber))];
    const refSeatIndexes = [
      ...new Set(data.map((item) => item.refSeatIndex)),
    ].sort();

    const rankData = playerNumbers.map((playerNumber) =>
      refSeatIndexes.map((refSeatIndex) => {
        const match = data.find(
          (item) =>
            item.playerNumber === playerNumber &&
            item.refSeatIndex === refSeatIndex
        );
        return match ? match.playerRank : null;
      })
    );

    const rowBgColors = playerNumbers.map((playerNumber) => {
      const ranks = refSeatIndexes
        .map((refSeatIndex) => {
          const match = data.find(
            (item) =>
              item.playerNumber === playerNumber &&
              item.refSeatIndex === refSeatIndex
          );
          return match ? match.playerRank : null;
        })
        .filter((rank) => rank !== null);

      const minRank = Math.min(...ranks);
      const maxRank = Math.max(...ranks);

      const bgColors = ranks.map((rank, index) => {
        if (rank === maxRank && !ranks.slice(0, index).includes(maxRank)) {
          return "bg-red-300";
        } else if (
          rank === minRank &&
          !ranks.slice(0, index).includes(minRank)
        ) {
          return "bg-blue-200";
        } else {
          return "";
        }
      });

      return bgColors;
    });

    const totals = playerNumbers.map((playerNumber) => {
      const ranks = refSeatIndexes
        .map((refSeatIndex) => {
          const match = data.find(
            (item) =>
              item.playerNumber === playerNumber &&
              item.refSeatIndex === refSeatIndex
          );
          return match ? match.playerRank : null;
        })
        .filter((rank) => rank !== null);

      const minRank = Math.min(...ranks);
      const maxRank = Math.max(...ranks);

      const sum = ranks.reduce((acc, rank) => acc + rank, 0);
      const total = sum - minRank - maxRank;

      return total;
    });

    const sortedRankIndex = totals
      .map((total, index) => [index, total])
      .sort((a, b) => a[1] - b[1])
      .map((item) => item[0]);

    const rankDisplayDelay = (sortedRankIndex.length - data.length + 5) * 1000; // rank display delay for animation
    const rowDisplayDelay = rankDisplayDelay + 1000; // row display delay for animation
    return (
      <div className="flex p-3 border border-gray-500 w-full">
        <table>
          <thead>
            <tr className="border-b">
              <th className="w-20 text-base ">선수번호</th>
              <th className="w-20 h-10 text-base font-bold">순위</th>
              {refSeatIndexes.map((refSeatIndex) => (
                <th className="w-20" key={refSeatIndex}>
                  {refSeatIndex}
                </th>
              ))}
              <th className="text-sm">기표합산</th>
            </tr>
          </thead>
          <tbody>
            {sortedRankIndex.map((rowIndex, rank, index) => (
              <tr key={rowIndex} className="table-row-wrapper">
                <td className="w-20 h-10 text-center font-semibold">
                  {playerNumbers[rowIndex]}
                </td>
                <td className="w-20 h-10 text-center text-lg font-semibold">
                  {rank + 1}
                </td>
                {refSeatIndexes.map((refSeatIndex, j) => {
                  const index = data.findIndex(
                    (item) =>
                      item.playerNumber === playerNumbers[rowIndex] &&
                      item.refSeatIndex === refSeatIndex
                  );
                  return (
                    <td
                      key={`${rowIndex}-${j}`}
                      className={`${rowBgColors[rowIndex][j]} w-20 h-10 text-center`}
                    >
                      {index >= 0 ? data[index].playerRank : ""}
                    </td>
                  );
                })}
                <td className="w-20 h-10 text-center">{totals[rowIndex]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col justify-start h-full items-center px-5 py-2">
      <div className="flex w-full gap-x-5 flex-col">
        {!isLoading && (
          <Modal open={isOpen} onClose={handleCancelClick}>
            <ManualRankingReportPrint
              key={selectedGroup || ""}
              data={groupedData[selectedGroup] || []}
              handleCancelClick={handleCancelClick}
            />
          </Modal>
        )}

        <div className="flex gap-x-5 flex-wrap w-full">
          {!isLoading && (
            <div className="flex justify-center items-center gap-x-2 mb-5">
              {Object.keys(groupedData || {}).map((key) => (
                <button
                  key={key}
                  onClick={() => handleGroupChange(key)}
                  disabled={selectedGroup === key}
                  className={
                    selectedGroup === key
                      ? "bg-green-500 flex p-2  rounded-md"
                      : "bg-green-200 flex p-2  rounded-md"
                  }
                >
                  {key}
                </button>
              ))}
              {selectedGroup && (
                <ul>
                  {groupedData[selectedGroup].map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="flex">
          <button
            className="w-40 h-14 bg-green-500 rounded-lg mb-5"
            onClick={() => {
              console.log(selectedGroup);
              setIsOpen(true);
            }}
          >
            집계표출력 미리보기
          </button>
        </div>
        <div
          className="flex w-full justify-center items-center bg-white p-5"
          ref={printRef}
        >
          <div className="flex w-full h-full border-2 border-gray-600">
            {selectedGroup && (
              <div className="flex flex-col box-border overflow-y-auto p-3 rounded-md w-full h-full gap-y-3">
                <div className="flex gap-x-5 w-full">
                  <div className="flex w-full justify-center items-center">
                    <h1
                      className="flex justify-center items-center h-14 text-3xl font-extrabold font-sans"
                      style={{ letterSpacing: "20px" }}
                    >
                      집계표
                    </h1>
                  </div>
                </div>
                <div className="flex gap-x-5 w-full">
                  <div className="flex w-1/2">
                    <h1>대회명 : {manualRank.contestInfo.contestTitle}</h1>
                  </div>
                  <div className="flex w-1/2">
                    대회일자 : {manualRank.contestInfo.contestDate}
                  </div>
                </div>
                <div className="flex gap-x-5 w-full">
                  <div className="flex w-1/2">
                    <h1>주관 : {manualRank.contestInfo.contestAssociate}</h1>
                  </div>
                  <div className="flex w-1/2">
                    주최 : {manualRank.contestInfo.contestPromoter}
                  </div>
                </div>
                <div className="flex w-full">
                  <h1>종목/체급 : {selectedGroup}</h1>
                </div>
                <div className="flex justify-center items-start">
                  <RankingTable
                    key={selectedGroup}
                    data={groupedData[selectedGroup]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualRankingReport;
