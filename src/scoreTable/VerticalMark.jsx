import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const titleList = [
  "외관의 이미지",
  "신체의 대칭미",
  "포징 및 표현력",
  "복장선택 및 용품의조화",
  "가산점",
];
const scoreRange = [1, 2, 3, 4, 5, 6];
const playerRange = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109];
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

const VerticalMark = () => {
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

  const handleScoreBoard = (e, name, number, uid, title, pIdx) => {
    setPlayerArrayIndex((prev) => (prev = pIdx));
    let dummy = [...scoreBoardArray];
    const scoreData = {
      playerName: name,
      playerNumber: number,
      playerUid: uid,
      score: {
        ...scoreBoardArray[pIdx].score,
        [title]: e.target.value,
      },
    };
    dummy.splice(pIdx, 1, scoreData);
    setScoreBoardArray((prev) => (prev = dummy));
    //setScoreBoard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePreSumScore = (playerArrayIndex) => {
    console.log(playerArrayIndex);
    let dummy = [...sumScoreArray];
    if (
      playerArrayIndex === undefined ||
      scoreBoardArray[playerArrayIndex].score === undefined
    ) {
      return 0;
    } else {
      const pickScore = Object.values(scoreBoardArray[playerArrayIndex].score);
      const sumScore = pickScore.reduce((acc, cur) => {
        return Number(acc) + Number(cur);
      }, 0);

      if (scoreBoardArray[playerArrayIndex].score === undefined) {
        dummy[playerArrayIndex].push(sumScore);
      } else {
        dummy.splice(playerArrayIndex, 1, sumScore);
      }
    }
    setSumScoreArray((prev) => (prev = [...dummy]));
  };

  const initScore = (pIdx) => {
    let dummy = [...scoreBoardArray];
    let dummyScore = {};

    titleList.map((title, index) => {
      dummyScore = { ...dummyScore, [title]: 0 };
    });

    dummy[pIdx].score = dummyScore;
    setScoreBoardArray([...dummy]);
  };

  const initScoreBorad = () => {
    let dummy = [];
    let dummyScore = {};
    let dummySum = [];

    titleList.map((title, index) => {
      dummyScore = { ...dummyScore, [title]: 0 };
    });

    playersArray.map((item, idx) => {
      const player = {
        playerUid: item.playerUid,
        playerName: item.playerName,
        playerNumber: item.playerNumber,
        score: dummyScore,
      };
      dummy.push(player);
      dummySum.push(0);
    });

    setScoreBoardArray(dummy);
    setSumScoreArray(dummySum);
  };

  useEffect(() => {
    handlePreSumScore(playerArrayIndex);
  }, [scoreBoardArray]);

  useMemo(() => initScoreBorad(), []);
  useMemo(() => console.log(scoreBoardArray), []);
  return (
    scoreBoardArray.length > 0 && (
      <div className="flex w-full justify-start items-center flex-col gap-y-2">
        {scrollPosition > 60 ? (
          <div
            className="flex rounded-md gap-x-2 sticky bg-green-400 justify-center items-center w-full transition-opacity ease-in-out "
            style={{ top: "100px", height: "50px" }}
          >
            <div className="flex w-20 h-10 justify-center items-center bg-white rounded-lg ">
              <span className="text-sm">선수번호</span>
            </div>
            {titleList.map((title, idx) => (
              <div
                className="flex h-10 justify-center items-center bg-white rounded-lg "
                style={{ width: `calc(38rem / ${titleList.length} )` }}
              >
                <span className="text-xs">{title}</span>
              </div>
            ))}
            <div className="flex w-20 h-10 justify-center items-center bg-white rounded-lg ">
              <span className="text-sm">합계</span>
            </div>
          </div>
        ) : (
          <div
            className="flex w-full rounded-md gap-x-2 sticky bg-white justify-center items-center"
            style={{ top: "100px", height: "50px" }}
          >
            <div className="flex w-20 h-10 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
              <span className="text-sm">선수번호</span>
            </div>
            {titleList.map((title, idx) => (
              <div
                className="flex h-10 justify-center items-center bg-green-100 rounded-lg border border-gray-200"
                style={{ width: `calc(38rem / ${titleList.length} )` }}
              >
                <span className="text-xs">{title}</span>
              </div>
            ))}
            <div className="flex w-20 h-10 justify-center items-center bg-green-400 rounded-lg border border-gray-200">
              <span className="text-sm">합계</span>
            </div>
          </div>
        )}

        <div className="flex h-full rounded-md gap-y-2 flex-col w-full">
          {playersArray.map((player, pIdx) => (
            <div className="flex w-full h-full rounded-md gap-x-2">
              <div className="flex w-20 h-full flex-col gap-y-2 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                <span className="text-sm">{player.playerNumber}</span>
                <span className="text-sm">{player.playerName}</span>
                <button
                  className="flex justify-center items-center mt-10"
                  onClick={() => initScore(pIdx)}
                >
                  <span className="text-xs text-gray-500">초기화</span>
                </button>
              </div>
              {scoreBoardArray.length > 0 &&
                titleList.map((title) => (
                  <div
                    className="flex h-full justify-center items-center bg-white rounded-lg border border-gray-200 flex-wrap p-1 gap-1"
                    style={{ width: `calc(38rem / ${titleList.length} )` }}
                  >
                    {scoreRange.map((score, sIdx) => (
                      <button
                        key={`btn-${sIdx}`}
                        className={
                          scoreBoardArray[pIdx].score === undefined
                            ? "flex flex-col justify-center items-center w-10 h-10 rounded-lg border-green-300 border cursor-pointer"
                            : Number(scoreBoardArray[pIdx].score[title]) ===
                              score
                            ? "flex flex-col justify-center items-center w-10 h-10 rounded-lg border-green-300 border cursor-pointer bg-green-500 text-white font-semibold"
                            : "flex flex-col justify-center items-center w-10 h-10 rounded-lg border-green-300 border cursor-pointer"
                        }
                      >
                        <input
                          key={`rd-${sIdx}`}
                          type="radio"
                          className="hidden"
                          name={`${player.playerUid}_${title}_${sIdx + 1}`}
                          id={`${player.playerUid}_${title}_${sIdx + 1}`}
                          value={sIdx + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handleScoreBoard(
                              e,
                              player.playerName,
                              player.playerNumber,
                              player.playerUid,
                              title,
                              pIdx
                            );
                          }}
                        />

                        <label
                          key={`lbl-${sIdx}`}
                          htmlFor={`${player.playerUid}_${title}_${sIdx + 1}`}
                          className="flex justify-center items-center w-full h-16 cursor-pointer"
                        >
                          <span>{score}</span>
                        </label>
                      </button>
                    ))}
                  </div>
                ))}

              <div className="flex w-20 justify-center items-center bg-green-400 rounded-lg border border-gray-200">
                <button>
                  <span className="font-semibold text-2xl">
                    {sumScoreArray[pIdx]}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default VerticalMark;
