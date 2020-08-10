import {
  ON_PAYMENT_SUCCESS,
  ON_PAYMENT_FAILURE,
  ON_PAYMENT_CLOSE,
  SET_PAYMENT_CONFIG,
} from "./types";

export const setKhalticonfig = (itemsArray) => (dispatch) => {
  let dishIdArray = [];
  let dishNameArray = [];
  for (var item of itemsArray) {
    dishIdArray.push(item._id);
    dishNameArray.push(item.name);
  }
  dispatch({
    type: SET_PAYMENT_CONFIG,
    payload: { dishIdArray, dishNameArray },
  });
};
