import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { ManualRankContext } from "../../context/ManualRankContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

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

  const { manualRank, setManualRank } = useContext(ManualRankContext);

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
    setCurrentCategoryInfo({});
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
    setCurrentGradeInfo({});
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
    setContestOrders({ contestCategorys, contestGrades });
    setManualRank({
      ...manualRank,
      contestOrders: { contestCategorys, contestGrades },
    });
  };

  const filterdGrades = useMemo(() => {
    let filterd = [];
    if (contestGrades?.length) {
      console.log(contestGrades);
      if (currentCategoryInfo.id) {
        filterd = contestGrades.filter(
          (filter) => filter.refCategoryId === currentCategoryInfo.id
        );
      }
    }
    console.log(filterd);
    return filterd;
  }, [contestGrades, currentCategoryInfo.id]);

  useEffect(() => {
    if (manualRank.contestOrders) {
      setContestCategorys([...manualRank.contestOrders.contestCategorys]);
      setContestGrades([...manualRank.contestOrders.contestGrades]);
    }
  }, [manualRank]);

  useEffect(() => {
    console.log(currentCategoryInfo);
  }, [currentCategoryInfo]);

  useEffect(() => {
    console.log(contestCategorys);
  }, [contestCategorys]);

  return (
    <div className="flex w-full gap-x-5">
      <div className="w-full h-full flex flex-col gap-y-2 py-2">
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
                        {cIdx}
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
      <div className="w-full h-full flex flex-col gap-y-2 py-2">
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
                    종목명
                  </td>
                </th>
                {filterdGrades?.length &&
                  filterdGrades.map((grade, gIdx) => (
                    <tr className="text-sm font-normal w-full flex border-b border-green-400 h-10">
                      <td className="w-1/3 h-10 flex justify-start items-center ">
                        {gIdx}
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
      <div className="w-full h-full flex flex-col gap-y-2 py-2">
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
              value={currentPlayerInfo.contestPlayerOrderNumber}
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

              <button className="w-24 h-10 rounded-lg flex justify-center items-center bg-blue-500 text-white">
                선수추가
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full justify-start items-start bg-green-400 p-3 rounded-lg">
          <div className="flex w-full h-full justify-start items-center ">
            <div className="flex w-full bg-green-500 outline-none h-full px-4 rounded-lg">
              <table className="w-full">
                <th className="text-sm font-normal w-full flex border-b border-green-300 h-10">
                  <td className="w-1/4 h-10 flex justify-start items-center ">
                    출전순서
                  </td>
                  <td className="w-1/4 h-10 flex justify-start items-center ">
                    참가번호
                  </td>
                  <td className="w-2/4 h-10 flex justify-start items-center ">
                    선수이름
                  </td>
                </th>
                {contestCategorys.playerOrders?.length &&
                  contestCategorys.playerOrders.map((player, pIdx) => (
                    <tr className="text-sm font-normal w-full flex border-b border-green-400 h-10">
                      <td className="w-1/5 h-10 flex justify-start items-center ">
                        {player.contestPlayerOrderNumber}
                      </td>
                      <td className="w-1/5 h-10 flex justify-start items-center ">
                        {player.contestPlayerNumber}
                      </td>
                      <td className="w-3/5 h-10 flex justify-start items-center ">
                        {player.contestPlayerName}
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
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualContestOrders;
