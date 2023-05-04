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
import { TiEdit, TiTrash, TiArrowBack } from "react-icons/ti";
import { Modal } from "@mui/material";
import ManualPlayerEdit from "./modals/ManualPlayerEdit";
import ManualCategoryEdit from "./modals/ManualCategoryEdit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase";

const ManualContestOrders = () => {
  const [contestCategorys, setContestCategorys] = useState([]);
  const [currentCategoryInfo, setCurrentCategoryInfo] = useState({});
  const [contestGrades, setContestGrades] = useState([]);
  const [contestGradesFilterd, setContestGradesFilterd] = useState([]);
  const [currentGradeInfo, setCurrentGradeInfo] = useState({});
  const [contestPlayers, setContestPlayers] = useState([]);
  const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});
  const [currentCategorySection, setCurrentCategorySection] = useState(0);
  const [contestOrders, setContestOrders] = useState({});
  const [message, setMessage] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [editModal, setEditModal] = useState({
    category: false,
    grade: false,
    player: false,
  });
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

  const contestPlayersRef = useRef(null);
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
    let newId = id;
    if (newId === currentCategoryInfo.id) {
      newId = uuidv4();
    }

    const newCategoryInfo = {
      ...currentCategoryInfo,
      id: newId,
      categoryIndex: filteredCategorys.count + 1 || 1,
      categorySection: currentCategorySection || undefined,
    };
    console.log(newCategoryInfo);
    const newContestCategorys = [...contestCategorys, newCategoryInfo];
    setContestCategorys(newContestCategorys);
    setCurrentCategoryInfo({ contestCategoryTitle: "", id: uuidv4() });
    categoryTitleRef.current.focus();
  };

  const handleAddGradeInfo = (refId, id) => {
    let newId = id;
    if (!refId) {
      return;
    }
    if (newId === currentGradeInfo.id) {
      newId = uuidv4();
    }
    const newGradeInfo = {
      ...currentGradeInfo,
      id: newId,
      gradeIndex: filteredGrades.count + 1 || 1,
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
      isActive: true,
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
  const deleteCategoryMatchingDocuments = async (refCupId, refGameId) => {
    const manualRankingBoardRef = collection(
      db,
      manualRank.contestInfo.contestCollectionName
    );
    const q = query(
      manualRankingBoardRef,
      where("refCupId", "==", refCupId),
      where("refGameId", "==", refGameId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(
        doc(db, manualRank.contestInfo.contestCollectionName, docSnapshot.id)
      );
    });
  };

  const handleDeleteCategoryInfo = async (refId) => {
    await deleteCategoryMatchingDocuments(manualRank.id, refId);
    const newContestCategorys = [...contestCategorys];
    const findCategoryIndex = newContestCategorys.findIndex(
      (find) => find.id === refId
    );
    newContestCategorys.splice(findCategoryIndex, 1);
    setContestCategorys([...newContestCategorys]);
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
    if (contestOrders.contestCategorys) {
      console.log(contestOrders);
      const newManualRank = {
        ...manualRank,
        contestOrders: contestOrders,
      };

      console.log(newManualRank);
      await contestUpdateData(manualRank.id, newManualRank);
      setManualRank({ ...newManualRank });
      setIsModalOpen4(false);
    } else {
      alert(
        "대회정보에 빈값을 저장하려합니다. 데이터 보호를 위해 실행되지 않습니다."
      );
    }
  };

  const handleDeletePlayers = (refId) => {
    const newContestPlayers = [...contestPlayers];
    const findIndexPlayers = newContestPlayers.findIndex(
      (player) => player.id === refId
    );
    const newContestPlayer = {
      ...newContestPlayers[findIndexPlayers],
      isActive: false,
    };

    newContestPlayers.splice(findIndexPlayers, 1, newContestPlayer);
    setContestPlayers([...newContestPlayers]);
  };

  const handleUnDeletePlayers = (refId) => {
    const newContestPlayers = [...contestPlayers];
    const findIndexPlayers = newContestPlayers.findIndex(
      (player) => player.id === refId
    );
    const newContestPlayer = {
      ...newContestPlayers[findIndexPlayers],
      isActive: true,
    };

    newContestPlayers.splice(findIndexPlayers, 1, newContestPlayer);
    setContestPlayers([...newContestPlayers]);
  };

  const handleUpdatePlayersNumberPlus = () => {
    let dummy = [];
    const newContestPlayers = [...contestPlayers];
    newContestPlayers.map((player) =>
      dummy.push({
        ...player,
        contestPlayerNumber: parseInt(player.contestPlayerNumber) + 1,
      })
    );

    setContestPlayers([...dummy]);
  };

  const handleUpdatePlayersNumberMinus = () => {
    let dummy = [];
    const newContestPlayers = [...contestPlayers];
    newContestPlayers.map((player) =>
      dummy.push({
        ...player,
        contestPlayerNumber: parseInt(player.contestPlayerNumber) - 1,
      })
    );

    setContestPlayers([...dummy]);
  };

  const filteredCategorys = useMemo(() => {
    let filtered = [];
    let count = 0;
    if (contestCategorys.length > 0) {
      count = contestCategorys.length;
      filtered = [...contestCategorys];
      if (currentCategorySection !== 0) {
        const newFiltered = [...filtered];
        filtered = newFiltered.filter(
          (category) => category.categorySection === currentCategorySection
        );
        filtered.sort((a, b) => a.categoryIndex - b.categoryIndex);
      }
    }
    console.log(filtered);
    return { filtered, count };
  }, [
    manualRank,
    contestCategorys,
    currentCategoryInfo.id,
    currentCategorySection,
  ]);

  const filteredGrades = useMemo(() => {
    let filtered = [];
    let count = 0;
    if (contestGrades?.length) {
      if (currentCategoryInfo.id) {
        filtered = contestGrades.filter(
          (filter) => filter.refCategoryId === currentCategoryInfo.id
        );
      }
    }
    filtered.sort((a, b) => a.gradeIndex - b.gradeIndex);
    count = filtered.length;
    return { filtered, count };
  }, [manualRank, contestGrades, currentCategoryInfo.id]);

  const filteredPlayers = useMemo(() => {
    let filtered = [];
    let count = 0;

    if (currentGradeInfo.id) {
      filtered = contestPlayers.filter(
        (filter) => filter.refGradeId === currentGradeInfo.id
      );
      filtered.sort((a, b) => a.contestPlayerIndex - b.contestPlayerIndex);
      count = filtered.length;
    }

    return { filtered, count };
  }, [currentGradeInfo, contestPlayers]);

  const handleRefreshPlayerIndex = () => {
    const newPlayers = [...contestPlayers];

    newPlayers
      .filter(
        (filter) =>
          filter.refGradeId === currentGradeInfo.id &&
          (filter?.isActive === true || filter?.isActive === undefined)
      )
      .map((player, pIdx) => {
        const index = newPlayers.findIndex(
          (p) => p.id === player.id && p.refGradeId === currentGradeInfo.id
        );
        if (index !== -1) {
          newPlayers.splice(index, 1, {
            ...player,
            contestPlayerIndex: pIdx + 1,
          });
        }
      });

    setContestPlayers([...newPlayers]);
  };

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
      <Modal open={editModal.player} onClose={editModal.player}>
        <ManualPlayerEdit
          payload={editIds.playerId}
          close={setEditModal}
          closeType={editModal}
          parentState={setContestPlayers}
        />
      </Modal>
      <Modal open={editModal.category} onClose={editModal.category}>
        <ManualCategoryEdit
          payload={editIds}
          close={setEditModal}
          closeType={editModal}
          parentState={setContestCategorys}
        />
      </Modal>
      <div className="w-1/4 h-full flex flex-col gap-y-2 py-2">
        <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg gap-x-2">
          <button
            className={`${
              currentCategorySection === 0
                ? "flex justify-center items-center w-full h-8 px-5 bg-green-600 rounded-lg text-white"
                : "flex justify-center items-center w-full h-8 px-5 bg-green-500 rounded-lg"
            }`}
            onClick={() => {
              setCurrentCategorySection(0);
            }}
          >
            전체
          </button>
          <button
            className={`${
              currentCategorySection === 1
                ? "flex justify-center items-center w-full h-8 px-5 bg-green-600 rounded-lg text-white"
                : "flex justify-center items-center w-full h-8 px-5 bg-green-500 rounded-lg"
            }`}
            onClick={() => {
              setCurrentCategorySection(1);
            }}
          >
            1부
          </button>
          <button
            className={`${
              currentCategorySection === 2
                ? "flex justify-center items-center w-full h-8 px-5 bg-green-600 rounded-lg text-white"
                : "flex justify-center items-center w-full h-8 px-5 bg-green-500 rounded-lg"
            }`}
            onClick={() => {
              setCurrentCategorySection(2);
            }}
          >
            2부
          </button>
          <button
            className={`${
              currentCategorySection === 3
                ? "flex justify-center items-center w-full h-8 px-5 bg-green-600 rounded-lg text-white"
                : "flex justify-center items-center w-full h-8 px-5 bg-green-500 rounded-lg"
            }`}
            onClick={() => {
              setCurrentCategorySection(3);
            }}
          >
            3부
          </button>
          <button
            className={`${
              currentCategorySection === 4
                ? "flex justify-center items-center w-full h-8 px-5 bg-green-600 rounded-lg text-white"
                : "flex justify-center items-center w-full h-8 px-5 bg-green-500 rounded-lg"
            }`}
            onClick={() => {
              setCurrentCategorySection(4);
            }}
          >
            4부
          </button>
        </div>
        {currentCategorySection !== 0 && (
          <div className="flex h-12 w-full justify-start items-center bg-green-400 p-3 rounded-lg">
            <div className="flex w-1/4 h-full justify-start items-center ml-5 ">
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
        )}

        <div className="flex h-full w-full justify-start items-start bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ">
            <div className="flex w-full bg-green-500 outline-none h-full px-4 rounded-lg">
              <table className="w-full">
                <th className="text-sm font-normal w-full flex border-b border-green-300 h-10">
                  <td className="w-1/4 h-10 flex justify-start items-center ">
                    개최순서
                  </td>
                  <td className="w-2/4 h-10 flex justify-start items-center ">
                    종목명
                  </td>
                  <td className="w-1/4 h-10 flex justify-start items-center "></td>
                </th>
                {filteredCategorys.filtered?.length &&
                  filteredCategorys.filtered
                    .sort((a, b) => a.categoryIndex - b.categoryIndex)
                    .map((category, cIdx) => (
                      <tr
                        className="text-sm font-normal w-full flex border-b border-green-400 h-10"
                        onClick={() => setCurrentCategoryInfo({ ...category })}
                      >
                        <td className="w-1/4 h-10 flex justify-start items-center ">
                          {category.categoryIndex}
                        </td>
                        <td className="w-2/4 h-10 flex justify-start items-center ">
                          {category.contestCategoryTitle}
                        </td>
                        <td className="w-1/4 h-10 flex justify-start items-center gap-x-2">
                          <button
                            className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                            onClick={() => {
                              setEditIds({
                                ...editIds,
                                categoryId: category.id,
                                categorySection: currentCategorySection,
                              });
                              setEditModal({ ...editModal, category: true });
                            }}
                          >
                            <TiEdit className="text-2xl text-gray-300" />
                          </button>{" "}
                          <button
                            className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                            onClick={() => {
                              handleDeleteCategoryInfo(category.id);
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
                {filteredGrades.filtered?.length &&
                  filteredGrades.filtered
                    .sort((a, b) => a.gradeIndex - b.gradeIndex)
                    .map((grade, gIdx) => (
                      <tr
                        className="text-sm font-normal w-full flex border-b border-green-400 h-10"
                        onClick={() => setCurrentGradeInfo(grade)}
                      >
                        <td className="w-1/3 h-10 flex justify-start items-center ">
                          {grade.gradeIndex}
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
                      <td
                        className={`${
                          player?.isActive
                            ? " "
                            : " line-through text-green-400"
                        } " w-1/6 h-10 flex justify-start items-center "`}
                      >
                        {player?.isActive && player.contestPlayerIndex}
                      </td>
                      <td
                        className={`${
                          player?.isActive
                            ? " "
                            : " line-through text-green-400"
                        } " w-1/6 h-10 flex justify-start items-center "`}
                      >
                        {player.contestPlayerNumber}
                      </td>
                      <td
                        className={`${
                          player?.isActive
                            ? " "
                            : " line-through text-green-400"
                        } " w-2/6 h-10 flex justify-start items-center "`}
                      >
                        {player.contestPlayerName}
                      </td>
                      <td
                        className={`${
                          player?.isActive
                            ? " "
                            : " line-through text-green-400"
                        } " w-3/6 h-10 flex justify-start items-center "`}
                      >
                        {player.contestPlayerGym}
                      </td>
                      <td className="w-1/6 h-10 flex justify-start items-center gap-x-3">
                        <button
                          className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                          onClick={() => {
                            setEditIds({ ...editIds, playerId: player.id });
                            setEditModal({ ...editModal, player: true });
                          }}
                        >
                          <TiEdit className="text-2xl text-gray-300" />
                        </button>{" "}
                        {player?.isActive ? (
                          <button
                            className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                            onClick={() => {
                              handleDeletePlayers(player.id);
                            }}
                          >
                            <TiTrash className="text-2xl text-gray-300" />
                          </button>
                        ) : (
                          <button
                            className="bg-green-700 w-8 h-8 flex justify-center items-center rounded-lg"
                            onClick={() => {
                              handleUnDeletePlayers(player.id);
                            }}
                          >
                            <TiArrowBack className="text-2xl text-gray-300" />
                          </button>
                        )}
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
              handleRefreshPlayerIndex();
            }}
          >
            선수순서갱신
          </button>
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              handleUpdatePlayersNumberMinus();
            }}
          >
            일괄(-1)
          </button>
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              handleUpdatePlayersNumberPlus();
            }}
          >
            일괄(+1)
          </button>
          <button
            className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
            onClick={() => {
              handleUpdateOrders();
            }}
          >
            안전저장(1)
          </button>
          {contestOrders.contestCategorys ? (
            <button
              className="w-32 h-12 rounded-lg flex justify-center items-center bg-green-600 text-white"
              onClick={() => handleUpdateManualContest()}
            >
              대회업데이트(2)
            </button>
          ) : (
            <button
              className="w-32 h-12 rounded-lg flex justify-center items-center bg-gray-600 text-white"
              disabled
            >
              안전저장부터
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualContestOrders;
