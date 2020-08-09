import { GET_RESPONSE_MESSAGE, CLEAR_RESPONSE_MESSAGE } from "./types";

export const getResponseMessage = (message) => (dispatch) => {
  dispatch({
    type: GET_RESPONSE_MESSAGE,
    payload: message,
  });
};
export const clearMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_RESPONSE_MESSAGE,
  });
};
