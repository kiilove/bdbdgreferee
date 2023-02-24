import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const playersArray = [
  { playerUid: "12346", playerName: "추성훈", gender: "m", playerNumber: 104 },
  { playerUid: "12587", playerName: "윤성빈", gender: "m", playerNumber: 108 },
  { playerUid: "14557", playerName: "양학선", gender: "m", playerNumber: 127 },
  {
    playerUid: "22515",
    playerName: "에이전트H",
    gender: "m",
    playerNumber: 163,
  },
  { playerUid: "10887", playerName: "홍범석", gender: "m", playerNumber: 194 },
  {
    playerUid: "12656",
    playerName: "야전삽짱재",
    gender: "m",
    playerNumber: 231,
  },
  { playerUid: "34524", playerName: "심으뜸", gender: "f", playerNumber: 54 },
  { playerUid: "12461", playerName: "김강민", gender: "m", playerNumber: 13 },
  { playerUid: "12312", playerName: "송아름", gender: "f", playerNumber: 677 },
  { playerUid: "32587", playerName: "차현승", gender: "m", playerNumber: 43 },
  { playerUid: "52557", playerName: "강한", gender: "m", playerNumber: 19 },
  { playerUid: "72524", playerName: "손희동", gender: "m", playerNumber: 119 },
  { playerUid: "16524", playerName: "깡미", gender: "m", playerNumber: 196 },
];

const VerticalRank = () => {
  const [scoreBoardArray, setScoreBoardArray] = useState([]);
  const [sumScoreArray, setSumScoreArray] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [playerArrayIndex, setPlayerArrayIndex] = useState();

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  console.log(scrollPosition);
  return (
    <div className="flex w-full justify-start items-center flex-col gap-y-2 h-full">
      {scrollPosition > 60 ? (
        <div
          className="flex rounded-md gap-x-2 sticky bg-green-400 justify-center items-center w-full transition-opacity ease-in-out "
          style={{ top: "100px", height: "50px" }}
        >
          <div className="flex w-32 h-10 justify-center items-center bg-white rounded-lg ">
            <span className="text-sm">선수번호</span>
          </div>
          <div className="flex w-32 h-10 justify-center items-center bg-white rounded-lg ">
            <span className="text-sm">선수번호</span>
          </div>
        </div>
      ) : (
        <div
          className="flex rounded-md gap-x-2 sticky bg-red-200 justify-center items-center w-full transition-opacity ease-in-out "
          style={{ top: "100px", height: "50px" }}
        >
          <div className="flex w-32 h-10 justify-center items-center bg-white rounded-lg ">
            <span className="text-sm">선수번호</span>
          </div>
          <div className="flex w-32 h-10 justify-center items-center bg-white rounded-lg ">
            <span className="text-sm">순위</span>
          </div>
        </div>
      )}
      <div className="flex w-full">
        <div className="flex w-1/3">영문</div>
        <div className="flex flex-col h-full w-1/3">
          {playersArray.map((player, pIdx) => (
            <div className="flex h-32 w-20">{player.playerNumber}</div>
          ))}
        </div>
        <div className="flex w-1/3">국문</div>
      </div>
    </div>
  );
};

export default VerticalRank;
