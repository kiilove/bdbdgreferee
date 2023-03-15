import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RxBell } from "react-icons/rx";
import "../css/vibration.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <div
      className="flex w-full h-20 justify-end items-center"
      style={{ maxWidth: "1000px" }}
    >
      <div className="flex w-full h-full justify-end items-center gap-x-3">
        <div className="flex vibration">
          <span className="text-xl text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer relative ">
            <RxBell />
            <div className="bg-red-500 w-2 h-2 rounded-full absolute top-1 left-2"></div>
          </span>
        </div>
        <div className="flex">
          <Link to="/onlyadmin">
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              마이페이지
            </span>
          </Link>
        </div>

        <div className="flex">
          <button
            className="flex"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
            }}
          >
            <span className="text-sm text-gray-600 hover:text-gray-800 hover:font-semibold cursor-pointer">
              로그아웃
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
