import { Dispatch } from "redux";
import { DispatchTypes } from "../actionTypes";
import {
  SET_IS_WATCHED,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  EpisodeToWatch,
  FETCH_WATCHLIST,
  SAVE_WATCHLIST,
} from "../actionTypes/watchlistActionTypes";

export const fetchWatchlist = () => (dispatch: Dispatch<DispatchTypes>) => {
  const item =  localStorage.getItem("watchlist");
  if (item) {
    const list = JSON.parse(item);
    console.log('from fetcg', list)
    dispatch({ type: FETCH_WATCHLIST, payload: list });
  }
};

export const saveWatchlist = (list: EpisodeToWatch[]) =>  (
  dispatch: Dispatch<DispatchTypes>
) => {
   localStorage.setItem("watchlist", JSON.stringify(list));
    console.log('from save', list)
  dispatch({ type: SAVE_WATCHLIST, payload: list });
};

export const addToWatchlist = (episodeName: string) => (
  dispatch: Dispatch<DispatchTypes>,
  getState: Function
) => {
  const newList: EpisodeToWatch[] = getState().watchlistState.list;
  const id = Math.max(...newList.map((el) => el.id))
  const newEpisode = {
    id: id < 0 ? 0 : id + 1,
    name: episodeName,
    isWatched: false,
  };
    localStorage.setItem("watchlist", JSON.stringify([...newList, newEpisode]));
  dispatch({ type: ADD_TO_WATCHLIST, payload: newEpisode });
};

export const removeFromWatchlist = (episodeId: number) => (
  dispatch: Dispatch<DispatchTypes>,
  getState: Function
) => {
    const newList: EpisodeToWatch[] = getState().watchlistState.list.filter(
      (el: EpisodeToWatch) => el.id !== episodeId
    );
    localStorage.setItem("watchlist", JSON.stringify(newList));
  dispatch({ type: REMOVE_FROM_WATCHLIST, payload: episodeId });
};

export const setIsWatched = (episodeId: number, isWatched: boolean) => (
  dispatch: Dispatch<DispatchTypes>,
  getState: Function
) => {
  const newList: EpisodeToWatch[] = getState().watchlistState.list;
    newList.forEach((el) => {
      if (el.id === episodeId) {
        el.isWatched = isWatched;
      }
    });
    localStorage.setItem("watchlist", JSON.stringify(newList));
  dispatch({ type: SET_IS_WATCHED, payload: { id: episodeId, isWatched } });
};
