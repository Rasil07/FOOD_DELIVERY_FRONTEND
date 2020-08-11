import { GET_RESPONSE_MESSAGE, CLEAR_RESPONSE_MESSAGE } from "../actions/types";

const initialState = {
  message: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESPONSE_MESSAGE: {
      return {
        ...state,
        message: [action.payload],
      };
    }
    case CLEAR_RESPONSE_MESSAGE: {
      return {
        ...state,
        message: [],
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
