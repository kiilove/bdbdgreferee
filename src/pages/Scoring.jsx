import React from "react";
import ProfileBasic from "../profiles/ProfileBasic";
import ProfileMini from "../profiles/ProfileMini";
import ScoreBasic from "../scoreTable/ScoreBasic";

const Scoring = () => {
  return (
    <div className="flex w-full justify-center items-start h-full ">
      <div
        className="flex justify-center flex-col gap-y-3 p-2 w-full"
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex w-full gap-x-5">
          <div className="flex flex-col w-1/3 bg-slate-100 px-3 rounded-lg justify-evenly">
            <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                대회명 : <span>경기용인시보디빌딩대회 13회</span>
              </p>
            </div>
            <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                종목명 : <span>여자피지크</span>
              </p>
            </div>
            <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                참여선수(현재/전체) : <span>13/130</span>
              </p>
            </div>
          </div>
          <div className="flex w-2/3 py-3 px-5 rounded-lg gap-y-2 bg-slate-100">
            <ProfileMini />
          </div>
        </div>
        <div className="flex w-full gap-x-3">
          {/* <div className="flex w-1/2 h-full justify-start items-start">
            <ProfileBasic />
          </div> */}
          <div className="flex w-full h-full">
            <ScoreBasic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoring;
