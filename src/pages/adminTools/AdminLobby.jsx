import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLobby = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex gap-x-5">
        <button
          className="flex bg-white text-blue-800 p-20 rounded-md border border-blue-800 hover:bg-white hover:text-blue-800 text-lg"
          onClick={() => navigate("/adminscore")}
        >
          심사
        </button>
        <button
          className="flex bg-white text-blue-800 p-20 rounded-md border border-blue-800 hover:bg-white hover:text-blue-800 text-lg"
          onClick={() => navigate("/adminreport")}
        >
          집계
        </button>
      </div>
    </div>
  );
};

export default AdminLobby;
