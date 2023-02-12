import React from "react";
import ProfileBasic from "../profiles/ProfileBasic";
import ScoreBasic from "../scoreTable/ScoreBasic";

const Scoring = () => {
  return (
    <div className="flex w-full justify-center items-center h-full ">
      <div
        className="flex justify-center mt-10 flex-col gap-y-3 p-5  w-full rounded-md border border-gray-200 shadow"
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex w-full">
          <p>
            대회명 : <span>경기용인시보디빌딩대회 13회</span>
          </p>
        </div>
        <div className="flex w-full">
          <p>
            종목명 : <span>여자피지크</span>
          </p>
        </div>
        <div className="flex w-full">
          <p>
            참여선수(현재/전체) : <span>13/130</span>
          </p>
        </div>
        <div className="flex w-full gap-x-3">
          <div className="flex w-1/2 h-full justify-start items-start">
            <ProfileBasic />
          </div>
          <div className="flex w-1/2 h-full">
            <ScoreBasic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoring;
