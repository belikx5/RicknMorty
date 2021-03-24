export const FETCH_WATCHLIST = "FETCH_WATCHLIST";
export const SAVE_WATCHLIST = "SAVE_WATCHLIST";
export const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST";
export const REMOVE_FROM_WATCHLIST = "REMOVE_FROM_WATCHLIST";
export const SET_IS_WATCHED = "SET_IS_WATCHED";

export type EpisodeToWatch = {
    id: number,
    name: string,
    isWatched: boolean
}

export interface fetchWatchlist {
    type: typeof FETCH_WATCHLIST,
    payload: EpisodeToWatch[]
}

export interface saveWatchlist {
    type: typeof SAVE_WATCHLIST,
    payload: EpisodeToWatch[]
}

export interface addToWatchlist {
    type: typeof ADD_TO_WATCHLIST,
    payload: EpisodeToWatch
}

export interface removeFromWatchlist {
    type: typeof REMOVE_FROM_WATCHLIST,
    payload: number
}

export interface setIsWatched {
    type: typeof SET_IS_WATCHED,
    payload: {
        id: number,
        isWatched: boolean
    }
}

