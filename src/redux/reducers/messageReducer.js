import { GET_RESPONSE_MESSAGE, CLEAR_RESPONSE_MESSAGE } from "../actions/types";

const initialState = {
  message: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESPONSE_MESSAGE: {
      return {
        message: action.payload,
      };
    }
    case CLEAR_RESPONSE_MESSAGE: {
      return {
        message: null,
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
