import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Encrypter } from "../components/Encrypto";
import { handleToast } from "../components/HandleToast";
import { db } from "../firebase";

const LocalLogin = () => {
  const [resLoginData, setResLoginData] = useState([]);
  const [loginInfo, setLoginInfo] = useState({});

  const TeltoEmail = async ({ tel }) => {
    const encryTel = Encrypter(tel);
    console.log(encryTel);
    let tempData = [];
    const findEmailQ = query(
      collection(db, "referee"),
      where("refTel", "==", Encrypter(tel.toString()))
    );

    const queryResult = await getDocs(findEmailQ);
    console.log(queryResult);

    queryResult.forEach((doc) => {
      //tempData.push({ ...doc.data() });
      console.log(doc.data());
    });

    //console.log(tempData);
  };

  const handleInputs = (e) => {
    e.preventDefault();
    setLoginInfo(() => ({ ...loginInfo, [e.target.name]: e.target.value }));
  };
  const handleLogin = async ({ email, PWD }) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, PWD)
      .then((user) => {
        const userInfo = user;
        return userInfo;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        handleToast({ type: "error", msg: errorMessage });
      });
  };

  useEffect(() => {
    //console.log(loginInfo);
  }, [loginInfo]);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-full h-full p-20 gap-y-5">
        <div className="flex justify-center">
          <p className="text-gray-800">전화번호(휴대전화번호) 로그인</p>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            name="refTel"
            value={loginInfo.refTel}
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="전화번호"
            onChange={(e) => handleInputs(e)}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="password"
            name="refPassword"
            value={loginInfo.refPassword}
            className="w-full h-12 rounded-md focus:ring-0 focus:outline-orange-400 border border-gray-400 px-5 font-light"
            placeholder="비밀번호"
            onChange={(e) => handleInputs(e)}
          />
        </div>

        <button
          className="w-full h-12 bg-green-500 rounded-md border-gray-300 border"
          onClick={() => {
            window.location.href = "/scoring";
          }}
        >
          <span className=" text-base font-medium text-white">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LocalLogin;
