import React from "react";

const ScoreVertical = () => {
  return (
    <div className="flex w-full justify-center items-start h-full ">
      <div
        className="flex justify-center flex-col gap-y-3 p-2 w-full"
        style={{ maxWidth: "800px" }}
      >
        <div className="flex w-full gap-x-5">
          <div className="flex w-full bg-slate-100 px-3 rounded-lg justify-between gap-x-5 flex-wrap">
            <div className="flex w-1/2 bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                대회명 : <span>경기용인시보디빌딩대회 13회</span>
              </p>
            </div>
            <div className="flex w-1/2 bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                대회명 : <span>경기용인시보디빌딩대회 13회</span>
              </p>
            </div>
          </div>
          <div className="flex w-full bg-slate-100 px-3 rounded-lg justify-between gap-x-5 flex-wrap">
            <div className="flex w-1/2 bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                대회명 : <span>경기용인시보디빌딩대회 13회</span>
              </p>
            </div>
            <div className="flex w-1/2 bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
              <p className="text-white text-sm">
                대회명 : <span>경기용인시보디빌딩대회 13회</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreVertical;
