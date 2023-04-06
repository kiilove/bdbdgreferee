import dayjs from "dayjs";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import React, { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RankingBoardContext } from "../context/RankingBoardContext";
import { db } from "../firebase";
import ConfirmationModal from "../modals/ConfirmationModal";

const ScoreHeader = ({ getInfo, selectedType }) => {
  const [scoreData, setScoreData] = useState([]);
  const [scoreBoardType, setScoreBoardType] = useState(selectedType);
  const [scoreBoardData, setScoreBoardData] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state, dispatch } = useContext(RankingBoardContext);
  const navigate = useNavigate();

  const isReadyToSubmit = useMemo(() => {
    const isValidRankingBoard =
      state.rankingBoard.length > 0 &&
      state.rankingBoard.every((data) =>
        Object.values(data).every((val) => !!val)
      );
    return isValidRankingBoard;
  }, [state.rankingBoard]);

  const generateDocuId = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now().toString().substr(-4);
    const extraString = Math.random().toString(36).substring(2, 8);
    const id = `${randomString}-${timestamp}-${extraString}`.toUpperCase();
    return id;
  };

  const addData = async (collectionName, newData, callback) => {
    try {
      const dbBatch = writeBatch(db);
      newData.forEach((data) => {
        const docRef = doc(collection(db, collectionName));
        dbBatch.set(docRef, { ...data, docuId: generateDocuId() });
      });
      await dbBatch.commit();
      callback && callback();
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleSaveRankingBoard = () => {
    if (!isReadyToSubmit) {
      setError("저장할 수 없는 상태입니다.");
      return;
    }

    setMessage({
      title: "데이터전송",
      body: "전송중입니다. 잠시만 기다려주세요",
      isButton: false,
      confirmButtonText: "",
      cancelButtonText: "",
    });
    setIsModalOpen(true);
    addData("rankingboard", state.rankingBoard, () => {
      setMessage({
        title: "데이터완료",
        body: "제출이 완료되었습니다.",
        isButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "",
      });
    });
  };

  const handleSavedConfirm = async () => {
    dispatch({ type: "COMPELETE" });
    setIsModalOpen(false);
    //navigate("/lobby", { replace: true });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full sticky top-0" style={{ height: "150px" }}>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleSavedConfirm}
        onCancel={handleModalClose}
        message={message}
      />
      <div className="flex w-full bg-slate-100 p-1 rounded-lg justify-between flex-wrap gap-y-2 ">
        <div className="flex w-2/5 flex-col gap-y-2 p-1">
          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              대회명 : <span>{getInfo.cupData.cupInfo.cupName}</span>
            </p>
          </div>
          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              장소 : <span>{getInfo.cupData.cupInfo.cupLocation}</span>
            </p>
          </div>
          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              심판 : <span>{getInfo.referee.refName}</span>
            </p>
          </div>
        </div>
        <div className="flex w-2/5 flex-col gap-y-2 p-1">
          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              심사종목 :{" "}
              <span>
                {getInfo.gameData.gameTitle} / {getInfo.gameData.classTitle}
              </span>
            </p>
          </div>

          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              일자 :{" "}
              <span>
                {dayjs(getInfo.cupData.cupInfo.cupDate.startDate).format(
                  "YYYY-MM-DD"
                )}
              </span>
            </p>
          </div>
          <div className="flex w-full bg-slate-800 px-3 rounded-lg h-9 justify-start items-center">
            <p className="text-white text-sm">
              좌석번호 : <span>{getInfo.seatIndex}</span>
            </p>
          </div>
        </div>
        <div className="flex w-1/5 flex-col p-1 gap-y-2">
          <div className="flex w-full h-full bg-slate-800 p-2 rounded-lg justify-start items-center flex-col gap-y-1">
            <div className="flex bg-slate-400 w-full h-full rounded-lg justify-center items-center">
              <span className=" text-2xl font-bold">서명</span>
            </div>
            <button
              className={`${
                !isReadyToSubmit ? "bg-yellow-500 " : "bg-red-500 "
              }flex w-full h-full rounded-lg justify-center items-center`}
              disabled={!isReadyToSubmit}
              onClick={() => handleSaveRankingBoard()}
            >
              <span className=" text-2xl font-bold">
                {!isReadyToSubmit ? "채점중" : "제출"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreHeader;
