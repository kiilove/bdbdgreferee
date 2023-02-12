import React from "react";

const LocalLogin = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-full h-full p-20 gap-y-5">
        <div className="flex justify-center">
          <p className="text-gray-800">전화번호(휴대전화번호) 로그인</p>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="전화번호"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="password"
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="비밀번호"
          />
        </div>
        <button
          className="w-full h-12 bg-orange-500 rounded-md border-gray-300 border"
          onClick={() => (window.location.href = "/lobby")}
        >
          <span className=" text-base font-medium text-white">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LocalLogin;
