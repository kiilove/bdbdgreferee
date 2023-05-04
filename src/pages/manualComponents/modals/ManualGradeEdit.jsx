import React from "react";
import { useState } from "react";
import { useFirestoreUpdateData } from "../../../customHooks/useFirestores";
import { useContext } from "react";
import { ManualRankContext } from "../../../context/ManualRankContext";
import { useEffect } from "react";
import { update } from "firebase/database";

const ManualGradeEdit = ({ payload, close, closeType, parentState }) => {
  const [currentGradeInfo, setCurrentGradeInfo] = useState({});
  const { manualRank, setManualRank } = useContext(ManualRankContext);
  const updatePlayerData = useFirestoreUpdateData("manual_rank_base");

  const handleGradeInfo = (e) => {
    if (e.target.name === "gradeIndex") {
      setCurrentGradeInfo({
        ...currentGradeInfo,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setCurrentGradeInfo({
        ...currentGradeInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handelUpdateGradeInfo = async () => {
    const grades = [...manualRank.contestOrders.contestGrades];
    const findGradeIndex = grades.findIndex(
      (grade) => grade.id === payload.gradeId
    );
    const updatedGrades = [...grades];
    updatedGrades.splice(findGradeIndex, 1, { ...currentGradeInfo });
    console.log(updatedGrades);

    setManualRank({
      ...manualRank,
      contestOrders: {
        ...manualRank.contestOrders,
        contestGrades: updatedGrades,
      },
    });

    parentState([...updatedGrades]);
    close({ ...closeType, grade: false });
  };

  useEffect(() => {
    console.log(payload);
    const grades = [...manualRank.contestOrders.contestGrades];
    const findGrade = grades.filter((grade) => grade.id === payload.gradeId);
    const findGradeIndex = grades.findIndex((grade) => grade.id === payload);

    if (findGrade?.length) {
      setCurrentGradeInfo({ ...findGrade[0] });
    }
  }, []);

  return (
    <div
      className=" flex flex-col gap-y-2 py-2 bg-green-300 rounded-lg p-5"
      style={{
        width: "800px",
        height: "250px",
        transform: "translate(50%, 50%)",
      }}
    >
      <div className="flex justify-end mr-2 items-center">
        <button onClick={() => close(false)}>취소</button>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>개최순서</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="number"
            name="gradeIndex"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={currentGradeInfo.gradeIndex}
            onChange={(e) => handleGradeInfo(e)}
          />
        </div>
      </div>

      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>체급명</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <div className="flex w-full gap-x-2 ">
            <input
              type="text"
              name="contestGradeTitle"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentGradeInfo.contestGradeTitle}
              onChange={(e) => handleGradeInfo(e)}
            />
          </div>
        </div>
      </div>

      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <button
          className="w-full h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white"
          onClick={() => handelUpdateGradeInfo(payload)}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ManualGradeEdit;
