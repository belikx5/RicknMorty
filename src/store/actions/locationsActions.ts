import { Dispatch } from "redux";
import { DispatchTypes } from "../actionTypes";
import {
  Location,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_ERROR,
  FETCH_LOCATIONS_WITH_FILTER,
  SET_CURRENT_LOCATION_PAGE,
} from "../actionTypes/locationsActionTypes";

const FETCH_LOCAIONS_URL = "https://rickandmortyapi.com/api/location";

export const fetchLocations = (page: number = 1) => async (
  dispatch: Dispatch<DispatchTypes>
) => {
  const response = await fetch(FETCH_LOCAIONS_URL + `?page=${page}`);

  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      locations: data["results"].map((loca: Location) =>
        modifyLocationResponse(loca)
      ),
    };
    dispatch({ type: FETCH_LOCATIONS, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_LOCATIONS_ERROR, payload: error });
  }
};

export const fetchLocationsWithFilter = (
  page: number = 1,
  filterName: string,
  filterValue: string
) => async (dispatch: Dispatch<DispatchTypes>) => {
  const response = await fetch(
    FETCH_LOCAIONS_URL + `?page=${page}&${filterName}=${filterValue}`
  );
  if (response.ok) {
    const data = await response.json();
    const res = {
      info: {
        count: data["info"]["count"],
        pages: data["info"]["pages"],
      },
      locations: data["results"].map((loca: Location) =>
        modifyLocationResponse(loca)
      ),
    };
    dispatch({ type: FETCH_LOCATIONS_WITH_FILTER, payload: res });
  } else {
    const { error } = await response.json();
    dispatch({ type: FETCH_LOCATIONS_ERROR, payload: error });
  }
};

export const setCurrentLocationPage = (pageNum: number) => (
  dispatch: Dispatch<DispatchTypes>
) => {
  dispatch({ type: SET_CURRENT_LOCATION_PAGE, payload: pageNum });
};

const modifyLocationResponse = (data: Location) => ({
  id: data.id,
  name: data.name,
  dimension: data.dimension,
  type: data.type,
});
