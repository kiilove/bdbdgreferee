import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import VerticalMark from "../scoreTable/VerticalMark";
import VerticalRank from "../scoreTable/VerticalRank";

const RankVertical = (getInfo, selectedType) => {
  const [scoreData, setScoreData] = useState([]);
  const [scoreBoardType, setScoreBoardType] = useState(selectedType);

  return (
    <div className="flex w-full justify-start items-start mb-44">
      <div
        className="flex justify-start flex-col w-full"
        style={{ maxWidth: "800px" }}
      >
        <div
          className="flex w-full gap-x-5 sticky top-0"
          style={{ height: "150px" }}
        >
          <div className="flex w-full bg-slate-100 p-1 rounded-lg justify-between flex-wrap gap-y-2">
            <div className="flex w-2/5 flex-col gap-y-2 p-1">
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  대회명 :{" "}
                  <span>{getInfo.getInfo.cupData.cupInfo.cupName}</span>
                </p>
              </div>
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  장소 :{" "}
                  <span>{getInfo.getInfo.cupData.cupInfo.cupLocation}</span>
                </p>
              </div>
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  심판 : <span>{getInfo.getInfo.referee.refName}</span>
                </p>
              </div>
            </div>
            <div className="flex w-2/5 flex-col gap-y-2 p-1">
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  심사종목 :{" "}
                  <span>
                    {getInfo.getInfo.gameData.gameTitle} /{" "}
                    {getInfo.getInfo.gameData.classTitle}
                  </span>
                </p>
              </div>

              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  일자 :{" "}
                  <span>
                    {dayjs(
                      getInfo.getInfo.cupData.cupInfo.cupDate.startDate
                    ).format("YYYY-MM-DD")}
                  </span>
                </p>
              </div>
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  좌석번호 : <span>{getInfo.getInfo.seatIndex}</span>
                </p>
              </div>
            </div>
            <div className="flex w-1/5 flex-col p-1">
              <div className="flex w-full h-full bg-slate-800 p-2 rounded-lg justify-start items-center flex-col gap-y-1">
                <div className="flex bg-slate-400 w-full h-full rounded-lg justify-center items-center">
                  <span className=" text-2xl font-bold">서명</span>
                </div>
                <div className="flex bg-slate-400 w-full h-full rounded-lg justify-center items-center">
                  <span className=" text-2xl font-bold">제출</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full">
          <VerticalRank
            order={[...getInfo.getInfo.players]}
            referee={getInfo.getInfo.referee}
          />
        </div>
      </div>
    </div>
  );
};

export default RankVertical;
