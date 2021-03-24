import { ResponseInfo, DispatchTypes } from "../actionTypes";
import {
  Episode,
  FETCH_EPISODES,
  FETCH_EPISODES_ERROR,
  FETCH_EPISODES_WITH_FILTER,
  SELECT_EPISODE,
  SET_CURRENT_EPISODE_PAGE,
} from "../actionTypes/episodesActionTypes";

interface IDefaultState {
  info: ResponseInfo;
  currentPage: number;
  episodes: Episode[];
  episodesError: string;
  selectedEpisode: Episode | null;
}

const initState: IDefaultState = {
  info: {
    count: 0,
    pages: 0,
  },
  currentPage: 1,
  episodes: [],
  episodesError: "",
  selectedEpisode: null,
};

const episodesReducer = (
  state = initState,
  action: DispatchTypes
): IDefaultState => {
  switch (action.type) {
    case FETCH_EPISODES:
    case FETCH_EPISODES_WITH_FILTER:
      return { ...state, ...action.payload, episodesError: "" };
    case FETCH_EPISODES_ERROR:
      return { ...state, episodesError: action.payload.error };
    case SELECT_EPISODE:
      return { ...state, selectedEpisode: action.payload };
    case SET_CURRENT_EPISODE_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default episodesReducer;
