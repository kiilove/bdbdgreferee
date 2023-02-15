import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Decrypter } from "../components/Encrypto";
import Header from "../components/Header";
import "../css/buttonAnimate.css";
import { db } from "../firebase";

const dummyGames = [
  { id: 1, title: "학생부", state: "종료" },
  { id: 2, title: "장년부", state: "종료" },
  { id: 3, title: "여자피지크", state: "심사중" },
  { id: 4, title: "비키니 휘트니스", state: "시작전" },
  { id: 5, title: "남자 피지크", state: "시작전" },
  { id: 6, title: "여자 청바지핏 모델", state: "시작전" },
  { id: 7, title: "남자 청바지핏 모델", state: "시작전" },
  { id: 8, title: "클래식 보디빌딩", state: "시작전" },
];

const Lobby = () => {
  const [refereeInfo, setRefereeInfo] = useState({});
  const [refereeName, setRefereeName] = useState();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const getUserInfo = async (userUid) => {
    const refereeRef = collection(db, "referee");
    const refereeQ = query(refereeRef, where("refUid", "==", userUid));
    const refereeSnapshot = await getDocs(refereeQ);

    refereeSnapshot.forEach((doc) => setRefereeInfo(() => ({ ...doc.data() })));
  };

  const getUserName = (keyValue) => {
    const decrypted = Decrypter(keyValue);
    return decrypted;
  };

  useMemo(() => getUserInfo(currentUser.user.uid), []);

  useEffect(() => {
    refereeInfo.refName !== undefined &&
      setRefereeName(getUserName(refereeInfo.refName));
  }, [refereeInfo.refName]);

  return (
    <div className="flex w-full justify-center items-center h-full ">
      {currentUser && refereeInfo ? (
        <div
          className="flex justify-center mt-10 flex-col gap-y-3 py-3 px-10  w-full rounded-md border border-gray-200 shadow-md"
          style={{ maxWidth: "1000px" }}
        >
          <div className="flex w-full h-20">
            <Header />
          </div>
          <div className="flex w-full h-full justify-center items-center flex-col">
            <div className="flex my-1">
              <h1 className="text-gray-600 text-lg">
                안녕하세요!
                <span className="text-gray-800 text-xl font-bold mx-3">
                  {refereeName !== undefined && refereeName}
                </span>
                심사위원님
              </h1>
            </div>
            <div className="flex my-1">
              <h1 className="text-gray-600 text-lg">
                현재{" "}
                <span className="text-green-900 text-xl font-bold mx-3">
                  경기용인시보디빌딩대회 13회
                </span>
                에 배정되셨습니다.
              </h1>
            </div>
            <div className="flex mt-2 mb-5">
              <h2>오늘 배정된 종목의 목록은 아래와 같습니다.</h2>
            </div>

            <div className="flex w-full h-full flex-col">
              <div className="flex w-full h-12">
                <span className="text-lg font-bold tracking-wider">심사중</span>
              </div>
              <div className="flex w-full h-full justify-center items-start flex-wrap gap-5 mb-10 py-5 px-3 rounded-lg shadow bg-slate-700">
                {dummyGames
                  .filter((game) => game.state === "심사중")
                  .map((item, idx) => (
                    <Link to="/scoring">
                      <div className="glow-on-hover bg-white w-80 h-32 flex">
                        <div className="flex w-full justify-center items-center h-full flex-col">
                          <span className="text-3xl font-bold text-green-500">
                            {item.title}
                          </span>
                          <div className="flex w-full justify-center items-center mt-2">
                            <span className="text-green-800">
                              심사위원 입장
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="flex w-full h-12">
                <span className="text-lg font-semibold text-gray-500 ">
                  시작전(배정된 종목중 아직 시작전 종목 목록입니다.)
                </span>
              </div>
              <div className="flex w-full h-full justify-between items-start flex-wrap gap-5">
                {dummyGames
                  .filter((game) => game.state === "시작전")
                  .map((item, idx) => (
                    <div className="flex w-52 h-28 rounded-lg shadow-md border border-gray-300 flex-col justify-center items-center bg-green-300 cursor-not-allowed">
                      <div className="flex w-full justify-center items-center">
                        <span className="text-gray-600 font-light text-sm">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex w-full justify-center items-center">
                        <span className="text-gray-600  font-light text-sm mt-2">
                          종목 시작전
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              {/* <div className="flex w-full h-12">
              <span>전체 종목</span>
            </div>
            {dummyGames.map((item, idx) => (
              <div className="flex w-40 h-28 rounded-lg shadow-md border border-green-700 flex-col justify-center items-center">
                <div className="flex w-full justify-center items-center">
                  {item.title}
                </div>
                <div className="flex w-full justify-center items-center">
                  {item.state}
                </div>
              </div>
            ))} */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center mt-10 flex-col gap-y-3 py-3 px-10  w-full rounded-md border border-gray-200 shadow-md"
          style={{ maxWidth: "1000px" }}
        ></div>
      )}
    </div>
  );
};

export default Lobby;
