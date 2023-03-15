import { where } from "firebase/firestore";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useFirestore from "../../customHooks/useFirestore";
import useFirestoreSearch from "../../customHooks/useFirestoreSearch";
import ScoreVertical from "../ScoreVertical";

const AdminScore = () => {
  const [getCups, setGetCups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCup, setSelectedCup] = useState({});
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectedReferee, setSelectedReferee] = useState({});
  const [enableReferee, setEnableReferee] = useState([]);
  const [enableClasses, setEnableClasses] = useState([]);
  const [demoProps, setDemoProps] = useState({});

  const { data: getAdminData, readData: cupReadDatas } = useFirestore();
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

    const filteredAssigns = category.refereeAssign.filter(
      (assign) =>
        assign &&
        assign.refUid &&
        assign.refUid !== "" &&
        assign.gameId === data.id
    );

    return filteredAssigns;
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
    setIsLoading(false);
  }, [getCups]);

  useMemo(() => {
    if (!enableClasses || !getCups.length || !enableReferee) {
      return;
    }
    setDemoProps({
      cupId: selectedCup.cupId,
      gamesCategoryId: selectedClasses.id,
      refUid: selectedReferee.refUid,
      players: [...enableClasses[selectedClasses.index].class.players],
      cupData: { ...getCups[selectedCup.index] },
      gameData: { ...enableClasses[selectedClasses.index] },
      referee: { ...enableReferee[selectedReferee.index] },
      seatIndex: selectedReferee.index + 1,
    });
  }, [selectedCup, selectedClasses, selectedReferee]);

  useEffect(() => {
    if (!getCupDatasWithState.data.length) {
      return;
    }
    setGetCups([...getCupDatasWithState.data]);
  }, [getCupDatasWithState.data]);

  return (
    <div className="flex w-full flex-col justify-start h-screen items-center px-5">
      {isLoading && "로딩중...."}
      {getCups.length && (
        <div className="flex w-full h-20 bg-white">
          <div className="flex w-1/3 flex-col">
            <div className="flex w-full h-20 gap-x-2">
              {getCups.map((cup, cIdx) => (
                <div className="flex h-20 justify-center items-center text-white">
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
                  {enableClasses &&
                    enableClasses.map((classes, cIdx) => (
                      <div className="flex justify-center items-center text-white text-sm">
                        {selectedClasses.index === cIdx ? (
                          <button
                            className="flex w-32 bg-white text-pink-800 py-1 px-2 rounded-md border border-pink-800 hover:bg-white hover:text-pink-800"
                            onClick={() =>
                              setSelectedClasses({
                                id: classes.id,
                                index: cIdx,
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
              <div className="flex w-32 h-full gap-x-1 flex-col items-start gap-1 justify-start ">
                {enableReferee &&
                  enableReferee.map((referee, rIdx) => (
                    <div className="flex h-full justify-center items-center text-white">
                      {selectedReferee.index === rIdx ? (
                        <button
                          className="flex w-32 bg-white text-green-800 py-3 px-5 rounded-md border border-green-800 hover:bg-white hover:text-green-800"
                          onClick={() =>
                            setSelectedReferee({
                              refUid: referee.refUid,
                              index: rIdx,
                            })
                          }
                        >
                          {referee.refName}
                        </button>
                      ) : (
                        <button
                          className="flex w-32 bg-green-600 py-3 px-5 rounded-md border border-green-800 hover:bg-white hover:text-green-800"
                          onClick={() =>
                            setSelectedReferee({
                              refUid: referee.refUid,
                              index: rIdx,
                            })
                          }
                        >
                          {referee.refName}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {selectedReferee.refUid && demoProps && (
            <div className="flex w-full h-full ">
              <ScoreVertical getInfo={demoProps} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminScore;
