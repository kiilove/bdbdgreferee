import React from "react";
import { RiLock2Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";

import { ManualRankScoreContext } from "../../context/ManualRankScoreContext";
import { useFirestoreAddData } from "../../customHooks/useFirestores";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";

const ManualRankingBoard = ({ getInfo, judgeIndex }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scoreCardPlayers, setScoreCardPlayers] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);
  const [scoreEndPlayers, setScoreEndPlayers] = useState([]);
  const [scoreOwners, setScoreOwners] = useState([]);
  const [error, setError] = useState("");

  const { manualRankScore, setManualRankScore } = useContext(
    ManualRankScoreContext
  );
  const generateDocuId = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now().toString().substr(-4);
    const extraString = Math.random().toString(36).substring(2, 8);
    const id = `${randomString}-${timestamp}-${extraString}`.toUpperCase();
    return id;
  };

  const addData = async (collectionName, newData, callback) => {
    try {
      const dbBatch = writeBatch(db);

      newData.forEach((data) => {
        const docRef = doc(collection(db, collectionName));
        dbBatch.set(docRef, { ...data, docuId: generateDocuId() });
      });
      await dbBatch.commit();
      callback && callback();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  const initRankBoard = () => {
    let dummy = [];
    let dummySelected = [];

    setScoreCards([]);
    setScoreEndPlayers([]);
    setScoreOwners([]);
    console.log(getInfo);

    getInfo.players?.length &&
      getInfo.players.map((item, idx) => {
        const player = {
          playerUid: item.id,
          playerName: item.contestPlayerName,
          playerNumber: item.contestPlayerNumber,
          playerRank: 0,
          judgeUid: judgeIndex,
          refCupId: getInfo.contestId,
          refGameId: getInfo.categoryId,
          refGameTitle: getInfo.categoryTitle,
          refClassTitle: getInfo.gradeTitle,
          refSeatIndex: judgeIndex,
        };

        const selected = {
          value: idx + 1,
          selected: false,
          locked: false,
          owner: "",
        };
        dummy.push(player);
        dummySelected.push(selected);
      });

    setScoreCards([...dummy]);
    setScoreOwners([...dummySelected]);

    const range = Array.from({ length: dummy.length }, (_, i) => i + 1);
  };

  useEffect(() => {
    if (getInfo.players?.length) {
      initRankBoard();
    }
  }, [getInfo]);

  const handleScoreCard = (oIdx, value, playerUid, judgeIndex) => {
    console.log({ oIdx, value, playerUid, judgeIndex });
    const newScoreCards = [...scoreCards];
    const indexPlayerFromScoreCards = newScoreCards.findIndex(
      (scoreCard) =>
        scoreCard.playerUid === playerUid && scoreCard.judgeUid === judgeIndex
    );
    const newScoreCard = {
      ...newScoreCards[indexPlayerFromScoreCards],
      playerRank: value,
      judgeUid: judgeIndex,
    };

    newScoreCards.splice(indexPlayerFromScoreCards, 1, newScoreCard);
    setScoreCards([...newScoreCards]);

    console.log(newScoreCards);
    console.log(indexPlayerFromScoreCards);
    console.log(scoreCards);
  };

  const handleManualRankScore = () => {
    if (manualRankScore?.length) {
      const newManualRankScore = [...manualRankScore];
      scoreCards.map((scoreCard, sIdx) => newManualRankScore.push(scoreCard));
    }
  };
  useMemo(() => {
    handleManualRankScore();
  }, [scoreCards]);

  useEffect(() => {
    initRankBoard();
  }, [judgeIndex]);

  return (
    <div className="flex w-full justify-start items-start mb-44 flex-col">
      <div
        className="flex justify-start flex-col w-full"
        style={{ maxWidth: "850px" }}
      >
        <div className="flex w-full justify-start items-center flex-col gap-y-2">
          {scrollPosition > 40 ? (
            <div
              className="flex rounded-md gap-x-2 sticky bg-green-400 justify-center items-center w-full transition-opacity ease-in-out "
              style={{ top: "150px", height: "50px" }}
            >
              <div className="flex w-24 h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">선수번호</span>
              </div>
              <div className="flex w-24 h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">순위</span>
              </div>
              <div className="flex w-full h-10 justify-center items-center bg-white rounded-lg ">
                <span className="text-sm">순위선택</span>
              </div>
            </div>
          ) : (
            <div
              className="flex w-full rounded-md gap-x-2 sticky bg-white justify-center items-center"
              style={{ top: "150px", height: "50px" }}
            >
              <div className="flex w-24 h-10 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                <span className="text-sm">선수번호</span>
              </div>
              <div className="flex w-24 h-10 justify-center items-center bg-green-400 rounded-lg border border-gray-200">
                <span className="text-sm">순위</span>
              </div>
              <div className="flex w-full h-10 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                <span className="text-sm">순위선택</span>
              </div>
            </div>
          )}
          <div className="flex h-full rounded-md gap-y-2 flex-col w-full">
            {scoreCards.length > 0 &&
              scoreCards.map((rank, rIdx) => (
                <div className="flex w-full h-full rounded-md gap-x-2">
                  <div className="flex w-24 flex-col gap-y-2 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                    <span className="text-4xl font-semibold">
                      {rank.playerNumber}
                    </span>
                  </div>
                  <div className="flex w-24 font-semibold justify-center items-center bg-green-400 rounded-lg border border-gray-200">
                    {rank.playerRank === 0 ? (
                      <span className="text-4xl"></span>
                    ) : rank.playerRank >= 1 && rank.playerRank < 100 ? (
                      <span className="text-4xl">{rank.playerRank}</span>
                    ) : (
                      <span className="text-base">제외</span>
                    )}
                  </div>
                  <div className="flex w-full h-full justify-center items-center bg-white rounded-lg border border-gray-200 flex-wrap p-1 gap-1">
                    <div className="flex w-full h-full flex-wrap gap-2">
                      {scoreOwners.length &&
                        scoreOwners.map((owner, oIdx) => (
                          <button
                            className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black bg-yellow-300 text-2xl"
                            value={parseInt(owner.value)}
                            onClick={() =>
                              handleScoreCard(
                                oIdx,
                                owner.value,
                                rank.playerUid,
                                judgeIndex
                              )
                            }
                          >
                            {owner.value}
                          </button>
                        ))}
                      <button
                        className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black bg-yellow-300 text-2xl"
                        value={parseInt(100)}
                        onClick={() =>
                          handleScoreCard(100, 100, rank.playerUid, judgeIndex)
                        }
                      >
                        <span className="text-base">제외</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex h-full rounded-md w-full bg-green-200 py-2 justify-end items-center ">
            <button
              className="w-24 h-12 bg-green-500 rounded-lg mr-2"
              onClick={() => addData("manual_rankingboard", scoreCards)}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualRankingBoard;
