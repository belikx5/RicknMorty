import { ResponseError, ResponseInfo } from ".";

export const FETCH_CHARACTERS = "FETCH_CHARACTERS";
export const FETCH_CHARACTERS_WITH_FILTER = "FETCH_CHARACTERS_WITH_FILTER";
export const FETCH_CHARACTERS_ERROR = "FETCH_CHARACTERS_ERROR";
export const SELECT_CHARACTER = "SELECT_CHARACTER";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_CURRENT_SUB_PAGE = "SET_CURRENT_SUB_PAGE";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: string;
  origin: string;
};
export type CharacterFromAPI = Character & {
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
};

export interface FetchCharacters {
  type: typeof FETCH_CHARACTERS;
  payload: {
    characters: Character[];
    info: ResponseInfo;
  };
}

export interface FetchCharactersWithFilter {
  type: typeof FETCH_CHARACTERS_WITH_FILTER;
  payload: {
    characters: Character[];
    info: ResponseInfo;
  };
}

export interface FetchCharactersError {
  type: typeof FETCH_CHARACTERS_ERROR;
  payload: ResponseError;
}

export interface SelectCharacter {
  type: typeof SELECT_CHARACTER;
  payload: Character;
}

export interface SetCurrentPage {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
}

export interface SetCurrentSubPage {
  type: typeof SET_CURRENT_SUB_PAGE;
  payload: number;
}
