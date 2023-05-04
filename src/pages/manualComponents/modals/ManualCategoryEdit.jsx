import React from "react";
import { useState } from "react";
import { useFirestoreUpdateData } from "../../../customHooks/useFirestores";
import { useContext } from "react";
import { ManualRankContext } from "../../../context/ManualRankContext";
import { useEffect } from "react";
import { update } from "firebase/database";

const ManualCategoryEdit = ({ payload, close, closeType, parentState }) => {
  const [currentCategoryInfo, setCurrentCategoryInfo] = useState({});
  const { manualRank, setManualRank } = useContext(ManualRankContext);
  const updatePlayerData = useFirestoreUpdateData("manual_rank_base");

  const handleCategoryInfo = (e) => {
    if (e.target.name === "categorySection") {
      setCurrentCategoryInfo({
        ...currentCategoryInfo,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setCurrentCategoryInfo({
        ...currentCategoryInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handelUpdateCategoryInfo = async () => {
    const categorys = [...manualRank.contestOrders.contestCategorys];
    const findCategoryIndex = categorys.findIndex(
      (category) => category.id === payload.categoryId
    );
    const updatedCategorys = [...categorys];
    updatedCategorys.splice(findCategoryIndex, 1, { ...currentCategoryInfo });
    console.log(updatedCategorys);

    setManualRank({
      ...manualRank,
      contestOrders: {
        ...manualRank.contestOrders,
        contestCategorys: updatedCategorys,
      },
    });

    parentState([...updatedCategorys]);
    close({ ...closeType, category: false });
  };

  useEffect(() => {
    console.log(payload);
    const categorys = [...manualRank.contestOrders.contestCategorys];
    const findCategory = categorys.filter(
      (category) => category.id === payload.categoryId
    );
    const findCategoryIndex = categorys.findIndex(
      (category) => category.id === payload
    );

    if (findCategory?.length) {
      setCurrentCategoryInfo({ ...findCategory[0] });
    }
  }, []);

  return (
    <div
      className=" flex flex-col gap-y-2 py-2 bg-green-300 rounded-lg p-5"
      style={{
        width: "800px",
        height: "450px",
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
            name="categoryIndex"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={currentCategoryInfo.categoryIndex}
            onChange={(e) => handleCategoryInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>섹션선택</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="number"
            name="categorySection"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={currentCategoryInfo.categorySection}
            onChange={(e) => handleCategoryInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>종목명</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <div className="flex w-full gap-x-2 ">
            <input
              type="text"
              name="contestCategoryTitle"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentCategoryInfo.contestCategoryTitle}
              onChange={(e) => handleCategoryInfo(e)}
            />
          </div>
        </div>
      </div>

      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <button
          className="w-full h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white"
          onClick={() => handelUpdateCategoryInfo(payload)}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ManualCategoryEdit;
