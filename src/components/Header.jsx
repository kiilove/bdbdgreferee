import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RxBell } from "react-icons/rx";
import "../css/vibration.css";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import ConfirmationModal from "../modals/ConfirmationModal";

const Header = () => {
  const { dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  async function copyRankingBoardData() {
    setMessage({
      title: "데이터전송",
      body: "데모용데이터 정리중",
      isButton: false,
      confirmButtonText: "",
      cancelButtonText: "",
    });
    setIsModalOpen(true);
    const rankingBoardDemoCollection = collection(db, "rankingboarddemo");
    const querySnapshot = await getDocs(rankingBoardDemoCollection);
    const batch = [];

    querySnapshot.forEach((doc) => {
      batch.push(deleteDoc(doc.ref));
    });

    await Promise.all(batch);
    console.log("Ranking Board demo data deleted successfully.");

    const rankingBoardCollection = collection(db, "rankingboard");
    const rankingBoardSnapshot = await getDocs(rankingBoardCollection);

    const newRankingBoardDemoCollection = collection(db, "rankingboarddemo");
    const newBatch = [];
    rankingBoardSnapshot.forEach((docs) => {
      newBatch.push(setDoc(doc(newRankingBoardDemoCollection), docs.data()));
    });

    await Promise.all(newBatch);
    console.log("Ranking Board data copied successfully.");
    setMessage({
      title: "데이터완료",
      body: "완료",
      isButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "",
    });
  }

  const handleSavedConfirm = async () => {
    setIsModalOpen(false);
    //navigate("/lobby", { replace: true });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="flex w-full h-20 justify-end items-center"
      style={{ maxWidth: "1000px" }}
    >
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleSavedConfirm}
        onCancel={handleModalClose}
        message={message}
      />
      <div className="flex w-full h-full justify-end items-center gap-x-3">
        <div className="flex vibration">
          <span className="text-xl text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer relative ">
            <RxBell />
            <div className="bg-red-500 w-2 h-2 rounded-full absolute top-1 left-2"></div>
          </span>
        </div>
        <div className="flex">
          <button onClick={() => copyRankingBoardData()}>
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              데모DB복제
            </span>
          </button>
        </div>
        <div className="flex">
          <Link to="/rankdemo">
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              심사화면
            </span>
          </Link>
        </div>

        <div className="flex">
          <Link to="/onlyadmin">
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              집계화면
            </span>
          </Link>
        </div>

        <div className="flex">
          <Link to="/screen">
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              스크린화면
            </span>
          </Link>
        </div>

        <div className="flex">
          <button
            className="flex"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
            }}
          >
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              로그아웃
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
