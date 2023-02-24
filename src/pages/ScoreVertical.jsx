import React from "react";
import VerticalMark from "../scoreTable/VerticalMark";

const ScoreVertical = () => {
  return (
    <div className="flex w-full justify-center items-start mb-44">
      <div
        className="flex justify-center flex-col w-full"
        style={{ maxWidth: "800px" }}
      >
        <div
          className="flex w-full gap-x-5 sticky top-0"
          style={{ height: "100px" }}
        >
          <div className="flex w-full bg-slate-100 p-1 rounded-lg justify-between flex-wrap gap-y-2">
            <div className="flex w-2/5 flex-col gap-y-2 p-1">
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  대회명 : <span>경기용인시보디빌딩대회 13회</span>
                </p>
              </div>
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  장소 : <span>용인시 실내체육관</span>
                </p>
              </div>
            </div>
            <div className="flex w-2/5 flex-col gap-y-2 p-1">
              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  심사종목 : <span>남자 청바지 핏</span>
                </p>
              </div>

              <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
                <p className="text-white text-sm">
                  일자 : <span>2023-04-04</span>
                </p>
              </div>
            </div>
            <div className="flex w-1/5 flex-col p-1">
              <div className="flex w-full h-full bg-slate-800 p-2 rounded-lg justify-start items-center flex-col gap-y-1">
                <p className="text-white text-sm">좌석번호</p>
                <div className="flex bg-slate-400 w-full h-full rounded-lg justify-center items-center">
                  <span className=" text-2xl font-bold">9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-full">
          <VerticalMark />
        </div>
      </div>
    </div>
  );
};

export default ScoreVertical;
