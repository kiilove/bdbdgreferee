import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen justify-center items-center gap-x-2">
      <div className="flex">
        <button
          className="bg-sky-500 w-32 h-14 rounded-lg text-white"
          onClick={() => navigate("/manuallist")}
        >
          채점수동모드
        </button>
      </div>
      <div className="flex">
        <button className="bg-sky-600 w-32 h-14 rounded-lg text-white">
          집계표생성
        </button>
      </div>
      <div className="flex">
        <button className="bg-sky-700 w-32 h-14 rounded-lg text-white">
          데모모드
        </button>
      </div>
    </div>
  );
};

export default Home;
