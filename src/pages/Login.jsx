import React, { useState } from "react";
import LocalLogin from "./LocalLogin";
import QrLogin from "./QrLogin";

const Login = () => {
  const [tab, setTab] = useState("qr");
  return (
    <div className="flex w-full justify-center items-center h-full ">
      <div
        className="flex justify-center mt-10 flex-col gap-y-3 p-4 w-full rounded-md shadow-md border"
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex w-full h-full justify-center items-start align-top flex-col gap-y-3 bg-slate-100 ">
          <div className="flex w-full h-12 bg-white">
            <div
              className={`flex w-1/2 h-full justify-center items-center ${
                tab === "qr" && "border-b-2 border-green-500"
              } hover:cursor-pointer`}
              onClick={() => setTab((prev) => (prev = "qr"))}
            >
              QR로그인
            </div>
            <div
              className={`flex w-1/2 h-full  justify-center items-center ${
                tab === "local" && "border-b-2 border-green-500"
              }  hover:cursor-pointer`}
              onClick={() => setTab((prev) => (prev = "local"))}
            >
              휴대전화번호 로그인
            </div>
          </div>
        </div>
        {/* 로그인탭시작 */}
        {tab === "qr" ? (
          <div className="w-full h-full justify-center items-center">
            <QrLogin />
          </div>
        ) : (
          <div className="w-full h-full justify-center items-center">
            <LocalLogin />
          </div>
        )}

        {/* 로그인탭끝 */}
      </div>
    </div>
  );
};

export default Login;
