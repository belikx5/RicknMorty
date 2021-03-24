import { ResponseError, ResponseInfo } from ".";

export const FETCH_EPISODES = "FETCH_EPISODES";
export const FETCH_EPISODES_WITH_FILTER = "FETCH_EPISODES_WITH_FILTER";
export const FETCH_EPISODES_ERROR = "FETCH_EPISODES_ERROR";
export const SELECT_EPISODE = "SELECT_EPISODE";
export const SET_CURRENT_EPISODE_PAGE = "SET_CURRENT_EPISODE_PAGE";


export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
};

export interface FetchEpisodes {
  type: typeof FETCH_EPISODES;
  payload: {
    episodes: Episode[];
    info: ResponseInfo;
  };
}

export interface FetchEpisodesWithFilter {
  type: typeof FETCH_EPISODES_WITH_FILTER;
  payload: {
    episodes: Episode[];
    info: ResponseInfo;
  };
}

export interface FetchEpisodesError {
  type: typeof FETCH_EPISODES_ERROR;
  payload: ResponseError;
}

export interface SelectEpisode {
  type: typeof SELECT_EPISODE;
  payload: Episode;
}

export interface SetCurrentEpisodePage {
  type: typeof SET_CURRENT_EPISODE_PAGE;
  payload: number;
}
