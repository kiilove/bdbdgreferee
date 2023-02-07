import React from "react";

const Login = () => {
  return (
    <div className="flex w-full justify-center items-center h-full">
      <div
        className="flex justify-center mt-10 flex-col gap-y-3 px-4 w-full"
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex w-1/2">
          <span>QR로그인</span>
        </div>
        <div className="flex w-1/2">
          <span>QR로그인</span>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-800">이메일 아이디로 로그인</p>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="이메일"
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
          onClick={() => (window.location.href = "/home")}
        >
          <span className=" text-base font-medium text-white">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
