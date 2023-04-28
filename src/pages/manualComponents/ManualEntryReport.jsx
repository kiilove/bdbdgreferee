import React from "react";
import { useContext } from "react";
import { ManualRankContext } from "../../context/ManualRankContext";

const ManualEntryReport = () => {
  const { manualRank } = useContext(ManualRankContext);
  const contestOrders = manualRank.contestOrders;
  console.log(contestOrders);

  const playerDataByCategory = contestOrders.contestCategorys.map(
    (category, categoryIndex) => {
      const { id, contestCategoryTitle } = category;
      console.log(id);

      const matchingGrades = contestOrders.contestGrades
        .filter((grade) => grade.refCategoryId === id)
        .sort((a, b) => a.gradeIndex - b.gradeIndex);

      matchingGrades.forEach((grade) => {
        grade.contestGradeTitle = grade.contestGradeTitle || grade.gradeTitle;
        grade.players = contestOrders.contestPlayers
          .filter((player) => player.refGradeId === grade.id)
          .sort((a, b) => a.playerIndex - b.playerIndex);
      });
      console.log("체급", matchingGrades);

      return {
        contestCategoryTitle,
        matchingGrades,
        categoryIndex,
      };
    }
  );

  playerDataByCategory.sort((a, b) => a.categoryIndex - b.categoryIndex);
  console.log("playerDataByCategory", playerDataByCategory);

  return (
    <table>
      <thead>
        <tr>
          <th>카테고리</th>
          <th>체급</th>
          <th>선수</th>
        </tr>
      </thead>
      <tbody>
        {playerDataByCategory.map(
          ({ contestCategoryTitle, matchingGrades }) => (
            <>
              <tr>
                <td rowSpan={matchingGrades.length}>{contestCategoryTitle}</td>
                <td>{matchingGrades[0].gradeTitle}</td>
                <td>
                  {matchingGrades[0].players.map(({ playerName }) => (
                    <div>{playerName}</div>
                  ))}
                </td>
              </tr>
              {matchingGrades.map(({ contestGradeTitle, players }) => (
                <tr>
                  <td>{contestGradeTitle}</td>
                  <td>
                    {players.map(
                      ({
                        contestPlayerName,
                        contestPlayerGym,
                        contestPlayerIndex,
                        contestPlayerNumber,
                      }) => (
                        <div>
                          {contestPlayerIndex}-{contestPlayerNumber}-
                          {contestPlayerName}-{contestPlayerGym}
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </>
          )
        )}
      </tbody>
    </table>
  );
};

export default ManualEntryReport;
