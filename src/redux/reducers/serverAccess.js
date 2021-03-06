import { GET_USER_COMPANIES, GET_ARMIES, API_START, API_END, ON_GET_ERROR, API_ERROR } from "../actions/types";

const serverAccessInitialState = {
  isLoadingCompanies: false,
  isLoadingArmies: false,
  armiesNeedRefetch: true,
  companiesNeedRefetch: true,
  getError: false,
  apiError: false
};

export default function serverAccessReducer(state = serverAccessInitialState, action) {
  //   console.log("ServerAccess action type => ", action.type);
  switch (action.type) {
    // API Cases
    case API_ERROR:
      return { ...state, apiError: true };

    case API_START:
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: true };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: true };
      }
      break;

    case ON_GET_ERROR:
      return { ...state, getError: true, companiesNeedRefetch: true, armiesNeedRefetch: true };

    case API_END:
      if (action.payload === GET_USER_COMPANIES) {
        return { ...state, isLoadingCompanies: false, companiesNeedRefetch: state.getError };
      } else if (action.payload === GET_ARMIES) {
        return { ...state, isLoadingArmies: false, armiesNeedRefetch: state.getError };
      }
      break;

    default:
      return state;
  }
}
