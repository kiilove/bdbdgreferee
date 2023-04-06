import React from "react";
import ScoreHeader from "../components/ScoreHeader";
import { RiLock2Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { RankingBoardContext } from "../context/RankingBoardContext";

const RankingBoard = ({ getInfo, selectedType }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scoreCardPlayers, setScoreCardPlayers] = useState([]);
  const [scoreCards, setScoreCards] = useState([]);
  const [scoreEndPlayers, setScoreEndPlayers] = useState([]);
  const [scoreOwners, setScoreOwners] = useState([]);

  const { dispatch: rankDispatch } = useContext(RankingBoardContext);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  const initForPlayer = (playerUid) => {
    const updatedOwners = scoreOwners.map((rank) => {
      if (rank.owner === playerUid) {
        rank.owner = "";
        rank.selected = false;
      }
      return rank;
    });

    const updatedScoreCards = scoreCards.map((card) => {
      if (card.playerUid === playerUid) {
        card.playerRank = 0;
      }
      return card;
    });
    const updatedScoreEnds = removeValue(scoreEndPlayers, playerUid);

    setScoreCards(updatedScoreCards);
    setScoreEndPlayers(updatedScoreEnds);
    setScoreOwners(updatedOwners);
  };

  const removeValue = (arr, value) => {
    return arr.filter((item) => item !== value);
  };
  const chkArrays = (grade, pUid) => {
    //채점 완료된 명단에 선수 있는지 찾기
    const findScoreEndPlayers = scoreEndPlayers.find(
      (filter) => filter === pUid
    );
    const findScoreEndPlayersIndex = scoreEndPlayers.findIndex(
      (filter) => filter === pUid
    );
    //입력된 등수에 오너가 있는지 확인
    const findScoreOwners = scoreOwners.find(
      (filter) => filter.value === parseInt(grade)
    );
    const findScoreOwnersIndex = scoreOwners.findIndex(
      (filter) => filter.value === parseInt(grade)
    );

    //입력된 선수 스코어카드 가져오기
    const findScoreCards = scoreCards.find(
      (filter) => filter.playerUid === pUid
    );

    const findScoreCardsIndex = scoreCards.findIndex(
      (filter) => filter.playerUid === pUid
    );

    return {
      scoreEnd: findScoreEndPlayers,
      scoreEndIndex: findScoreEndPlayersIndex,
      scoreOwner: findScoreOwners,
      scoreOwnerIndex: findScoreOwnersIndex,
      scoreCard: findScoreCards,
      scoreCardIndex: findScoreCardsIndex,
    };
  };

  const handleRankingBoard = (value, playerUid) => {
    // 현재 클릭된 선수의 정보를 정리한다.

    const scoreInfo = chkArrays(value, playerUid);

    // 1. 채점완료집단에 현재 선수 있는지부터 확인
    // != -1 => 있다면
    if (scoreInfo.scoreEndIndex !== -1) {
      // 1.1체크 현재 선수가 해당 등수의 오너인지 체크
      // 오너가 아니면 볼것도 없이 함수 종료
      if (
        scoreInfo.scoreOwner.owner !== playerUid ||
        scoreInfo.scoreOwner.owner === ""
      ) {
        return;
        // 1.2 오너라면 취소하고 다시 채점하기 위함이라고 판단하고 해당 선수 정보 초기화
      } else if (scoreInfo.scoreOwner.owner === playerUid) {
        // 점수표부터 수정
        // 스프레드로 수정하고 splice로 scoreCards 배열 정리
        const newScoreCard = { ...scoreInfo.scoreCard, playerRank: 0 };
        const prevScoreCards = [...scoreCards]; // state값이지 함수 리턴값이 아님
        prevScoreCards.splice(scoreInfo.scoreCardIndex, 1, newScoreCard);
        setScoreCards([...prevScoreCards]);

        // 점수 오너표에서 오너 삭제
        const newScoreOwner = {
          ...scoreInfo.scoreOwner,
          owner: "",
          selected: false,
        };
        const prevScoreOwners = [...scoreOwners]; // state값이지 함수 리턴값이 아님
        prevScoreOwners.splice(scoreInfo.scoreOwnerIndex, 1, newScoreOwner);
        setScoreOwners([...prevScoreOwners]);

        // 채점완료자에서 삭제
        const prevScoreEndPlayers = [...scoreEndPlayers];
        prevScoreEndPlayers.splice(scoreInfo.scoreEndIndex, 1);
        setScoreEndPlayers([...prevScoreEndPlayers]);
      }
    } else {
      // 2. 채점완료집단에 해당 선수가 없다면 부터 시작
      // 2-1 채점완료 집단에 없는데 이미 선택된 등수를 선택했다면 바로 리턴
      if (scoreInfo.scoreOwner.owner !== "") {
        return;
      } else {
        // 신규 채점자라고 판단하고 해당 등수 오너로 설정
        // 점수표부터 수정
        // 스프레드로 수정하고 splice로 scoreCards 배열 정리

        const newScoreCard = {
          ...scoreInfo.scoreCard,
          playerRank: parseInt(value),
        };

        const prevScoreCards = [...scoreCards]; // state값이지 함수 리턴값이 아님
        prevScoreCards.splice(scoreInfo.scoreCardIndex, 1, newScoreCard);
        setScoreCards([...prevScoreCards]);

        // 점수 오너표에서 오너 추가
        const newScoreOwner = {
          ...scoreInfo.scoreOwner,
          owner: playerUid,
          selected: true,
        };
        const prevScoreOwners = [...scoreOwners]; // state값이지 함수 리턴값이 아님
        prevScoreOwners.splice(scoreInfo.scoreOwnerIndex, 1, newScoreOwner);
        setScoreOwners([...prevScoreOwners]);

        // 채점완료자에서 추가
        const prevScoreEndPlayers = [...scoreEndPlayers];
        prevScoreEndPlayers.push(playerUid);
        setScoreEndPlayers([...prevScoreEndPlayers]);
      }
    }
  };

  const initRankBoard = () => {
    let dummy = [];
    let dummySelected = [];

    setScoreCards([]);
    setScoreEndPlayers([]);
    setScoreOwners([]);

    getInfo.players.map((item, idx) => {
      const player = {
        playerUid: item.pId,
        playerName: item.pName,
        playerNumber: idx + 1,
        playerRank: 0,
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
    initRankBoard();
  }, [getInfo]);

  const makeScoreCard = () => {
    let dummy = [];
    scoreCards.map((rank) => {
      const flatByPlayer = {
        ...rank,
        refrefereeUid: getInfo.referee.refUid,
        refCupId: getInfo.cupId,
        refGameId: getInfo.gamesCategoryId,
        refGameTitle: getInfo.gameData.gameTitle,
        refClassTitle: getInfo.gameData.classTitle,
        refSeatIndex: getInfo.seatIndex,
      };
      dummy.push(flatByPlayer);
    });
    return dummy;
  };
  useMemo(() => {
    const scoreCardArray = makeScoreCard();
    rankDispatch({ type: "NEW", payload: scoreCardArray });
  }, [scoreCards]);

  useEffect(() => {
    console.log(getInfo);
  }, [getInfo]);

  return (
    <div className="flex w-full justify-start items-start mb-44 flex-col">
      <div
        className="flex justify-start flex-col w-full"
        style={{ maxWidth: "850px" }}
      >
        <ScoreHeader getInfo={getInfo} />

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
                    <span className="text-4xl">
                      {rank.playerRank === 0 ? "" : rank.playerRank}
                    </span>
                  </div>
                  <div className="flex w-full h-full justify-center items-center bg-white rounded-lg border border-gray-200 flex-wrap p-1 gap-1">
                    <div className="flex w-full h-full flex-wrap gap-2">
                      {scoreEndPlayers.includes(rank.playerUid) ? (
                        <div className="flex h-12 w-full justify-center items-center flex-col">
                          <button
                            className="w-36 h-full "
                            onClick={() => initForPlayer(rank.playerUid)}
                          >
                            <div className="flex w-full flex-col justify-center items-center">
                              <RiLock2Fill className="text-2xl text-green-700" />
                              <span className="text-sm text-green-800">
                                잠금해제
                              </span>
                            </div>
                          </button>
                        </div>
                      ) : (
                        scoreOwners.length &&
                        scoreOwners.map((owner, oIdx) =>
                          rank.playerUid === owner.owner ? (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center bg-green-500 text-black"
                              value={parseInt(owner.value)}
                              onClick={(e) =>
                                handleRankingBoard(
                                  e.target.value,
                                  rank.playerUid
                                )
                              }
                            >
                              {owner.value}
                            </button>
                          ) : owner.selected ? (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black"
                              disabled
                            >
                              <RiLock2Fill className="text-gray-500" />
                            </button>
                          ) : (
                            <button
                              className="flex w-14 h-14 p-2 rounded-md border border-green-300 justify-center items-center text-black bg-yellow-300 text-2xl"
                              value={parseInt(owner.value)}
                              onClick={(e) =>
                                handleRankingBoard(
                                  e.target.value,
                                  rank.playerUid
                                )
                              }
                            >
                              {owner.value}
                            </button>
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
