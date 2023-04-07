import React, { useState, useEffect } from "react";
import { where } from "firebase/firestore";

import useFirestore from "../../customHooks/useFirestore";
import useFirestoreSearch from "../../customHooks/useFirestoreSearch";
import Header from "../../components/Header";
import "./tableanimation.css";

const AdminReportDemo = () => {
  const [cupId, setCupId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [rankingTableKey, setRankingTableKey] = useState(null);
  const [animationIndex, setAnimationIndex] = useState(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const { data: getRankBoard, readData: rankBoardReadDatas } = useFirestore();
  const conditions = [where("cupInfo.cupState", "==", "대회중")];
  const getCupDatasWithState = useFirestoreSearch("cups", conditions);

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

  useEffect(() => {
    console.log(getCupDatasWithState);
    if (getCupDatasWithState.data.length) {
      setIsLoading(false);
      setCupId(getCupDatasWithState.data[0].id);
      rankBoardReadDatas("rankingboarddemo");
    }
  }, [getCupDatasWithState.data]);

  useEffect(() => {
    if (getRankBoard.length !== 0) {
      console.log(getRankBoard);
      gamesGroup(getRankBoard);
    }
  }, [getRankBoard]);

  useEffect(() => {
    console.log(groupedData);
  }, [groupedData]);

  const RankingTable = ({ data }) => {
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
          return "bg-red-200";
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
      <div className="flex p-3 border">
        <table>
          <thead>
            <tr className="border-b">
              <th className="w-20 text-lg">선수번호</th>
              <th className="w-20 h-10 text-lg">순위</th>
              {refSeatIndexes.map((refSeatIndex) => (
                <th className="w-20" key={refSeatIndex}>
                  심판 {refSeatIndex}
                </th>
              ))}
              <th>기표합산</th>
            </tr>
          </thead>
          <tbody>
            {sortedRankIndex.map((rowIndex, rank, index) => (
              <tr
                key={rowIndex}
                className="table-row-wrapper"
                style={{
                  animationDelay: `${
                    (sortedRankIndex.length - rank - 1) * 1000
                  }ms`,
                }}
              >
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
  };

  return (
    <div className="flex w-full flex-col justify-start h-screen items-center px-5 py-2">
      {isLoading && "로딩중...."}
      <div className="flex w-full h-20 justify-center">
        <Header />
      </div>
      <div className="flex w-full gap-x-5 flex-col">
        <div className="flex gap-x-5 flex-wrap w-full">
          {!isLoading && (
            <div className="flex justify-center items-center gap-x-2">
              {Object.keys(groupedData || {}).map((key) => (
                <button
                  key={key}
                  onClick={() => handleGroupChange(key)}
                  disabled={selectedGroup === key}
                  className="flex p-2 bg-pink-300 rounded-md"
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

        <div className="flex w-full mt-5 justify-center items-center ">
          {selectedGroup && (
            <div className="flex flex-col box-border overflow-y-auto p-10 rounded-md w-full h-full">
              <h1>{selectedGroup}</h1>
              <RankingTable
                key={rankingTableKey}
                data={groupedData[selectedGroup]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReportDemo;
