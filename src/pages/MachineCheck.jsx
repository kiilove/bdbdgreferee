import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MachineContext } from "../context/MachineContext";

const MachineCheck = () => {
  const [pinMessage, setPinMessage] = useState();
  const refPin1 = useRef();
  const refPin2 = useRef();
  const refPin3 = useRef();
  const refPin4 = useRef();
  const navigate = useNavigate();

  const handlePinCheck = () => {
    const mergePin =
      refPin1.current.value +
      refPin2.current.value +
      refPin3.current.value +
      refPin4.current.value;
    if (mergePin === "1234") {
      setPinMessage("");
      navigate("/rankingdemo");
    } else {
      setPinMessage("PIN번호를 다시 확인하세요");
    }
  };

  const { machineNumber } = useContext(MachineContext);
  useEffect(() => {
    console.log(machineNumber);
    if (machineNumber === 0) {
      navigate("/machinesetting");
    }
  }, [machineNumber]);

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-y-2">
      <div className="flex w-full justify-center font-extrabold ">
        <span style={{ fontSize: "30px" }}>
          물맑은 양평 보디빌딩&피트니스대회
        </span>
      </div>
      <div className="flex w-full justify-center font-extrabold ">
        <span style={{ fontSize: "40px" }}>남자 일반부 / -65kg</span>
      </div>
      <div className="flex w-full justify-center font-extrabold">
        <span style={{ fontSize: "100px" }}>좌석번호</span>
      </div>
      <div className="flex w-full justify-center items-center">
        <span
          className="text-green-800 font-san font-extrabold"
          style={{ fontSize: "200px" }}
        >
          4
        </span>
      </div>
      <div className="flex w-full justify-center items-center gap-x-4 ">
        <input
          type="text"
          maxLength="1"
          ref={refPin1}
          className="flex p-5 border-orange-500 border-4 rounded-lg w-20 h-20 text-5xl justify-center items-center font-bold text-orange-800"
          onChange={(e) => {
            if (e.target.value.length === 1) {
              refPin2.current.focus();
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <input
          type="text"
          maxLength="1"
          ref={refPin2}
          className="flex p-5 border-orange-500 border-4 rounded-lg w-20 h-20 text-5xl justify-center items-center font-bold text-orange-800"
          onChange={(e) => {
            if (e.target.value.length === 1) {
              refPin3.current.focus();
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <input
          type="text"
          maxLength="1"
          ref={refPin3}
          className="flex p-5 border-orange-500 border-4 rounded-lg w-20 h-20 text-5xl justify-center items-center font-bold text-orange-800"
          onChange={(e) => {
            if (e.target.value.length === 1) {
              refPin4.current.focus();
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <input
          type="text"
          maxLength="1"
          ref={refPin4}
          className="flex p-5 border-orange-500 border-4 rounded-lg w-20 h-20 text-5xl justify-center items-center font-bold text-orange-800"
          onChange={(e) => {
            if (e.target.value.length === 1) {
              handlePinCheck();
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
      </div>
      <div>
        <span className="text-2xl text-orange-500 h-20">{pinMessage}</span>
      </div>
      <div className="flex w-full h-20 justify-center items-center bg-green-600">
        <button onClick={() => handlePinCheck()}>
          <span className="text-3xl font-semibold text-white">로그인</span>
        </button>
      </div>
    </div>
  );
};

export default MachineCheck;
