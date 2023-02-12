import React from "react";

const ProfileBasic = () => {
  return (
    <div className="flex w-full h-full justify-start items-start flex-col p-5">
      <div className="flex w-full h-full">
        <span>선수프로필</span>
      </div>
      <div className="flex w-full h-full justify-center">
        <img
          src="../assets/playerProfile/no1.jpg"
          className="object-cover object-top rounded-md"
          style={{ width: "410px", height: "410px" }}
        />
      </div>
      <div className="flex justify-around w-full -top-16 relative px-5">
        <div className="flex flex-col h-full">
          <div
            className="flex w-full h-10  justify-center items-center rounded-t-md bg-slate-500 border-b border-gray-400"
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
            className="flex w-full h-10  justify-center items-center rounded-t-md bg-slate-800 border-b border-gray-400"
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
            className="flex w-full h-10  justify-center items-center rounded-t-md bg-slate-500 border-b border-gray-400"
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
      </div>
    </div>
  );
};

export default ProfileBasic;
