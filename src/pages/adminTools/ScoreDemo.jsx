import {
  Firestore,
  where,
  get,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import React, { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/Header";
import useFirestore from "../../customHooks/useFirestore";
import useFirestoreSearch from "../../customHooks/useFirestoreSearch";
import { db } from "../../firebase";
import RankingBoard from "../RankingBoard";
import ScoreVertical from "../ScoreVertical";
import RankingBoardDemo from "../RankingBoardDemo";

const ScoreDemo = () => {
  const [getCups, setGetCups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("랭킹형");
  const [selectedCup, setSelectedCup] = useState({});
  const [selectedClasses, setSelectedClasses] = useState({});
  const [selectedReferee, setSelectedReferee] = useState({});
  const [enableReferee, setEnableReferee] = useState([]);
  const [enableClasses, setEnableClasses] = useState([]);
  const [demoProps, setDemoProps] = useState({});
  const [refereeExists, setRefereeExists] = useState(false);

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
    console.log(getCups);
    if (!getCups.length) {
      return;
    }
    setIsLoading(false);
  }, [getCups]);

  useMemo(() => {
    if (!enableClasses || !getCups.length || !enableReferee) {
      return;
    }
    console.log(selectedCup.cupId);
    setDemoProps({
      cupId: "1fdTzo2FdJDl4JYgC7KK",
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
    console.log(getCupDatasWithState.data);
    if (!getCupDatasWithState.data.length) {
      return;
    }
    setGetCups([...getCupDatasWithState.data]);
  }, [getCupDatasWithState.data]);

  const isScoredReferee = async (refUid, refCupId, refGameId) => {
    const q = query(
      collection(db, "rankingboard"),
      where("refCupId", "==", refCupId),
      where("refGameId", "==", refGameId),
      where("refrefereeUid", "==", refUid)
    );

    const rankSnapshot = await getDocs(q);
    console.log(refUid, refCupId, refGameId);
    return rankSnapshot.empty;
  };

  return (
    <div className="flex w-full flex-col justify-start h-screen items-center px-5">
      {isLoading && "로딩중...."}
      <div className="flex w-full h-20 justify-center">
        <Header />
      </div>
      <div className="flex">
        <RankingBoardDemo getInfo={demoProps} selectdType={selectedType} />
      </div>
    </div>
  );
};

export default ScoreDemo;
