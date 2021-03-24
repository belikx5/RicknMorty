import { combineReducers } from "redux";
import charactersReducer from "./charactersReducer";
import episodesReducer from "./episodesReducer";
import locationReducers from "./locationReducers";
import watchlistReducer from "./watchlistReducer";

export default combineReducers({
  charactersState: charactersReducer,
  episodesState: episodesReducer,
  locationsState: locationReducers,
  watchlistState: watchlistReducer
});
