import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ManualRankScoreContext = createContext();

export const ManualRankScoreContextProvider = ({ children }) => {
  const [manualRankScore, setManualRankScore] = useState(null);

  useEffect(() => {
    console.log(manualRankScore);
    if (manualRankScore !== null) {
      localStorage.setItem("manualRankScore", JSON.stringify(manualRankScore));
    }
  }, [manualRankScore]);

  useEffect(() => {
    const getManualRankScore = JSON.parse(
      localStorage.getItem("manualRankScore")
    );
    console.log(getManualRankScore);
    if (getManualRankScore !== null) {
      setManualRankScore(getManualRankScore);
    }
  }, []);

  return (
    <ManualRankScoreContext.Provider
      value={{ manualRankScore, setManualRankScore }}
    >
      {children}
    </ManualRankScoreContext.Provider>
  );
};
