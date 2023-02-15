import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="flex w-full h-20 justify-end">
      <button
        className="flex"
        onClick={() => {
          dispatch({ type: "LOGOUT" });
        }}
      >
        <span>로그아웃</span>
      </button>
    </div>
  );
};

export default Header;
