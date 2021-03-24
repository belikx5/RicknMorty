import { Dispatch } from "redux";
import {
  Character,
  CharacterFromAPI,
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_ERROR,
  FETCH_CHARACTERS_WITH_FILTER,
  SELECT_CHARACTER,
  SET_CURRENT_PAGE,
  SET_CURRENT_SUB_PAGE,
} from "../actionTypes/charactersActionTypes";
import { DispatchTypes } from "../actionTypes";

const FETCH_CHARACTERS_URL = "https://rickandmortyapi.com/api/character/";

export const fetchCharacters = (pageNumber: number = 1) => async (
  dispatch: Dispatch<DispatchTypes>
) => {
  const response = await fetch(FETCH_CHARACTERS_URL + `?page=${pageNumber}`);

  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      characters: data["results"].map((r: CharacterFromAPI) =>
        modifyChracterResponse(r)
      ),
    };
    dispatch({ type: FETCH_CHARACTERS, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_CHARACTERS_ERROR, payload: error });
  }
};

export const selectCharacter = (character: Character) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SELECT_CHARACTER, payload: character });
};

export const fetchCharactersWithFilter = (
  pageNumber: number = 1,
  filterName: string,
  filterValue: string
) => async (dispatch: Dispatch<DispatchTypes>) => {
  const response = await fetch(
    FETCH_CHARACTERS_URL + `?page=${pageNumber}&${filterName}=${filterValue}`
  );
  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      characters: data["results"].map((r: CharacterFromAPI) =>
        modifyChracterResponse(r)
      ),
    };
    dispatch({ type: FETCH_CHARACTERS_WITH_FILTER, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_CHARACTERS_ERROR, payload: error });
  }
};

export const setCurrentPage = (pageNum: number) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_PAGE, payload: pageNum });
};
export const setCurrentSubPage = (pageNum: number) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_SUB_PAGE, payload: pageNum });
};

const modifyChracterResponse = (data: CharacterFromAPI) => ({
  id: data.id,
  name: data.name,
  status: data.status,
  species: data.species,
  gender: data.gender,
  image: data.image,
  location: data.location.name,
  origin: data.origin.name,
});