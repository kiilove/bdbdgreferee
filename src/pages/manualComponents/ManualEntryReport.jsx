import React, { useRef } from "react";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import ReactToPrint from "react-to-print";

const ManualEntryReport = () => {
  const { manualRank } = useContext(ManualRankContext);
  const printRef = useRef();
  const contestOrders = manualRank.contestOrders;

  let playerDataByCategory = [];
  if (contestOrders) {
    playerDataByCategory = contestOrders.contestCategorys
      ?.filter((f) => f.isActive)
      .map((category, cIdx) => {
        const {
          id,
          contestCategoryTitle,
          categoryIndex,
          isActive: categoryIsActive,
        } = category;

        const matchingGrades = contestOrders.contestGrades
          .filter((grade) => grade.refCategoryId === id)
          .sort((a, b) => a.gradeIndex - b.gradeIndex);

        matchingGrades.forEach((grade) => {
          grade.contestGradeTitle = grade.contestGradeTitle || grade.gradeTitle;
          grade.players = contestOrders.contestPlayers
            .filter(
              (player) =>
                player.refGradeId === grade.id &&
                (player?.isActive === true || player?.isActive === undefined)
            )
            .sort((a, b) => a.contestPlayerIndex - b.contestPlayerIndex);
        });
        console.log("체급", matchingGrades);

        return {
          contestCategoryTitle,
          matchingGrades,
          categoryIndex,
          categoryIsActive,
        };
      });

    playerDataByCategory.sort((a, b) => a.categoryIndex - b.categoryIndex);
    console.log("playerDataByCategory", playerDataByCategory);
  }
  return (
    <div className="flex w-full flex-col justify-start h-full items-center px-5 py-2">
      <div className="flex w-full gap-x-5 flex-col">
        <div className="flex gap-x-5 flex-wrap w-full box-border h-full"></div>
        <div className="flex">
          <ReactToPrint
            trigger={() => (
              <button className="w-40 h-14 bg-green-500 rounded-lg mb-5">
                전체명단 출력
              </button>
            )}
            content={() => printRef.current}
            pageStyle={`
    @page {
      size: A4;
      margin: 0;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
      .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 12px;
      }
      .page-break { page-break-inside:avoid; page-break-after:auto }
    }
  `}
          />
        </div>
        <div
          className="flex w-full justify-center items-center bg-white p-5"
          ref={printRef}
        >
          <div className="flex w-full h-full" style={{ maxWidth: "1200px" }}>
            <div className="flex gap-x-5 w-full px-8 flex-col">
              <div className="flex w-full justify-center mb-5">
                <h1 className="text-lg font-bold border flex w-full justify-center items-center h-16 border-gray-600 border-r-2 border-b-2">
                  {manualRank.contestInfo.contestTitle} 출전명단
                </h1>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col w-full">
                  {playerDataByCategory?.length > 0 &&
                    playerDataByCategory
                      .sort((a, b) => a.categoryIndex - b.categoryIndex)
                      .map((category, cIdx) => {
                        return (
                          <div className="flex flex-col w-full mb-10">
                            {category.matchingGrades.length > 0 &&
                              category.matchingGrades.map((matching, mIdx) => {
                                if (matching.players?.length > 0) {
                                  return (
                                    <div className="flex flex-col w-full page-break ">
                                      <div className="flex h-10 justify-start items-end mb-2">
                                        <h1 className="text-lg font-semibold">
                                          {category.contestCategoryTitle}(
                                          {matching.contestGradeTitle})
                                        </h1>
                                      </div>
                                      <table className="w-full border border-b-2 border-r-2 border-gray-500">
                                        <thead>
                                          <tr className="h-10">
                                            <th className="border border-gray-500 w-1/12 text-sm">
                                              출전순서
                                            </th>
                                            <th className="border border-gray-500 w-1/12 text-sm">
                                              선수번호
                                            </th>
                                            <th className="border border-gray-500 w-2/12">
                                              이름
                                            </th>
                                            <th className="border border-gray-500 w-4/12">
                                              소속
                                            </th>
                                            <th className="border border-gray-500 w-4/12">
                                              비고
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {matching.players.length > 0 &&
                                            matching.players.map(
                                              (player, pIdx) => (
                                                <tr className="h-10">
                                                  <td className="border border-gray-500 text-center">
                                                    {player.contestPlayerIndex}
                                                  </td>
                                                  <td className="border border-gray-500 text-center">
                                                    {player.contestPlayerNumber}
                                                  </td>
                                                  <td className="border border-gray-500 text-center">
                                                    {player.contestPlayerName}
                                                  </td>
                                                  <td className="border border-gray-500 text-center">
                                                    {player.contestPlayerGym}
                                                  </td>
                                                  <td className="border border-gray-500 text-center"></td>
                                                </tr>
                                              )
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEntryReport;
