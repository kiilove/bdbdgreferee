import React, { useState, useEffect } from "react";
import { where } from "firebase/firestore";

import useFirestore from "../../customHooks/useFirestore";
import useFirestoreSearch from "../../customHooks/useFirestoreSearch";
import Header from "../../components/Header";

const AdminReport = () => {
  const [cupId, setCupId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const [rankingTableKey, setRankingTableKey] = useState(null);
  const { data: getRankBoard, readData: rankBoardReadDatas } = useFirestore();
  const conditions = [where("cupInfo.cupState", "==", "대회중")];
  const getCupDatasWithState = useFirestoreSearch("cups", conditions);

  const handleGroupChange = (key) => {
    setSelectedGroup(key);
    setRankingTableKey(key);
  };

  const gamesGroup = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const key = `${item.refGameTitle}/${item.refClassTitle}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);
      return acc;
    }, {});
    setGroupedData(groupedData);
    console.log(groupedData);
  };

  useEffect(() => {
    if (cupId) {
      setIsLoading(false);
      rankBoardReadDatas("rankingboard");
    }
  }, [cupId]);

  useEffect(() => {
    if (getCupDatasWithState.data.length === 1) {
      setCupId(getCupDatasWithState.data[0].id);
    }
  }, [getCupDatasWithState.data]);

  useEffect(() => {
    if (getRankBoard.length !== 0) {
      gamesGroup(getRankBoard);
    }
  }, [getRankBoard]);

  // const RankingTable = ({ data }) => {
  //   const rows = Array.from(Array(3), (_, i) => i + 1);
  //   const columns = Array.from(Array(4), (_, i) => i + 1);
  //   const tableData = rows.map((row) =>
  //     columns.map((column) => {
  //       const match = data.find(
  //         (item) => item.playerNumber === row && item.refSeatIndex === column
  //       );
  //       return match ? match.playerRank : null;
  //     })
  //   );

  //   // 최저점수와 최고점수를 찾아 bg-color를 변경합니다.
  //   const rowBgColors = rows.map((row) => {
  //     const ranks = columns
  //       .map((column) => {
  //         const match = data.find(
  //           (item) => item.playerNumber === row && item.refSeatIndex === column
  //         );
  //         return match ? match.playerRank : null;
  //       })
  //       .filter((rank) => rank !== null);

  //     const minRank = Math.min(...ranks);
  //     const maxRank = Math.max(...ranks);

  //     const bgColors = ranks.map((rank, index) => {
  //       if (rank === maxRank && !ranks.slice(0, index).includes(maxRank)) {
  //         return "bg-red-500";
  //       } else if (
  //         rank === minRank &&
  //         !ranks.slice(0, index).includes(minRank)
  //       ) {
  //         return "bg-blue-500";
  //       } else {
  //         return "";
  //       }
  //     });

  //     return bgColors;
  //   });

  //   // 전체 점수에서 최고점과 최저점을 뺀 합계를 구합니다.
  //   const totals = rows.map((row) => {
  //     const ranks = columns
  //       .map((column) => {
  //         const match = data.find(
  //           (item) => item.playerNumber === row && item.refSeatIndex === column
  //         );
  //         return match ? match.playerRank : null;
  //       })
  //       .filter((rank) => rank !== null);

  //     const minRank = Math.min(...ranks);
  //     const maxRank = Math.max(...ranks);

  //     const sum = ranks.reduce((acc, rank) => acc + rank, 0);
  //     const total = sum - minRank - maxRank;

  //     return total;
  //   });

  //   // tableData와 rowBgColors를 이용해 집계표를 렌더링합니다.
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th></th>
  //           {columns.map((column) => (
  //             <th key={column}>심판 {column}</th>
  //           ))}
  //           <th>합계</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {rows.map((row, i) => (
  //           <tr key={row}>
  //             <th> {row}</th>
  //             {columns.map((column, j) => (
  //               <td key={`${i}-${j}`} className={rowBgColors[i][j]}>
  //                 {tableData[i][j]}
  //               </td>
  //             ))}
  //             <td>{totals[i]}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

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

    console.log(refSeatIndexes);
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
            {sortedRankIndex.map((rowIndex, rank) => (
              <tr key={rowIndex}>
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
      <div className="flex w-full gap-x-5">
        <div className="flex w-1/4 h-10 border-blue-600 border">
          <select
            name="cupSelect"
            onChange={(e) => {
              setCupId((prev) => (prev = e.target.value));
            }}
          >
            {!getCupDatasWithState.data.length ? (
              <option>진행중인 대회정보 로딩중...</option>
            ) : (
              getCupDatasWithState.data.map((cup, cidx) => (
                <option value={cup.id}>{cup.cupInfo.cupName}</option>
              ))
            )}
          </select>
        </div>

        <div className="flex gap-x-5 flex-wrap w-2/3">
          {!groupedData ? (
            "종목 불러오는중"
          ) : (
            <div className="flex justify-center items-center gap-x-2">
              {Object.keys(groupedData).map((key) => (
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
  );
};

export default AdminReport;
