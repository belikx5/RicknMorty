import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootStore } from "../../store";
import {
  fetchLocations,
  fetchLocationsWithFilter,
  setCurrentLocationPage,
} from "../../store/actions/locationsActions";
import { ResponseInfo } from "../../store/actionTypes";
import { Location } from "../../store/actionTypes/locationsActionTypes";
import Table from "../UI/Table";
import Filter from "../UI/Filter";
import PaginationList from "../UI/PaginationList";
import ErrorMessage from "../UI/ErrorMessage";
import Loading from "../UI/LoadingIndicator";

type LocationPageProps = {
  info: ResponseInfo;
  currentPage: number;
  locations: Location[];
  locationsError: string;
  fetchLocations: Function;
  fetchLocationsWithFilter: Function;
  setCurrentLocationPage: Function;
};

function LocationsPage({
  info,
  currentPage,
  locations,
  locationsError,
  fetchLocations,
  fetchLocationsWithFilter,
  setCurrentLocationPage,
}: LocationPageProps) {
  const [filterBy, setFilterBy] = useState(["default", ""]);

  useEffect(() => {
    if (filterBy[0] !== "default" && filterBy[0].trim()) {
      fetchLocationsWithFilter(currentPage, filterBy[0], filterBy[1]);
    } else fetchLocations(currentPage);
  }, [filterBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLocations(currentPage);
  }, [currentPage]);

  if (!locations.length) return <Loading />;

  if (locationsError)
    return (
      <div className="episodes-page">
        <ErrorMessage
          title="Ooops, can't find any locations"
          text="Try to reload this page :)"
        />
      </div>
    );
  return (
    <div>
      <Filter onCombinedFilterChange={setFilterBy} />
      <Table
        headers={[
          ["name", "Name"],
          ["type", "Type"],
          ["dimension", "Dimension"],
        ]}
        data={locations}
      />
      <PaginationList
        totalCount={info.count}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={setCurrentLocationPage}
      />
    </div>
  );
}

const mapStateToProps = (state: RootStore) => ({
  info: state.locationsState.info,
  currentPage: state.locationsState.currentPage,
  locations: state.locationsState.locations,
  locationsError: state.locationsState.locationsError,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchLocations,
      fetchLocationsWithFilter,
      setCurrentLocationPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationsPage);
