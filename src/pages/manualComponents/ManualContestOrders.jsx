import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";
import {
  useFirestoreAddData,
  useFirestoreUpdateData,
} from "../../customHooks/useFirestores";
import { useRef } from "react";
import { TiEdit, TiTrash } from "react-icons/ti";
import { Modal } from "@mui/material";
import ManualPlayerEdit from "./modals/ManualPlayerEdit";

const ManualContestOrders = () => {
  const [contestCategorys, setContestCategorys] = useState([]);
  const [currentCategoryInfo, setCurrentCategoryInfo] = useState({});
  const [contestGrades, setContestGrades] = useState([]);
  const [contestGradesFilterd, setContestGradesFilterd] = useState([]);
  const [currentGradeInfo, setCurrentGradeInfo] = useState({});
  const [contestPlayers, setContestPlayers] = useState([]);
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});
  const [contestOrders, setContestOrders] = useState({});
  const [message, setMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editIds, setEditIds] = useState({
    categoryId: "",
    gradeId: "",
    playerId: "",
  });
  const categoryTitleRef = useRef();
  const gradeTitleRef = useRef();
  const playerOrderNumberRef = useRef();
  const playerNumberRef = useRef();
  const playerNameRef = useRef();
  const { manualRank, setManualRank } = useContext(ManualRankContext);

  const { updateData: contestUpdateData } =
    useFirestoreUpdateData("manual_rank_base");
  const handleCategoryInfo = (e) => {
    setCurrentCategoryInfo({
      ...currentCategoryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleGradeInfo = (e) => {
    setCurrentGradeInfo({
      ...currentGradeInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlayerInfo = (e) => {
    setCurrentPlayerInfo({
      ...currentPlayerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCategoryInfo = (id) => {
    const newCategoryInfo = { id: uuidv4(), ...currentCategoryInfo };
    const newContestCategorys = [...contestCategorys, newCategoryInfo];
    setContestCategorys(newContestCategorys);
    setCurrentCategoryInfo({ contestCategoryTitle: "", id: uuidv4() });
    categoryTitleRef.current.focus();
  };

  const handleAddGradeInfo = (refId) => {
    if (!refId) {
      return;
    }
    const newGradeInfo = {
      id: uuidv4(),
      ...currentGradeInfo,
      refCategoryId: refId,
    };
    const newContestGrades = [...contestGrades, newGradeInfo];
    setContestGrades(newContestGrades);
    setCurrentGradeInfo({ contestGradeTitle: "", id: uuidv4() });
  };

  const handleAddPlayerInfo = (refId, playerIndex) => {
    console.log(playerIndex);
    if (!refId) {
      return;
    }

    const newPlayerInfo = {
      id: uuidv4(),
      ...currentPlayerInfo,
      refGradeId: refId,
      contestPlayerIndex: playerIndex,
    };

    const newContestPlayers = [...contestPlayers, newPlayerInfo];
    setContestPlayers(newContestPlayers);
    setCurrentPlayerInfo({
      contestPlayerName: "",
      contestPlayerNumber: "",
      contestPlayerGym: "",
      contestPlayerPhoneNumber: "",
      id: uuidv4(),
      contestPlayerIndex: playerIndex,
    });

    playerNumberRef.current.focus();
  };

  const handleUpdateCategoryInfo = (refId) => {
    const newContestCategorys = [...contestCategorys];
    const findCategoryIndex = newContestCategorys.findIndex(
      (find) => find.id === refId
    );
    newContestCategorys.splice(findCategoryIndex, 1, {
      ...currentCategoryInfo,
    });
    setContestCategorys([...newContestCategorys]);
  };

  const handleDeleteCategoryInfo = (refId) => {
    const newContestCategorys = [...contestCategorys];
    const findCategoryIndex = newContestCategorys.findIndex(
      (find) => find.id === refId
    );
    newContestCategorys.splice(findCategoryIndex, 1);
    setContestCategorys([...newContestCategorys]);
  };

  const handleUpdateGradeInfo = (refTitle) => {
    const newContestGrades = [...contestGrades];
    const findGradeIndex = newContestGrades.findIndex(
      (find) => find.contestGradeTitle === refTitle
    );
    newContestGrades.splice(findGradeIndex, 1, {
      ...currentGradeInfo,
    });
    setContestCategorys([...newContestGrades]);
  };

  const handleDeleteGradeInfo = (refTitle) => {
    const newContestGrades = [...contestGrades];
    const findGradeIndex = newContestGrades.findIndex(
      (find) => find.contestGradeTitle === refTitle
    );
    newContestGrades.splice(findGradeIndex, 1);
    setContestGrades([...newContestGrades]);
  };

  const handleUpdateOrders = () => {
    setContestOrders({ contestCategorys, contestGrades, contestPlayers });
    setManualRank({
      ...manualRank,
      contestOrders: { contestCategorys, contestGrades, contestPlayers },
    });
  };

  const handleUpdateManualContest = async () => {
    const newManualRank = {
      ...manualRank,
      contestOrders: contestOrders,
    };

    console.log(newManualRank);
    await contestUpdateData(manualRank.id, newManualRank);
    setManualRank({ ...newManualRank });
    setIsModalOpen4(false);
  };

  const handleDeletePlayers = (refId) => {
    const newContestPlayers = [...contestPlayers];
    const findIndexPlayers = newContestPlayers.findIndex(
      (player) => player.id === refId
    );

    newContestPlayers.splice(findIndexPlayers, 1);
    setContestPlayers([...newContestPlayers]);
  };

  const filteredGrades = useMemo(() => {
    let filtered = [];

    if (contestGrades?.length) {
      if (currentCategoryInfo.id) {
        filtered = contestGrades.filter(
          (filter) => filter.refCategoryId === currentCategoryInfo.id
        );
      }
    }

    return filtered;
  }, [manualRank, contestGrades, currentCategoryInfo.id]);

  const filteredPlayers = useMemo(() => {
    let filtered = [];
    let count = 0;

    if (currentGradeInfo.id) {
      filtered = contestPlayers.filter(
        (filter) => filter.refGradeId === currentGradeInfo.id
      );
      count = filtered.length;
    }

    return { filtered, count };
  }, [
    currentGradeInfo,
    manualRank.contestOrders.contestPlayers,
    contestPlayers,
  ]);

  useEffect(() => {
    if (manualRank.contestOrders?.contestCategorys) {
      setContestCategorys([...manualRank.contestOrders.contestCategorys]);
      manualRank.contestOrders?.contestGrades &&
        setContestGrades([...manualRank.contestOrders.contestGrades]);
      manualRank.contestOrders?.contestPlayers &&
        setContestPlayers([...manualRank.contestOrders.contestPlayers]);
    }
  }, [manualRank]);

  return (
    <div className="flex w-full gap-x-5">
      <Modal open={editModal} onClose={editModal}>
        <ManualPlayerEdit
          payload={editIds.playerId}
          close={setEditModal}
          parentState={setContestPlayers}
        />
      </Modal>
      <div className="w-1/4 h-full flex flex-col gap-y-2 py-2">
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
                ref={categoryTitleRef}
                value={currentCategoryInfo.contestCategoryTitle}
                onChange={(e) => handleCategoryInfo(e)}
              />

              <button
                className="w-24 h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white"
                onClick={() => {
                  const id = uuidv4();
                  handleAddCategoryInfo(id);
                }}
              >
                종목추가
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full justify-start items-start bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ">
            <div className="flex w-full bg-green-500 outline-none h-full px-4 rounded-lg">
              <table className="w-full">
                <th className="text-sm font-normal w-full flex border-b border-green-300 h-10">
                  <td className="w-1/3 h-10 flex justify-start items-center ">
                    개최순서
                  </td>
                  <td className="w-2/3 h-10 flex justify-start items-center ">
                    종목명
                  </td>
                </th>
                {contestCategorys?.length &&
                  contestCategorys.map((category, cIdx) => (
                    <tr
                      className="text-sm font-normal w-full flex border-b border-green-400 h-10"
                      onClick={() => setCurrentCategoryInfo({ ...category })}
                    >
                      <td className="w-1/3 h-10 flex justify-start items-center ">
                        {cIdx + 1}
                      </td>
                      <td className="w-2/3 h-10 flex justify-start items-center ">
                        {category.contestCategoryTitle}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col gap-y-2 py-2">
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
          <div className="flex w-1/4 h-full justify-start items-center ml-5">
            <span>체급</span>
          </div>
          <div className="flex w-3/4 h-full justify-start items-center ">
            <div className="flex w-full gap-x-2 ">
              <input
                type="text"
                name="contestGradeTitle"
                className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
                ref={gradeTitleRef}
                disabled={currentCategoryInfo.id ? false : true}
                value={
                  !currentCategoryInfo.id
                    ? "종목먼저선택"
                    : currentGradeInfo.contestGradeTitle
                    ? currentGradeInfo.contestGradeTitle
                    : ""
                }
                onChange={(e) => handleGradeInfo(e)}
              />

              <button
                className="w-24 h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white"
                onClick={() => {
                  const id = uuidv4();
                  handleAddGradeInfo(currentCategoryInfo.id, id);
                }}
              >
                체급추가
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full justify-start items-start bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ">
            <div className="flex w-full bg-green-500 outline-none h-full px-4 rounded-lg">
              <table className="w-full">
                <th className="text-sm font-normal w-full flex border-b border-green-300 h-10">
                  <td className="w-1/3 h-10 flex justify-start items-center ">
                    개최순서
                  </td>
                  <td className="w-2/3 h-10 flex justify-start items-center ">
                    체급명
                  </td>
                </th>
                {filteredGrades?.length &&
                  filteredGrades.map((grade, gIdx) => (
                    <tr
                      className="text-sm font-normal w-full flex border-b border-green-400 h-10"
                      onClick={() => setCurrentGradeInfo(grade)}
                    >
                      <td className="w-1/3 h-10 flex justify-start items-center ">
                        {gIdx + 1}
                      </td>
                      <td className="w-2/3 h-10 flex justify-start items-center ">
                        {grade.contestGradeTitle}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col gap-y-2 py-2">
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
          <div className="flex w-1/4 h-full justify-start items-center ml-5">
            <span>종목명</span>
          </div>
          <div className="flex w-3/4 h-full justify-start items-center ">
            <input
              type="text"
              name="contestCategoryTitle"
              disabled
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              value={currentCategoryInfo.contestCategoryTitle}
            />
          </div>
        </div>
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
          <div className="flex w-1/4 h-full justify-start items-center ml-5">
            <span>체급</span>
          </div>
          <div className="flex w-3/4 h-full justify-start items-center ">
            <input
              type="text"
              name="contestGradeTitle"
              className="w-full bg-green-500 outline-none h-10 px-4 rounded-lg"
              disabled
              value={currentGradeInfo.contestGradeTitle}
              onChange={(e) => handleGradeInfo(e)}
            />
          </div>
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
              value={filteredPlayers.count + 1}
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
              ref={playerNumberRef}
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
            onClick={() =>
              handleAddPlayerInfo(
                currentGradeInfo.id,
                filteredPlayers.count + 1
              )
            }
          >
            선수추가
          </button>
        </div>
        <div className="flex h-full w-full justify-start items-start bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ">
            <div className="flex w-full bg-green-500 outline-none h-full px-4 rounded-lg">
              <table className="w-full">
                <th className="text-sm font-normal w-full flex border-b border-green-300 h-10">
                  <td className="w-1/6 h-10 flex justify-start items-center ">
                    출전순서
                  </td>
                  <td className="w-1/6 h-10 flex justify-start items-center ">
                    참가번호
                  </td>
                  <td className="w-2/6 h-10 flex justify-start items-center ">
                    선수이름
                  </td>
                  <td className="w-3/6 h-10 flex justify-start items-center ">
                    소속
                  </td>
                  <td className="w-1/6 h-10 flex justify-start items-center "></td>
                </th>
                {filteredPlayers.filtered?.length &&
                  filteredPlayers.filtered.map((player, pIdx) => (
                    <tr className="text-sm font-normal w-full flex border-b border-green-400 h-10">
                      <td className="w-1/6 h-10 flex justify-start items-center ">
                        {pIdx + 1}
                      </td>
                      <td className="w-1/6 h-10 flex justify-start items-center ">
                        {player.contestPlayerNumber}
                      </td>
                      <td className="w-2/6 h-10 flex justify-start items-center ">
                        {player.contestPlayerName}
                      </td>
                      <td className="w-3/6 h-10 flex justify-start items-center ">
                        {player.contestPlayerGym}
                      </td>
                      <td className="w-1/6 h-10 flex justify-start items-center gap-x-3">
                        <button
                          className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                          onClick={() => {
                            setEditIds({ ...editIds, playerId: player.id });
                            setEditModal(true);
                          }}
                        >
                          <TiEdit className="text-2xl text-gray-300" />
                        </button>{" "}
                        <button
                          className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                          onClick={() => {
                            handleDeletePlayers(player.id);
                          }}
                        >
                          <TiTrash className="text-2xl text-gray-300" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
        <div className="flex h-12 w-full justify-end items-center rounded-lg gap-x-2">
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              handleUpdateOrders();
            }}
          >
            우선저장(1)
          </button>
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => handleUpdateManualContest()}
          >
            대회업데이트(2)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualContestOrders;
