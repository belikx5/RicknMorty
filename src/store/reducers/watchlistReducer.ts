import { DispatchTypes } from "../actionTypes";
import {
  EpisodeToWatch,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  SET_IS_WATCHED,
  FETCH_WATCHLIST,
  SAVE_WATCHLIST
} from "../actionTypes/watchlistActionTypes";

interface IDefaultState {
  list: EpisodeToWatch[];
}

const initState: IDefaultState = {
  list: [],
};

const watchlistReducer = ( state = initState, action: DispatchTypes ): IDefaultState => {
  switch (action.type) {
    case SAVE_WATCHLIST:
    case FETCH_WATCHLIST:
      return { ...state, list: action.payload };
    case ADD_TO_WATCHLIST:
      return { ...state, list: [...state.list, action.payload] };
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        list: state.list.filter((el) => el.id !== action.payload),
      };
    case SET_IS_WATCHED:
      return {
        ...state,
        list: state.list.map((el) => {
          if (el.id === action.payload.id)
            el.isWatched = action.payload.isWatched;
          return el;
        })
      };
    default:
      return state;
  }
};
export default watchlistReducer;
