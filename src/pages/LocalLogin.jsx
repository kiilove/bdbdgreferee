import { async } from "@firebase/util";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Decrypter, Encrypter } from "../components/Encrypto";
import { handleToast } from "../components/HandleToast";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const LocalLogin = () => {
  const [resLoginData, setResLoginData] = useState([]);
  const [loginInfo, setLoginInfo] = useState({});
  const [loginUSer, setLoginUser] = useState({});
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  // const handleInputs = (e) => {
  //   e.preventDefault();
  //   setLoginInfo(() => ({ ...loginInfo, [e.target.name]: e.target.value }));
  // };
  const handleLogin = async () => {
    const auth = getAuth();

    await signInWithEmailAndPassword(
      auth,
      loginEmailRef.current.value,
      loginPasswordRef.current.value
    )
      .then((user) => {
        const userInfo = user;
        dispatch({ type: "LOGIN", payload: userInfo });
      })
      .then(() => navigate("/lobby"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        //handleToast({ type: "error", msg: errorMessage });
      });
  };

  useMemo(() => console.log(loginUSer), [loginUSer]);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-full h-full p-20 gap-y-5">
        <div className="flex justify-center">
          <p className="text-gray-800">이메일 로그인</p>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            name="refEmail"
            ref={loginEmailRef}
            value={loginInfo.refEmail}
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="이메일"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="password"
            name="refPassword"
            ref={loginPasswordRef}
            value={loginInfo.refPassword}
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="비밀번호"
          />
        </div>

        <button
          className="w-full h-12 bg-green-500 rounded-md border-gray-300 border"
          onClick={() => handleLogin()}
        >
          <span className=" text-base font-medium text-white">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LocalLogin;
