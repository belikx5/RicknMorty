import "../../styles/ui/filter.scss";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";

const charactersFilters = {
  species: {
    Default: "Default",
    Human: "Humans",
    Alien: "Aliens",
  },
  status: {
    Default: "Default",
    Alive: "Alive",
    Dead: "Dead",
    unknown: "Unknown",
  },
  gender: {
    Default: "Default",
    female: "Female",
    male: "Male",
    genderless: "Genderless",
    unknown: "Unknown",
  },
};

type FilterProps = {
  currCharacterFilter?: string[];
  onFilterChange?: Function;
  onTermChange?: Function;
  onCombinedFilterChange?: Function;
};

function Filter({
  currCharacterFilter,
  onFilterChange,
  onTermChange,
  onCombinedFilterChange,
}: FilterProps) {
  const { pathname } = useLocation();
  const [term, setSearchTerm] = useState("");
  const [combinedFilter, setCombinedFilter] = useState("default");

  useEffect(() => {
    let timer: any = null;
    if (onTermChange) timer = setTimeout(() => onTermChange(term), 400);
    if (onCombinedFilterChange)
      timer = setTimeout(
        () => onCombinedFilterChange([combinedFilter, term]),
        400
      );
    return () => clearTimeout(timer);
  }, [term]);

  const getCurrentFilters = () => {
    switch (pathname) {
      case "/characters":
        return charactersFilters;
      default:
        return charactersFilters;
    }
  };
  const setToDefault = () => {
    if (onFilterChange) onFilterChange("Default", "Default");
    if (onTermChange) {
      onTermChange("");
      setSearchTerm("");
    }
    if (onCombinedFilterChange) {
      setSearchTerm("");
      onCombinedFilterChange(["default", ""]);
      setCombinedFilter("default");
    }
  };

  const renderCombinedFilter = () => {
    return (
      <div className="combined-filter">
        <select
          value={combinedFilter}
          onChange={(e) => setCombinedFilter(e.target.value)}>
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="dimension">Dimension</option>
        </select>
        {combinedFilter === "default" ? null : (
          <input
            value={term}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
        )}
      </div>
    );
  };
  const renderSearchByName = () => {
    return (
      <>
        <h4>Name:</h4>
        <input
          value={term}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
        />
      </>
    );
  };
  const renderCharactersFilters = () => {
    if (onFilterChange && currCharacterFilter) {
      return Object.entries(getCurrentFilters()).map((filter) => {
        return (
          <div className="filter-item">
            <h4>{filter[0]}: </h4>
            <select onChange={(e) => onFilterChange(filter[0], e.target.value)}>
              {Object.entries(filter[1]).map((type) => {
                return (
                  <option
                    key={type[0]}
                    selected={currCharacterFilter[0] === filter[0]}
                    value={type[0]}>
                    {type[1]}
                  </option>
                );
              })}
            </select>
          </div>
        );
      });
    }
  };
  const renderFilters = () => {
    if (currCharacterFilter) return renderCharactersFilters();
    if (onTermChange) return renderSearchByName();
    if (onCombinedFilterChange) return renderCombinedFilter();
  };
  return (
    <div className="filter-container">
      <div className="filter-header">
        <h3>Filter by</h3>
        <IconButton
          aria-label="close"
          className="filter-header-reset"
          onClick={setToDefault}>
          <Close />
        </IconButton>
      </div>
      {renderFilters()}
    </div>
  );
}

export default Filter;
