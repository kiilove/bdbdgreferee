import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useContext } from "react";
import {
  useFirestoreAddData,
  useFirestoreUpdateData,
} from "../../customHooks/useFirestores";

const ManualContestInfo = () => {
  const [contestInfo, setContestInfo] = useState({});
  const [isInit, setIsInit] = useState(false);
  const [message, setMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [confirmedFunction, setConfirmedFunction] = useState();
  const { data: contestAddedData, addData: contestAddData } =
    useFirestoreAddData("manual_rank_base");
  const { data: contestUpdatedData, updateData: contestUpdateData } =
    useFirestoreUpdateData("manual_rank_base");
  const { manualRank, setManualRank } = useContext(ManualRankContext);
  const initContestInfo = {
    contestTitle: "",
    contestLocation: "",
    contestDate: "",
    contestAssociate: "",
    contestPromoter: "",
  };

  const handleContestInfoInit = () => {
    setContestInfo(initContestInfo);
    setManualRank({ ...manualRank, contestInfo: initContestInfo });
    setIsInit(false);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };

  const handleContestInfo = (e) => {
    setContestInfo({ ...contestInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateManualRank = () => {
    setManualRank({ ...manualRank, contestInfo });
    setIsModalOpen2(false);
  };

  const handleAddManualContest = async () => {
    const fetchAddedData = await contestAddData({ contestInfo: contestInfo });
    setManualRank({ ...manualRank, contestInfo, id: fetchAddedData.id });
    setIsModalOpen3(false);
  };

  const handleUpdateManualContest = async () => {
    const newManualRank = {
      ...manualRank,
      contestInfo: contestInfo,
    };
    await contestUpdateData(manualRank.id, newManualRank);
    setManualRank({ ...newManualRank });
    setIsModalOpen4(false);
  };

  useEffect(() => {
    if (manualRank) {
      setContestInfo({ ...manualRank.contestInfo });
    }
  }, [manualRank]);

  return (
    <div className="w-full h-full flex flex-col gap-y-2 py-2">
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleContestInfoInit}
          onCancel={handleModalClose}
          message={message}
        />
        <ConfirmationModal
          isOpen={isModalOpen2}
          onConfirm={handleUpdateManualRank}
          onCancel={handleModalClose}
          message={message}
        />
        <ConfirmationModal
          isOpen={isModalOpen3}
          onConfirm={handleAddManualContest}
          onCancel={handleModalClose}
          message={message}
        />
        <ConfirmationModal
          isOpen={isModalOpen4}
          onConfirm={handleUpdateManualContest}
          onCancel={handleModalClose}
          message={message}
        />

        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>대회명</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="text"
            name="contestTitle"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={contestInfo.contestTitle}
            onChange={(e) => handleContestInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>대회장소</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="text"
            name="contestLocation"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={contestInfo.contestLocation}
            onChange={(e) => handleContestInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>대회일자</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="text"
            name="contestDate"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={contestInfo.contestDate}
            onChange={(e) => handleContestInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>주관</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="text"
            name="contestAssociate"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={contestInfo.contestAssociate}
            onChange={(e) => handleContestInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>주최</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="text"
            name="contestPromoter"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={contestInfo.contestPromoter}
            onChange={(e) => handleContestInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-end items-center rounded-lg gap-x-2">
        <button
          className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-400 text-white"
          onClick={() => {
            setIsModalOpen2(true);
            setMessage({
              title: "저장",
              body: "대회정보를 임시저장 하시겠습니까?",
              isButton: true,
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            });
          }}
        >
          임시저장
        </button>
        {manualRank?.id ? (
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              setIsModalOpen4(true);
              setMessage({
                title: "저장",
                body: "대회를 정보를 업데이트합니다.",
                isButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
              });
            }}
          >
            대회업데이트
          </button>
        ) : (
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              setIsModalOpen3(true);
              setMessage({
                title: "저장",
                body: "대회를 수동으로 개설합니다.",
                isButton: true,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
              });
            }}
          >
            대회개설
          </button>
        )}

        <button
          className="w-32 h-12 rounded-lg flex justify-center items-center bg-gray-300 text-gray-800"
          onClick={() => {
            setIsModalOpen(true);
            setMessage({
              title: "초기화",
              body: "대회정보를 초기화 하시겠습니까?",
              isButton: true,
              confirmButtonText: "확인",
              cancelButtonText: "취소",
            });
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default ManualContestInfo;
