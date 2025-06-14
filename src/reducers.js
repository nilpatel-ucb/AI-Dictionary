const initialState = {
  tokens: 5,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_TOKENS":
      return {
        ...state,
        tokens: state.tokens + 5,
      };
    case "DECREMENT_TOKENS":
      return {
        ...state,
        // tokens: state.tokens - 1,
        tokens: state.tokens > 0 ? state.tokens - 1 : state.tokens,
      };
    default:
      return state;
  }
}
