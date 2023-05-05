import React, { useRef } from "react";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import { useEffect } from "react";

const ManualScaleHeightByCategoryReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSection, setSelectedSection] = useState(0);
  const { manualRank } = useContext(ManualRankContext);
  const printRef = useRef();
  const contestOrders = manualRank.contestOrders;
  let playerDataByCategory = [];
  if (contestOrders) {
    playerDataByCategory = contestOrders?.contestCategorys.map(
      (category, cIdx) => {
        const { id, contestCategoryTitle, categorySection, categoryIndex } =
          category;

        const matchingGrades = contestOrders.contestGrades
          .filter((grade) => grade.refCategoryId === id)
          .sort((a, b) => a.gradeIndex - b.gradeIndex);

        matchingGrades.forEach((grade) => {
          grade.contestGradeTitle = grade.contestGradeTitle || grade.gradeTitle;
          grade.players = contestOrders.contestPlayers
            .filter((player) => player.refGradeId === grade.id)
            .sort((a, b) => a.contestPlayerIndex - b.contestPlayerIndex);
        });

        return {
          contestCategoryTitle,
          matchingGrades,
          categoryIndex,
          categorySection,
        };
      }
    );

    playerDataByCategory.sort((a, b) => a.categoryIndex - b.categoryIndex);
  }

  useEffect(() => {
    setFilteredData([...playerDataByCategory]);
  }, []);

  useEffect(() => {
    let newFilteredData = [];
    if (selectedCategory === "통합") {
      newFilteredData = [...playerDataByCategory];
    } else {
      newFilteredData = playerDataByCategory.filter(
        (filter) => filter.contestCategoryTitle === selectedCategory
      );
    }

    setFilteredData([...newFilteredData]);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(selectedSection);
    if (selectedSection !== 0 && selectedSection <= 4) {
      const newFilteredData = playerDataByCategory.filter(
        (filter) => filter.categorySection === selectedSection
      );
      console.log(playerDataByCategory);
      console.log(newFilteredData);

      setFilteredData([...newFilteredData]);
    }
  }, [selectedSection]);

  return (
    <div className="flex w-full flex-col justify-start h-full items-center px-5 py-2">
      <div className="flex w-full gap-x-5 flex-col">
        <div className="flex justify-start items-center gap-2 mb-5 flex-wrap">
          <button
            className={
              selectedSection === 1
                ? "bg-green-500 flex p-2  rounded-md"
                : "bg-green-200 flex p-2  rounded-md"
            }
            onClick={() => {
              setSelectedSection(1);
              setSelectedCategory("1부");
            }}
          >
            1부전체
          </button>
          <button
            className={
              selectedSection === 2
                ? "bg-green-500 flex p-2  rounded-md"
                : "bg-green-200 flex p-2  rounded-md"
            }
            onClick={() => {
              setSelectedSection(2);
              setSelectedCategory("2부");
            }}
          >
            2부전체
          </button>
          <button
            className={
              selectedSection === 3
                ? "bg-green-500 flex p-2  rounded-md"
                : "bg-green-200 flex p-2  rounded-md"
            }
            onClick={() => {
              setSelectedSection(3);
              setSelectedCategory("3부");
            }}
          >
            3부전체
          </button>
        </div>
        <div className="flex justify-start items-center gap-2 mb-5 flex-wrap">
          <button onClick={() => setSelectedCategory("통합")}>통합</button>
          {contestOrders?.contestCategorys &&
            contestOrders.contestCategorys.map((category, cIdx) => (
              <button
                className={
                  selectedCategory === category.contestCategoryTitle
                    ? "bg-green-500 flex p-2  rounded-md"
                    : "bg-green-200 flex p-2  rounded-md"
                }
                onClick={() =>
                  setSelectedCategory(category.contestCategoryTitle)
                }
              >
                {category.contestCategoryTitle}
              </button>
            ))}
        </div>
        <div className="flex">
          <ReactToPrint
            trigger={() => (
              <button className="w-40 h-14 bg-green-500 rounded-lg mb-5">
                명단 출력
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
                <div className="text-lg font-bold border flex w-full justify-center items-center h-20 border-gray-600 border-r-2 border-b-2 flex-col">
                  <hi>{manualRank.contestInfo.contestTitle}</hi>
                  <hi className="mt-2 text-2xl">{selectedCategory} 계측명단</hi>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-col w-full">
                  {filteredData?.length &&
                    filteredData.map((category, cIdx) => {
                      return (
                        <div className="flex flex-col w-full mb-10">
                          {category.matchingGrades.length > 0 &&
                            category.matchingGrades.map((matching, mIdx) => {
                              return (
                                <div className="flex flex-col w-full page-break">
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
                                          순번
                                        </th>
                                        <th className="border border-gray-500 w-1/12 text-sm">
                                          추천번호
                                        </th>
                                        <th className="border border-gray-500 w-1/12 text-sm">
                                          부여번호
                                        </th>
                                        <th className="border border-gray-500 w-2/12 text-sm">
                                          이름
                                        </th>
                                        <th className="border border-gray-500 w-2/12 text-sm">
                                          소속
                                        </th>
                                        <th className="border border-gray-500 w-2/12 text-sm">
                                          신장/체중
                                        </th>
                                        <th className="border border-gray-500 w-2/12 text-sm">
                                          비고
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {matching.players.length > 0 &&
                                        matching.players.map((player, pIdx) => {
                                          let startNumber = 1;
                                          const prePlayerCount =
                                            playerDataByCategory.filter(
                                              (player) =>
                                                player.categoryIndex <
                                                category.categoryIndex
                                            );
                                          const playersCount =
                                            prePlayerCount.reduce(
                                              (acc, curr) => {
                                                return (
                                                  acc +
                                                  curr.matchingGrades.reduce(
                                                    (acc2, curr2) => {
                                                      return (
                                                        acc2 +
                                                        curr2.players.length
                                                      );
                                                    },
                                                    0
                                                  )
                                                );
                                              },
                                              0
                                            );

                                          // if (category.categoryIndex <= 0) {
                                          //   startNumber = 1;
                                          // } else {
                                          //   startNumber =
                                          //     category.categoryIndex +
                                          //     1 +
                                          //     playersCount;
                                          // }

                                          return (
                                            <tr className="h-10">
                                              <td className="border border-gray-500 text-center">
                                                {player.contestPlayerIndex}
                                              </td>
                                              <td className="border border-gray-500 text-center text-gray-400">
                                                {player.contestPlayerNumber}
                                              </td>
                                              <td className="border border-gray-500 text-center"></td>
                                              <td className="border border-gray-500 text-center">
                                                {player.contestPlayerName}
                                              </td>
                                              <td className="border border-gray-500 text-center">
                                                {player.contestPlayerGym}
                                              </td>
                                              <td className="border border-gray-500 text-center"></td>
                                              <td className="border border-gray-500 text-center"></td>
                                            </tr>
                                          );
                                        })}
                                      <tr className="h-10">
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                      </tr>
                                      <tr className="h-10">
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                        <td className="border border-gray-500 text-center"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              );
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

export default ManualScaleHeightByCategoryReport;
