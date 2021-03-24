import { ResponseInfo, DispatchTypes } from "../actionTypes";
import {
  Location,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_ERROR,
  FETCH_LOCATIONS_WITH_FILTER,
  SET_CURRENT_LOCATION_PAGE,
} from "../actionTypes/locationsActionTypes";

interface IDefaultState {
  info: ResponseInfo;
  currentPage: number;
  locations: Location[];
  locationsError: string;
}

const initState: IDefaultState = {
  info: {
    count: 0,
    pages: 0,
  },
  currentPage: 1,
  locations: [],
  locationsError: ""
};

const episodesReducer = (
  state = initState,
  action: DispatchTypes
): IDefaultState => {
  switch (action.type) {
    case FETCH_LOCATIONS:
    case FETCH_LOCATIONS_WITH_FILTER:
      return { ...state, ...action.payload, locationsError: "" };
    case FETCH_LOCATIONS_ERROR:
      return { ...state, locationsError: action.payload.error };
    case SET_CURRENT_LOCATION_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default episodesReducer;
