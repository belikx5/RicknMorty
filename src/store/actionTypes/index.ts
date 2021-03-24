import {
  FetchCharacters,
  FetchCharactersWithFilter,
  FetchCharactersError,
  SelectCharacter,
  SetCurrentPage,
  SetCurrentSubPage,
} from "./charactersActionTypes";

import {
  FetchEpisodes,
  FetchEpisodesWithFilter,
  SelectEpisode,
  SetCurrentEpisodePage,
  FetchEpisodesError,
} from "./episodesActionTypes";

import {
  FetchLocations,
  FetchLocationsWithFilter,
  SetCurrentLocationsPage,
  FetchLocationsError,
} from "./locationsActionTypes";

import {
  addToWatchlist,
  removeFromWatchlist,
  setIsWatched,
  fetchWatchlist,
  saveWatchlist,
} from "./watchlistActionTypes";

export type ResponseInfo = {
  count: number;
  pages: number;
};

export type ResponseError = {
  error: string;
};

export type DispatchTypes =
  | FetchCharacters
  | FetchCharactersWithFilter
  | FetchCharactersError
  | SelectCharacter
  | SetCurrentPage
  | SetCurrentSubPage
  | FetchEpisodes
  | FetchEpisodesWithFilter
  | SelectEpisode
  | SetCurrentEpisodePage
  | FetchEpisodesError
  | FetchLocations
  | FetchLocationsWithFilter
  | SetCurrentLocationsPage
  | FetchLocationsError
  | addToWatchlist
  | removeFromWatchlist
  | setIsWatched
  | fetchWatchlist
  | saveWatchlist;
