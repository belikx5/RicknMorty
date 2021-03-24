import "../../styles/watchlist/watchlistPage.scss";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootStore } from "../../store";
import {
  addToWatchlist,
  removeFromWatchlist,
  fetchWatchlist,
  setIsWatched,
} from "../../store/actions/watchlistActions";
import { EpisodeToWatch } from "../../store/actionTypes/watchlistActionTypes";
import CreationForm from "./components/CreationForm";
import WatchlistItem from "./components/WatchlistItem";

type WatchlistPageProps = {
  watchlist: EpisodeToWatch[];
  saveWatchlist: Function;
  addToWatchlist: Function;
  removeFromWatchlist: Function;
  fetchWatchlist: Function;
  setIsWatched: Function;
};

function WatchlistPage({
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
  fetchWatchlist,
  setIsWatched,
}: WatchlistPageProps) {
  useEffect(() => {
    fetchWatchlist();
  }, []);
  return (
    <div className="watchlist-container">
      <CreationForm onCreateClicked={addToWatchlist} />
      {watchlist.map((el) => {
        return (
          <WatchlistItem
            key={el.id}
            onWatchedClicked={setIsWatched}
            watchlistItem={el}
            onRemoveClicked={removeFromWatchlist}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: RootStore) => ({
  watchlist: state.watchlistState.list,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addToWatchlist,
      removeFromWatchlist,
      fetchWatchlist,
      setIsWatched,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPage);
