import { Dispatch } from "redux";
import { DispatchTypes } from "../actionTypes";
import {
  Episode,
  FETCH_EPISODES,
  FETCH_EPISODES_ERROR,
  FETCH_EPISODES_WITH_FILTER,
  SELECT_EPISODE,
  SET_CURRENT_EPISODE_PAGE,
} from "../actionTypes/episodesActionTypes";

const FETCH_EPISODES_URL = "https://rickandmortyapi.com/api/episode";

export const fetchEpisodes = () => async (
  dispatch: Dispatch<DispatchTypes>
) => {
  const response = await fetch(FETCH_EPISODES_URL);

  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      episodes: data["results"].map((r: Episode) => modifyEpisodesResponse(r)),
    };
    await fetchMorePages(data["info"]["next"], res.episodes);
    dispatch({ type: FETCH_EPISODES, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_EPISODES_ERROR, payload: error });
  }
};

const fetchMorePages = async (
  next: string | null,
  episodes: Episode[],
  filterName?: string,
  filterValue?: string
) => {
  if (next) {
    const response = await fetch(
      filterName ? `${next}&${filterName}=${filterValue}` : next
    );

    if (response.ok) {
      const data = await response.json();
      episodes.push(
        ...data["results"].map((r: Episode) => modifyEpisodesResponse(r))
      );
      await fetchMorePages(data["info"]["next"], episodes);
    }
  }
};

export const fetchEpisodesWithFilter = (
  filterName: string,
  filterValue: string
) => async (dispatch: Dispatch<DispatchTypes>) => {
  const response = await fetch(
    FETCH_EPISODES_URL + `?&${filterName}=${filterValue}`
  );
  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      episodes: data["results"].map((r: Episode) => modifyEpisodesResponse(r)),
    };
    await fetchMorePages(data["info"]["next"], res.episodes);
    dispatch({ type: FETCH_EPISODES_WITH_FILTER, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_EPISODES_ERROR, payload: error });
  }
};

export const setCurrentEpisodePage = (pageNum: number) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_EPISODE_PAGE, payload: pageNum });
};

export const selectEpisode = (episode: Episode) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SELECT_EPISODE, payload: episode });
};

const modifyEpisodesResponse = (data: Episode) => ({
  id: data.id,
  name: data.name,
  air_date: data.air_date,
  episode: data.episode,
  characters: data.characters.map((ch) => +ch.split("character/")[1]),
  created: data.created,
});
