import React from "react";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ManualRankingBase = () => {
  const { manualRank, setManualRank } = useContext(ManualRankContext);
  const [groupedGradeId, setGroupedGradeId] = useState([]);

  const renderButtons = () => {
    return Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => console.log(`Button ${number} clicked`)}
        className="w-8 h-8 flex bg-green-100 justify-center items-center rounded-md"
      >
        {number}
      </button>
    ));
  };

  const groupByGradeId = (players, contestGrades, contestCategorys) => {
    const grouped = [];

    players.forEach((player) => {
      let groupData = grouped.find(
        (group) => group.refGradeId === player.refGradeId
      );

      if (!groupData) {
        const grade = contestGrades.find(
          (grade) => grade.id === player.refGradeId
        );
        const category = contestCategorys.find(
          (category) => category.id === grade.refCategoryId
        );

        groupData = {
          refGradeId: player.refGradeId,
          players: [],
          gradeTitle: grade.contestGradeTitle,
          categoryTitle: category.contestCategoryTitle,
        };

        grouped.push(groupData);
      }

      groupData.players.push(player);
    });
    setGroupedGradeId(grouped);
    return grouped;
  };

  useEffect(() => {
    if (manualRank.contestOrders?.contestPlayers.length) {
      const getPlayers = [...manualRank.contestOrders.contestPlayers];
      const getGrades = [...manualRank.contestOrders.contestGrades];
      const getCategorys = [...manualRank.contestOrders.contestCategorys];
      console.log(groupByGradeId(getPlayers, getGrades, getCategorys));
    }
  }, [manualRank]);

  return (
    <div className="flex w-full gap-x-5">
      <div className="w-1/4 h-full flex flex-col gap-y-2 py-2">
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ml-5">
            <span>종목/체급 선택</span>
          </div>
        </div>
        <div className="flex w-full h-full justify-start items-center flex-col gap-y-2">
          {groupedGradeId?.length &&
            groupedGradeId.map((grouped, gIdx) => (
              <div className="flex w-full bg-green-500 px-3 h-10 justify-start items-center rounded-lg">
                {grouped.categoryTitle} / {grouped.gradeTitle}(
                {grouped.players?.length})
              </div>
            ))}
        </div>
      </div>
      <div className="w-3/4 h-full flex flex-col gap-y-2 py-2">
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ml-5">
            <span>심판/채점표 자리번호</span>
          </div>
        </div>
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg flex-col">
          <div className="flex justify-between items-center w-full px-3 h-full">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualRankingBase;
