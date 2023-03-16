export const RankingBoardReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return {
        ...state,
        rankingBoard: action.payload,
      };
    case "COMPELETE":
      return {
        ...state,
        rankingBoard: "",
      };
    default:
      return state;
  }
};
