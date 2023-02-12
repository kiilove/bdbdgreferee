import React from "react";

const ProfileMini = () => {
  return (
    <div className="flex justify-around w-full h-full">
      <div className="flex flex-col h-full">
        <div
          className="flex w-full h-28  justify-center items-center "
          style={{ minWidth: "118px" }}
        >
          <img
            src="./assets/playerProfile/no1.jpg"
            className="h-28 object-cover object-top rounded-lg"
            style={{ minWidth: "118px" }}
          />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div
          className="flex w-full h-8  justify-center items-center rounded-t-md bg-slate-500 border-b border-gray-400"
          style={{ minWidth: "118px" }}
        >
          <span className="text-sm text-white">참가번호</span>
        </div>
        <div
          className="flex w-full h-20 justify-center items-center rounded-b-md bg-slate-500"
          style={{ minWidth: "118px" }}
        >
          <span className="text-2xl text-white font-semibold">435</span>
        </div>
      </div>
      <div className="flex flex-col  h-full">
        <div
          className="flex w-full h-8  justify-center items-center rounded-t-md bg-slate-800 border-b border-gray-400"
          style={{ minWidth: "118px" }}
        >
          <span className="text-sm text-white">이름</span>
        </div>
        <div
          className="flex w-full h-20 justify-center items-center rounded-b-md bg-slate-800"
          style={{ minWidth: "118px" }}
        >
          <span className="text-lg text-white">김이박최강</span>
        </div>
      </div>
      <div className="flex flex-col  h-full">
        <div
          className="flex w-full h-8  justify-center items-center rounded-t-md bg-slate-500 border-b border-gray-400"
          style={{ minWidth: "118px" }}
        >
          <span className="text-sm text-white">계측</span>
        </div>
        <div
          className="flex w-full h-20 justify-center items-center rounded-b-md bg-slate-500 flex-col"
          style={{ minWidth: "118px" }}
        >
          <span className="text-lg text-white">173cm</span>
          <span className="text-lg text-white">85Kg</span>
        </div>
      </div>
      <div className="flex flex-col h-full w-10 ">
        <button className="flex w-10 h-8 justify-center items-center ">
          <span className="text-xs text-gray-800">더보기</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileMini;
