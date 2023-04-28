import React from "react";
import { useState } from "react";
import { useFirestoreUpdateData } from "../../../customHooks/useFirestores";
import { useContext } from "react";
import { ManualRankContext } from "../../../context/ManualRankContext";
import { useEffect } from "react";

const ManualPlayerEdit = ({ payload, close, parentState }) => {
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});
  const { manualRank, setManualRank } = useContext(ManualRankContext);
  const updatePlayerData = useFirestoreUpdateData("manual_rank_base");

  const handlePlayerInfo = (e) => {
    setCurrentPlayerInfo({
      ...currentPlayerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handelUpdatePlayerInfo = async (playerId) => {
    const players = [...manualRank.contestOrders.contestPlayers];
    const findPlayerIndex = players.findIndex(
      (player) => player.id === payload
    );
    const updatedPlayers = [...players];
    updatedPlayers.splice(findPlayerIndex, 1, { ...currentPlayerInfo });

    setManualRank({
      ...manualRank,
      contestOrders: {
        ...manualRank.contestOrders,
        contestPlayers: updatedPlayers,
      },
    });

    parentState([...updatedPlayers]);
    close(false);
  };

  useEffect(() => {
    console.log(payload);
    const players = [...manualRank.contestOrders.contestPlayers];
    const findPlayer = players.filter((player) => player.id === payload);
    const findPlayerIndex = players.findIndex(
      (player) => player.id === payload
    );

    if (findPlayer?.length) {
      setCurrentPlayerInfo({ ...findPlayer[0] });
    }
  }, []);

  return (
    <div
      className=" flex flex-col gap-y-2 py-2 bg-green-300 rounded-lg p-5"
      style={{
        width: "800px",
        height: "400px",
        transform: "translate(50%, 50%)",
      }}
    >
      <div className="flex justify-end mr-2 items-center">
        <button onClick={() => close(false)}>취소</button>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>출전순서</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="number"
            name="contestOrderNumber"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={currentPlayerInfo.contestPlayerIndex}
            onChange={(e) => handlePlayerInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>참가번호</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <input
            type="number"
            name="contestPlayerNumber"
            className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
            value={currentPlayerInfo.contestPlayerNumber}
            onChange={(e) => handlePlayerInfo(e)}
          />
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>선수이름</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <div className="flex w-full gap-x-2 ">
            <input
              type="text"
              name="contestPlayerName"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentPlayerInfo.contestPlayerName}
              onChange={(e) => handlePlayerInfo(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>소속</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <div className="flex w-full gap-x-2 ">
            <input
              type="text"
              name="contestPlayerGym"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentPlayerInfo.contestPlayerGym}
              onChange={(e) => handlePlayerInfo(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <div className="flex w-1/4 h-full justify-start items-center ml-5">
          <span>전화번호</span>
        </div>
        <div className="flex w-3/4 h-full justify-start items-center ">
          <div className="flex w-full gap-x-2 ">
            <input
              type="text"
              name="contestPlayerPhoneNumber"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentPlayerInfo.contestPlayerPhoneNumber}
              onChange={(e) => handlePlayerInfo(e)}
            />
          </div>
        </div>
      </div>
      <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
        <button
          className="w-full h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white"
          onClick={() => handelUpdatePlayerInfo(payload)}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default ManualPlayerEdit;
