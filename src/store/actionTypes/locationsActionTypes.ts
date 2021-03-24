import { ResponseError, ResponseInfo } from ".";

export const FETCH_LOCATIONS = "FETCH_LOCATIONS";
export const FETCH_LOCATIONS_WITH_FILTER = "FETCH_LOCATIONS_WITH_FILTER";
export const FETCH_LOCATIONS_ERROR = "FETCH_LOCATIONS_ERROR";
export const SET_CURRENT_LOCATION_PAGE = "SET_CURRENT_LOCATION_PAGE";

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export interface FetchLocations {
  type: typeof FETCH_LOCATIONS;
  payload: {
    locations: Location[];
    info: ResponseInfo;
  };
}

export interface FetchLocationsWithFilter {
  type: typeof FETCH_LOCATIONS_WITH_FILTER;
  payload: {
    locations: Location[];
    info: ResponseInfo;
  };
}

export interface FetchLocationsError {
  type: typeof FETCH_LOCATIONS_ERROR;
  payload: ResponseError;
}

export interface SetCurrentLocationsPage {
  type: typeof SET_CURRENT_LOCATION_PAGE;
  payload: number;
}
