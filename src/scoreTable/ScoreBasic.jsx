import React, { useEffect, useState } from "react";

const titleList = [
  "외관의 이미지",
  "신체의 대칭미",
  "포징 및 표현력",
  "복장 선택 및 용품의 조화",
];
const scoreRange = [1, 2, 3, 4, 5, 6];

const ScoreBasic = () => {
  const [scoreBoard, setScoreBoard] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const handleScoreBoard = (e) => {
    console.log(e.target.value);
    setScoreBoard((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSumScore = (scores) => {
    const sumScore = scores.reduce((acc, cur, idx) => {
      return Number(acc) + Number(cur);
    }, 0);

    setTotalScore((prev) => (prev = sumScore));
  };

  useEffect(() => {
    console.log(scoreBoard);
    const pickScore = Object.values(scoreBoard);
    pickScore.length && handleSumScore(pickScore);
  }, [scoreBoard]);

  return (
    <div className="flex w-full h-full justify-start items-start flex-col">
      <div className="flex w-full justify-between">
        <div className="flex h-full flex-col justify-start items-start gap-y-2">
          {titleList.map((title, tIdx) => (
            <div className="flex w-full gap-x-2">
              <div className="flex h-18 p-2 border border-green-200 rounded-md gap-x-2">
                <div className="flex w-40 justify-center items-center bg-gray-200 rounded-lg border border-gray-200">
                  <span className="text-sm">{title}</span>
                </div>
                <div className="flex h-full justify-start items-center gap-x-2 rounded-lg">
                  {scoreRange.map((score, sIdx) => (
                    <button
                      key={`btn-${sIdx}`}
                      className={
                        Number(scoreBoard[title]) === score
                          ? "flex flex-col justify-center items-center w-20 rounded-lg border-green-300 border cursor-pointer bg-green-500 text-white font-semibold"
                          : "flex flex-col justify-center items-center w-20 rounded-lg border-green-300 border cursor-pointer"
                      }
                    >
                      <input
                        key={`rd-${sIdx}`}
                        type="radio"
                        className="hidden"
                        name={title}
                        id={`${title}_${sIdx + 1}`}
                        value={sIdx + 1}
                        onChange={(e) => {
                          e.preventDefault();
                          handleScoreBoard(e);
                        }}
                      />

                      <label
                        key={`lbl-${sIdx}`}
                        htmlFor={`${title}_${sIdx + 1}`}
                        className="flex justify-center items-center w-full h-16 cursor-pointer"
                      >
                        <span>{score}</span>
                      </label>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex w-24 h-18 p-2 border border-green-200 rounded-md gap-x-2">
                <div className="flex w-20 justify-center items-center bg-green-200 rounded-lg border border-gray-200">
                  <span className="font-semibold">{scoreBoard[title]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col h-full gap-y-2">
          <div className="flex flex-col h-full">
            <div
              className="flex w-full h-16 justify-center items-center rounded-t-md bg-green-500 border-b border-green-200"
              style={{ minWidth: "168px" }}
            >
              <span className="text-2xl text-white">합 계</span>
            </div>
            <div
              className="flex w-full h-28 justify-center items-center rounded-b-md bg-green-500"
              style={{ minWidth: "118px" }}
            >
              <span className="text-5xl text-white font-semibold">
                {totalScore}
              </span>
            </div>
          </div>
          <div className="flex w-full">
            <button className="w-full h-20 bg-green-200 rounded-lg">
              <span className="text-lg font-semibold">서 명</span>
            </button>
          </div>
          <div className="flex w-full mt-1">
            <button className="w-full h-20 bg-cyan-500 rounded-lg">
              <span className="text-lg font-semibold text-white">제 출</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBasic;
