import React, { createContext, useMemo, useReducer } from "react";
import { RankingBoardReducer } from "./RangkinBoardReducer";

const INITIAL_STATE = {
  rankingBoard: JSON.parse(localStorage.getItem("RankingBoard")) || "",
};

export const RankingBoardContext = createContext(INITIAL_STATE);

export const RankingBoardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RankingBoardReducer, INITIAL_STATE);

  useMemo(() => {
    localStorage.setItem("RankingBoard", JSON.stringify(state.rankingBoard));
  }, [state.rankingBoard]);

  return (
    <RankingBoardContext.Provider value={{ state, dispatch }}>
      {children}
    </RankingBoardContext.Provider>
  );
};
