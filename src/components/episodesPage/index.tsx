import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootStore } from "../../store";
import {
  fetchEpisodesWithFilter,
  fetchEpisodes,
  setCurrentEpisodePage,
} from "../../store/actions/episodesActions";
import { ResponseInfo } from "../../store/actionTypes";
import { Episode } from "../../store/actionTypes/episodesActionTypes";

import PaginationList from "../UI/PaginationList";
import Filters from "../UI/Filter";
import Loading from "../UI/LoadingIndicator";
import Table from "../UI/Table";
import ErrorMessage from "../UI/ErrorMessage";

type EpisodesProps = {
  info: ResponseInfo;
  currentPage: number;
  episodes: Episode[];
  episodesError: string;
  fetchEpisodesWithFilter: Function;
  fetchEpisodes: Function;
  setCurrentEpisodePage: Function;
};

function EpisodesPage({
  info,
  currentPage,
  episodes,
  episodesError,
  fetchEpisodesWithFilter,
  fetchEpisodes,
  setCurrentEpisodePage,
}: EpisodesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEpisodes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchEpisodesWithFilter("name", searchTerm);
    } else fetchEpisodes();
  }, [searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const insertTableData = () => {
    let list = [];
    if (currentPage === 1) list = episodes.slice(0, currentPage * 25);
    else list = episodes.slice((currentPage - 1) * 25, currentPage * 25);
    return list;
  };

  if (episodesError)
    return (
      <div className="episodes-page">
        <ErrorMessage
          title="Ooops, can't find episodes"
          text="Try to reload this page"
        />
      </div>
    );
  return (
    <div className="episodes-page">
      {episodes.length ? (
        <div>
          <Filters onTermChange={setSearchTerm} />
          <Table
            headers={[
              ["episode", "Episode"],
              ["name", "Name"],
              ["air_date", "Air date"],
            ]}
            data={insertTableData()}
          />
          <PaginationList
            currentPage={currentPage}
            totalCount={info.count}
            itemsPerPage={25}
            onPageChange={setCurrentEpisodePage}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = (state: RootStore) => ({
  info: state.episodesState.info,
  currentPage: state.episodesState.currentPage,
  episodes: state.episodesState.episodes,
  episodesError: state.episodesState.episodesError,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchEpisodesWithFilter,
      fetchEpisodes,
      setCurrentEpisodePage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesPage);
