import React, { useEffect } from "react";
import {
  useFirestoreAddData,
  useFirestoreQuery,
} from "../customHooks/useFirestores";
import { useMemo } from "react";
import { useState } from "react";
import ManualHeader from "../components/ManualHeader";
import { ManualRankContext } from "../context/ManualRankContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ManualList = () => {
  const getContests = useFirestoreQuery();
  const [contestList, setContestList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const { manualRank, setManualRank } = useContext(ManualRankContext);

  const navigate = useNavigate();
  const { data: contestAddedData, addData: contestAddData } =
    useFirestoreAddData("manual_rank_base");

  const fetchContests = async () => {
    const result = await getContests.getDocuments("manual_rank_base");

    const newResult = result.filter((f) => f.contestStatus === "ing");

    setContestList([...newResult]);
  };

  const handleAddContest = async () => {
    const fetchAddedData = await contestAddData({ contestInfo: {} });
    setManualRank({ ...manualRank, id: fetchAddedData.id });
    setIsRefresh(!isRefresh);
  };
  const handleEditContest = (id) => {
    if (contestList?.length) {
      const newManualRank = contestList.filter((contest) => contest.id === id);
      setManualRank(newManualRank[0]);
      navigate("/manualrank");
    }
  };

  useEffect(() => {
    fetchContests();
  }, [isRefresh]);

  useEffect(() => {
    console.log(contestList);
  }, [contestList]);

  return (
    <div
      className="flex w-full h-screen justify-center"
      style={{ minWidth: "1000px" }}
    >
      <div
        className="flex w-full flex-col gap-y-2"
        style={{ maxWidth: "1100px" }}
      >
        <div className="flex w-full">
          <ManualHeader />
        </div>
        <div className="flex">
          <div className="flex">
            <button
              className="bg-sky-500 w-32 h-10 rounded-lg text-white"
              onClick={() => handleAddContest()}
            >
              대회생성
            </button>
          </div>
        </div>
        <div className="flex w-full h-full gap-2 flex-wrap box-border">
          {contestList?.length &&
            contestList.map((contest, cIdx) => (
              <div className="flex px-5 w-auto h-14 bg-blue-300 flex-col justify-center items-center rounded-lg shadow-lg">
                <button
                  className="flex text-gray-800"
                  onClick={() => handleEditContest(contest.id)}
                >
                  {contest.contestInfo.contestTitle
                    ? contest.contestInfo.contestTitle
                    : "새로운 대회"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManualList;
