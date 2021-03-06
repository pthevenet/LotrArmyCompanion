import { SET_USER_COMPANIES, SET_ARMIES } from "../actions/types";

const dataInitialState = {
  armies: {},
  companies: {}
};

export default function dataReducer(state = dataInitialState, action) {
  //   console.log("Data action type => ", action.type);
  switch (action.type) {
    case SET_USER_COMPANIES:
      return { ...state, companies: action.payload };

    case SET_ARMIES:
      return { ...state, armies: action.payload };

    default:
      return state;
  }
}
