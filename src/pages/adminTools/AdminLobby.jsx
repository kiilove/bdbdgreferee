import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLobby = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex">
        <button
          className="flex bg-white text-blue-800 py-3 px-5 rounded-md border border-blue-800 hover:bg-white hover:text-blue-800"
          onClick={() => navigate("/adminscore")}
        >
          심사
        </button>
        <button className="flex bg-white text-blue-800 py-3 px-5 rounded-md border border-blue-800 hover:bg-white hover:text-blue-800" onClick={()=> navigate("/adminreport")}>
          집계
        </button>
      </div>
    </div>
  );
};

export default AdminLobby;
