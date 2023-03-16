import React from "react";
import { where } from "firebase/firestore";

import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useFirestore from "../../customHooks/useFirestore";
import useFirestoreSearch from "../../customHooks/useFirestoreSearch";
import RankingBoard from "../RankingBoard";
import ScoreVertical from "../ScoreVertical";

const AdminReport = () => {
  const [getCups, setGetCups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("랭킹형");
  const [selectedCup, setSelectedCup] = useState({});
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectedReferee, setSelectedReferee] = useState({});
  const [enableReferee, setEnableReferee] = useState([]);
  const [enableClasses, setEnableClasses] = useState([]);
  const [enableReportList, setEnableReportList] = useState([]);
  const [reportListSort, setReportListSort] = useState([]);
  const [demoProps, setDemoProps] = useState({});

  const { data: getAdminData, readData: cupReadDatas } = useFirestore();
  const { data: getRankBoard, readData: rankBoardReadDatas } = useFirestore();
  const conditions = [where("cupInfo.cupState", "==", "대회중")];
  const getCupDatasWithState = useFirestoreSearch("cups", conditions);

  const handleRefreeList = (data) => {
    const referees = Object.values(data.gamesCategory).reduce((acc, cur) => {
      return acc.concat(cur.refereeAssign);
    }, []);

    const uniqueReferees = [
      ...new Set(
        referees.filter(
          (r) =>
            r !== undefined &&
            r.refUid !== undefined &&
            r.refUid !== null &&
            r.refUid !== ""
        )
      ),
    ];

    const uniqueRefereesByUid = [
      ...new Set(
        uniqueReferees
          .filter(
            (r) =>
              r &&
              r.refUid !== undefined &&
              r.refUid !== null &&
              r.refUid !== ""
          )
          .map((r) => r.refUid)
      ),
    ].map((uid) => uniqueReferees.find((r) => r.refUid === uid));

    return uniqueRefereesByUid;
  };

  const fiterIsEntryRefereeList = (data, categoryId) => {
    if (!data.length || !categoryId) {
      return;
    }
    const category = data[selectedCup.index].gamesCategory.find(
      (category) => category.id === categoryId
    );

    if (!category || !category.refereeAssign) {
      return [];
    }

    const refereeAssigns = category.refereeAssign;

    return {
      refereeTotal: [...refereeAssigns],
      refereeLength: refereeAssigns.length,
    };
  };

  const filterIsEntryGamesList = (data) => {
    console.log(data);
    if (!data.id) {
      return;
    }

    const validClasses = data.gamesCategory.flatMap((category) =>
      category.class.flatMap((classItem) => {
        if (Array.isArray(classItem.players) && classItem.players.length > 0) {
          return {
            id: category.id,
            class: classItem,
            gameTitle: category.title,
            classTitle: classItem.title,
          };
        }
        return [];
      })
    );
    console.log(validClasses);
    return validClasses;
  };

  useMemo(() => {
    setEnableReferee(fiterIsEntryRefereeList(getCups, selectedClasses.id));
  }, [selectedClasses.id]);

  useMemo(() => {
    console.log(selectedCup);
    if (!getCups.length || selectedCup.cupId === undefined) {
      return;
    }
    setEnableClasses(filterIsEntryGamesList(getCups[selectedCup.index]));
    console.log(filterIsEntryGamesList(getCups[selectedCup.index]));
  }, [selectedCup]);

  useMemo(() => {
    if (!getCups.length) {
      return;
    }
    rankBoardReadDatas("rankingboard");
  }, [getCups]);

  useMemo(() => {
    if (!enableClasses || !getCups.length || !enableReferee) {
      return;
    }
    console.log(selectedClasses.index);
    setDemoProps({
      cupId: selectedCup.cupId,
      gamesCategoryId: selectedClasses.id,
      players: [...enableClasses[selectedClasses.index].class.players],
      playersLength: [...enableClasses[selectedClasses.index].class.players]
        .length,

      cupData: { ...getCups[selectedCup.index] },
      gameData: { ...enableClasses[selectedClasses.index] },
      classTitle: selectedClasses.classTitle,
      refereeLength: enableReferee.refereeLength,
      refereeTotal: [...enableReferee.refereeTotal],
    });
  }, [selectedCup, selectedClasses.classTitle]);

  useEffect(() => {
    if (!getCupDatasWithState.data.length) {
      return;
    }
    setGetCups([...getCupDatasWithState.data]);
  }, [getCupDatasWithState.data]);

  useMemo(() => {
    if (!demoProps.cupId) {
      return;
    }

    console.log("demo", demoProps);
  }, [demoProps]);

  useMemo(() => {
    if (!getRankBoard.length) {
      return;
    }
    console.log(
      demoProps.cupId,
      demoProps.gamesCategoryId,
      demoProps.classTitle
    );
    const fiterByClasses = getRankBoard.filter(
      (filter) =>
        filter.refCupId === demoProps.cupId &&
        filter.refGameId === demoProps.gamesCategoryId &&
        filter.refClassTitle === demoProps.classTitle
    );

    const uniqueClassTitles = new Set(
      fiterByClasses.map((result) => result.refClassTitle)
    );
    const uniqueClassTitleArray = Array.from(uniqueClassTitles);
    console.log(uniqueClassTitleArray);
    setEnableReportList(fiterByClasses);
    console.log(fiterByClasses);
    setIsLoading(false);
  }, [getRankBoard, selectedClasses]);

  useMemo(() => {
    if (!enableReportList.length) {
      return;
    }
    console.log("지금 제일 중요", enableReportList);
    const sortedArray = enableReportList.sort((a, b) => {
      if (a.playerNumber !== b.playerNumber) {
        return a.playerNumber - b.playerNumber; // playerNumber 오름차순 정렬
      } else {
        return a.refSeatIndex - b.refSeatIndex; // playerNumber가 같을 경우 refSeatIndex 오름차순 정렬
      }
    });
    setReportListSort([...sortedArray]);
    const groupByPlayerNumber = (players) =>
      players.reduce((result, player) => {
        // playerNumber를 기준으로 그룹화된 객체를 생성
        const group = result[player.playerNumber] || [];
        // 그룹에 현재 player 객체를 추가
        group.push(player);
        // 그룹화된 객체를 result 객체에 추가
        return { ...result, [player.playerNumber]: group };
      }, {});
    console.log(groupByPlayerNumber(enableReportList));
  }, [enableReportList]);

  useMemo(() => console.log(selectedClasses), [selectedClasses]);

  return (
    <div className="flex w-full flex-col justify-start h-screen items-center px-5">
      {isLoading && "로딩중...."}
      {getCups.length && (
        <div className="flex w-full h-20 bg-white">
          <div className="flex w-1/3 flex-col">
            <div className="flex w-full h-20 gap-x-2">
              {getCups.map((cup, cIdx) => (
                <div className="flex h-20 justify-center items-center text-white gap-1">
                  {selectedCup.index === cIdx ? (
                    <button
                      className="flex bg-white text-blue-800 py-3 px-5 rounded-md border border-blue-800 hover:bg-white hover:text-blue-800"
                      onClick={() =>
                        setSelectedCup({ cupId: cup.id, index: cIdx })
                      }
                    >
                      {cup.cupInfo.cupName}
                    </button>
                  ) : (
                    <button
                      className="flex bg-blue-600 py-3 px-5 rounded-md border border-green-800 hover:bg-white hover:text-blue-800"
                      onClick={() =>
                        setSelectedCup({ cupId: cup.id, index: cIdx })
                      }
                    >
                      {cup.cupInfo.cupName}
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-start items-start h-full gap-x-1">
              <div className="flex w-72 gap-x-2 flex-wrap">
                <div className="flex w-full flex-wrap gap-1">
                  {getRankBoard &&
                    enableClasses.map((classes, cIdx) => (
                      <div className="flex justify-center items-center text-white text-sm">
                        {selectedClasses.index === cIdx ? (
                          <button
                            className="flex w-32 bg-white text-pink-800 py-1 px-2 rounded-md border border-pink-800 hover:bg-white hover:text-pink-800"
                            onClick={() =>
                              setSelectedClasses({
                                id: classes.id,
                                index: cIdx,
                                classTitle: classes.classTitle,
                              })
                            }
                          >
                            <div className="flex flex-col">
                              <h3>{classes.gameTitle}</h3>
                              <h3>{classes.classTitle}</h3>
                            </div>
                          </button>
                        ) : (
                          <button
                            className="flex w-32 bg-pink-600 py-1 px-2 rounded-md border border-pink-800 hover:bg-white hover:text-pink-800"
                            onClick={() =>
                              setSelectedClasses({
                                id: classes.id,
                                index: cIdx,
                                classTitle: classes.classTitle,
                              })
                            }
                          >
                            <div className="flex flex-col">
                              <h3>{classes.gameTitle}</h3>
                              <h3>{classes.classTitle}</h3>
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex w-32 h-full gap-x-1 flex-col items-start gap-1 justify-start "></div>
            </div>
          </div>
          {reportListSort.length && (
            <div className="flex flex-col w-full h-full">
              {reportListSort.map((report, idx) => (
                <div className="flex">{report.playerNumber}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminReport;
