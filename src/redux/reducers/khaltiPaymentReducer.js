import {
  ON_PAYMENT_SUCCESS,
  ON_PAYMENT_FAILURE,
  ON_PAYMENT_CLOSE,
  SET_PAYMENT_CONFIG,
} from "../actions/types";

import khaltiConfig from "../../utils/paymentConfig";

const initialState = {
  config: khaltiConfig,
};

const khaltiPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_CONFIG:
      const initialConfig = state.config;
      initialConfig.productIdentity = action.payload.dishIdArray;
      initialConfig.productName = action.payload.dishNameArray;

      return {
        ...state,
      };
    default:
      return state;
  }
};

export default khaltiPaymentReducer;
