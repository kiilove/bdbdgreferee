import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const ManualRankContext = createContext();

export const ManualRankContextProvider = ({ children }) => {
  const [manualRank, setManualRank] = useState(null);

  useEffect(() => {
    console.log(manualRank);
    if (manualRank !== null) {
      localStorage.setItem("manualRank", JSON.stringify(manualRank));
    }
  }, [manualRank]);

  useEffect(() => {
    const getManualRank = JSON.parse(localStorage.getItem("manualRank"));
    console.log(getManualRank);
    if (getManualRank !== null) {
      console.log("first");
      setManualRank(getManualRank);
    }
  }, []);

  return (
    <ManualRankContext.Provider value={{ manualRank, setManualRank }}>
      {children}
    </ManualRankContext.Provider>
  );
};
