import React, { useState, useEffect, useRef } from "react";
import { where } from "firebase/firestore";

import ReactToPrint from "react-to-print";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useFirestoreQuery } from "../../customHooks/useFirestores";

const ManualRankingReportType2Print = ({ key, data, handleCancelClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [rankingTableKey, setRankingTableKey] = useState(null);
  const [getRankBoard, setGetRankBoard] = useState([]);
  const getDatas = useFirestoreQuery();
  const printRef = useRef(null);
  console.log(data);
  console.log(key);

  const { manualRank } = useContext(ManualRankContext);
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

  const RankingTable = React.forwardRef(({ key, data }, ref) => {
    const sortPlayerNumbers = [
      ...new Set(data.map((item) => parseInt(item.playerNumber))),
    ].sort((a, b) => String(a) - String(b));
    const playerNumbers = sortPlayerNumbers.map((num) => String(num));
    const refSeatIndexes = [
      ...new Set(data.map((item) => item.refSeatIndex)),
    ].sort();

    playerNumbers.map((playerNumber) =>
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

      console.log(bgColors);
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

    console.log("totals", totals);

    const sortedPlayerIndex = playerNumbers
      .map((total, index) => [index, total])
      .sort((a, b) => a[1] - b[1])
      .map((item) => item[0]);

    function calculateRank(arr, num) {
      const dummy = [...arr];
      dummy.sort((a, b) => a - b);
      const index = dummy.indexOf(num);
      const rank = index + 1;
      return rank;
    }
    return (
      <div className="flex p-3 border border-gray-500 w-full">
        <table>
          <thead>
            <tr className="border-b">
              <th className="w-20 text-sm ">선수번호</th>
              <th className="w-20 h-10 text-sm font-bold">순위</th>
              {refSeatIndexes.map((refSeatIndex) => (
                <th className="w-20" key={refSeatIndex}>
                  {refSeatIndex}
                </th>
              ))}
              <th className="text-sm">기표합산</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayerIndex.map((playerNumber, index) => {
              // 해당 플레이어의 총점이 100을 넘는지 체크
              const isScoreOver100 = totals[playerNumber] > 100;
              // 총점이 100을 넘는 경우 해당 행을 렌더링하지 않음
              if (isScoreOver100) {
                return null;
              }
              return (
                <tr key={playerNumber} className="table-row-wrapper">
                  <td className="w-20 h-10 text-center font-semibold">
                    {playerNumbers[playerNumber]}
                  </td>
                  <td className="w-20 h-10 text-center text-lg font-semibold">
                    {calculateRank(totals, totals[playerNumber])}
                  </td>
                  {refSeatIndexes.map((refSeatIndex, j) => {
                    const index = data.findIndex(
                      (item) =>
                        item.playerNumber === playerNumbers[playerNumber] &&
                        item.refSeatIndex === refSeatIndex
                    );
                    const playerRank = index >= 0 ? data[index].playerRank : "";
                    // playerRank가 100을 넘어가면 빈칸으로 나오도록 함
                    const cellValue = playerRank < 100 ? playerRank : "";
                    return (
                      <td
                        key={`${playerNumber}-${j}`}
                        className={`${rowBgColors[playerNumber][j]} w-20 h-10 text-center`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                  <td className="w-20 h-10 text-center">{totals[index]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col justify-start h-full items-center px-5 py-2">
      <div
        className="flex w-full gap-x-5 flex-col bg-white"
        style={{
          width: "210mm",
        }}
      >
        <div className="flex gap-x-5 flex-wrap w-full mt-5 justify-end">
          <ReactToPrint
            trigger={() => (
              <button className="w-40 h-10 bg-green-300 rounded-lg mb-5">
                집계표출력
              </button>
            )}
            content={() => printRef.current}
            pageStyle="@page { size: A4; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; } }"
          />
          <button
            className="w-20 h-10 bg-green-300 rounded-lg mb-5 mr-5"
            onClick={() => handleCancelClick()}
          >
            닫기
          </button>
        </div>

        <div
          className="flex w-full justify-center items-center bg-white p-5"
          ref={printRef}
          style={{
            width: "210mm",
            height: "297mm",
            padding: "5mm",
            boxSizing: "border-box",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            margin: "auto",
          }}
        >
          <div className="flex w-full h-full border-2 border-gray-600">
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
                  <h1 className="text-sm">
                    대회명 : {manualRank.contestInfo.contestTitle}
                  </h1>
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
                <h1>
                  종목/체급 : {data[0].refGameTitle} / {data[0].refClassTitle}
                </h1>
              </div>
              <div className="flex justify-center items-start">
                <RankingTable key={key} data={data} />
              </div>
              <div className="flex w-full h-16 border-2 border-gray-800">
                <div className="flex w-1/3 h-full justify-center items-center text-xl border-r-2 border-gray-800">
                  심사위원장 날인
                </div>
                <div className="flex w-2/3 h-full justify-center items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualRankingReportType2Print;
