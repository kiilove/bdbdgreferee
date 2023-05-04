import React, { useState, useEffect, useRef } from "react";
import { orderBy, where } from "firebase/firestore";

import ReactToPrint from "react-to-print";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useFirestoreQuery } from "../../customHooks/useFirestores";
import { Modal } from "@mui/material";

const ManualWinnerReportV2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
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
    const conditions = [
      where("refCupId", "==", manualRank.id),
      orderBy("refGameIndex"),
      orderBy("refClassIndex"),
    ];
    const fetchedDatas = await getDatas.getDocuments(
      manualRank.contestInfo.contestCollectionName,
      conditions
    );
    console.log(fetchedDatas);
    setGetRankBoard([...fetchedDatas]);
  };
  useEffect(() => {
    fetchRankingboards();
  }, []);

  useEffect(() => {
    fetchRankingboards();
  }, [isRefresh]);

  useEffect(() => {
    if (getRankBoard.length !== 0) {
      console.log(getRankBoard);
      gamesGroup(getRankBoard);
      setIsLoading(false);
    }
  }, [getRankBoard]);

  const handleRankingData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const {
        playerNumber,
        playerName,
        playerIndex,
        playerGym = "",
        refSeatIndex,
        playerRank,
      } = item;
      if (!acc[playerNumber]) {
        acc[playerNumber] = {
          playerNumber,
          playerName,
          playerIndex,
          playerGym,
          rank: [],
          sumScore: 0,
        };
      }
      acc[playerNumber].rank.push({ seatIndex: refSeatIndex, playerRank });
      // sort the 'rank' array by 'seatIndex' in ascending order
      acc[playerNumber].rank.sort((a, b) => a.seatIndex - b.seatIndex);
      acc[playerNumber].sumScore += playerRank;
      return acc;
    }, {});

    const result = Object.values(groupedData);

    result.forEach((group) => {
      let minRank = Infinity;
      let maxRank = -Infinity;
      let minIndex = -1;
      let maxIndex = -1;
      let totalRank = 0;

      // Check if all ranks are the same
      const isSameRank = group.rank.every(
        (rankInfo) => rankInfo.playerRank === group.rank[0].playerRank
      );

      group.rank.forEach(({ playerRank }, index) => {
        if (playerRank < minRank) {
          minRank = playerRank;
          minIndex = index;
        }
        if (playerRank > maxRank) {
          maxRank = playerRank;
          maxIndex = index;
        }
        totalRank += playerRank;
      });

      group.rank.forEach((rankInfo, index) => {
        const { playerRank } = rankInfo;
        if (isSameRank) {
          if (index === 0) {
            rankInfo.isMin = true;
            rankInfo.isMax = false;
          } else if (index === 1) {
            rankInfo.isMin = false;
            rankInfo.isMax = true;
          } else {
            rankInfo.isMin = false;
            rankInfo.isMax = false;
          }
        } else {
          if (index === minIndex) {
            rankInfo.isMin = true;
            rankInfo.isMax = false;
          } else if (index === maxIndex) {
            rankInfo.isMin = false;
            rankInfo.isMax = true;
          } else {
            rankInfo.isMin = false;
            rankInfo.isMax = false;
          }
        }
      });

      if (group.rank.length > 2) {
        group.sumScore = isSameRank
          ? totalRank
          : totalRank - (minRank + maxRank);
      } else {
        group.sumScore = totalRank;
      }
    });

    return result;
  };

  useEffect(() => {
    console.log(groupedData);
  }, [groupedData]);

  const RankingTable = React.forwardRef(({ data }, ref) => {
    function sortPlayersByScore(players) {
      const sortedPlayers = players
        .slice()
        .sort((a, b) => a.sumScore - b.sumScore);
      return sortedPlayers.map((player, index) => ({
        ...player,
        playerPosition: index + 1,
      }));
    }

    const sortedPlayers = sortPlayersByScore(handleRankingData(data));
    const sortedIndex = sortedPlayers
      .slice()
      .sort((a, b) => a.playerIndex - b.playerIndex);
    console.log(sortedIndex);
    const refSeatIndexes = [
      ...new Set(data.map((item) => item.refSeatIndex)),
    ].sort();

    return (
      <div className="flex px-8 w-full justify-center">
        <table>
          <thead>
            <tr className="border-b border-gray-800">
              <th className="w-20 h-10 text-base font-bold border border-gray-500">
                순위
              </th>
              <th className="w-28 text-base border border-gray-500">
                선수번호
              </th>
              <th className="w-72 h-10 text-base font-bold border border-gray-500">
                이름
              </th>
              <th className="w-72 h-10 text-base font-bold border border-gray-500">
                소속
              </th>
              <th className="w-72 h-10 text-base font-bold border border-gray-500">
                비고
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers?.length > 0 &&
              sortedPlayers.map((player, pIdx) => {
                const shouldRender = player.sumScore < 100;
                return shouldRender ? (
                  <tr className="table-row-wrapper border-b border-gray-400">
                    <td className="w-20 h-12 text-center font-semibold border border-gray-500">
                      {player.playerPosition}
                    </td>
                    <td className="w-20 h-12 text-center font-semibold border border-gray-500">
                      {player.playerNumber}
                    </td>
                    <td className="w-52 h-12 text-center font-semibold border border-gray-500">
                      {player.playerName}
                    </td>
                    <td className="w-52 h-12 text-center font-semibold border border-gray-500">
                      {player.playerGym}
                    </td>
                    <td className="w-64 h-12 text-center font-semibold border border-gray-500"></td>
                  </tr>
                ) : null;
              })}
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col justify-start h-full items-center px-5 py-2">
      <div className="flex w-full gap-x-5 flex-col">
        <div className="flex gap-x-5 flex-wrap w-full box-border h-full">
          {!isLoading && (
            <div className="flex justify-center items-center gap-2 mb-5 flex-wrap">
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
            </div>
          )}
        </div>
        <div className="flex">
          <ReactToPrint
            trigger={() => (
              <button className="w-40 h-14 bg-green-500 rounded-lg mb-5">
                순위표 출력
              </button>
            )}
            content={() => printRef.current}
            pageStyle="@page { size: A4; margin: 0; } @media print { body { -webkit-print-color-adjust: exact; } }"
          />
          <button
            className="w-40 h-14 bg-green-500 rounded-lg mb-5 ml-5"
            onClick={() => {
              setIsRefresh(!isRefresh);
            }}
          >
            새로고침
          </button>
        </div>
        <div
          className="flex w-full justify-center items-center bg-white p-5"
          ref={printRef}
        >
          <div
            className="flex w-full h-full border-2 border-gray-600"
            style={{ maxWidth: "1200px" }}
          >
            {selectedGroup && (
              <div className="flex flex-col box-border overflow-y-auto p-3 rounded-md w-full h-full gap-y-3">
                <div className="flex gap-x-5 w-full">
                  <div className="flex w-full justify-center items-center">
                    <h1
                      className="flex justify-center items-center h-14 text-3xl font-extrabold font-sans"
                      style={{ letterSpacing: "20px" }}
                    >
                      순위표
                    </h1>
                  </div>
                </div>
                <div className="flex gap-x-5 w-full px-8">
                  <div className="flex w-full">
                    <h1>대회명 : {manualRank.contestInfo.contestTitle}</h1>
                  </div>
                </div>
                <div className="flex gap-x-5 w-full px-8">
                  <div className="flex w-1/2">
                    대회일자 : {manualRank.contestInfo.contestDate}
                  </div>
                </div>
                <div className="flex gap-x-5 w-full px-8">
                  <div className="flex w-1/2">
                    <h1>주관 : {manualRank.contestInfo.contestAssociate}</h1>
                  </div>
                  <div className="flex w-1/2  px-8">
                    주최 : {manualRank.contestInfo.contestPromoter}
                  </div>
                </div>

                <div className="flex justify-center items-start flex-col">
                  <div className="flex w-full h-10 mt-5 px-8">
                    <h1 className="font-bold text-lg">
                      종목/체급 : {selectedGroup}
                    </h1>
                  </div>
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

export default ManualWinnerReportV2;
