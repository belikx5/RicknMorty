import {
  Character,
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_WITH_FILTER,
  FETCH_CHARACTERS_ERROR,
  SELECT_CHARACTER,
  SET_CURRENT_PAGE,
  SET_CURRENT_SUB_PAGE,
} from "../actionTypes/charactersActionTypes";
import { ResponseInfo, DispatchTypes } from "../actionTypes";

interface IDefaultState {
  info: ResponseInfo;
  currentPage: number;
  currentSubPage: number;
  characters: Character[];
  charactersError: string;
  selectedCharacter: Character | null;
}

const initState: IDefaultState = {
  info: {
    count: 0,
    pages: 0,
  },
  currentPage: 1,
  currentSubPage: 1,
  characters: [],
  charactersError: "",
  selectedCharacter: null,
};

const characterReducer = (
  state = initState,
  action: DispatchTypes
): IDefaultState => {
  switch (action.type) {
    case FETCH_CHARACTERS:
    case FETCH_CHARACTERS_WITH_FILTER:
      return { ...state, ...action.payload, charactersError: "" };
    case FETCH_CHARACTERS_ERROR:
      return { ...state, charactersError: action.payload.error };
    case SELECT_CHARACTER:
      return { ...state, selectedCharacter: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_CURRENT_SUB_PAGE:
      return { ...state, currentSubPage: action.payload };
    default:
      return state;
  }
};

export default characterReducer;
