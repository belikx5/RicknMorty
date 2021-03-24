import "../../styles/characters/charactersPage.scss";
import React, { useEffect, useState } from "react";
import CharacterItem from "./components/CharacterItem";
import { connect } from "react-redux";
import { RootStore } from "../../store";
import { bindActionCreators, Dispatch } from "redux";
import { Character } from "../../store/actionTypes/charactersActionTypes";
import { ResponseInfo } from "../../store/actionTypes";
import {
  fetchCharacters,
  selectCharacter,
  fetchCharactersWithFilter,
  setCurrentPage,
  setCurrentSubPage,
} from "../../store/actions/charactersActions";
import CharacterItemModal from "./components/CharacterItemModal";
import Filters from "../UI/Filter";
import PaginationList from "../UI/PaginationList";
import ErrorMessage from "../UI/ErrorMessage";
import Loading from "../UI/LoadingIndicator";

type CharactersPageProps = {
  info: ResponseInfo;
  characters: Character[];
  currentPage: number;
  currentSubPage: number;
  selectedCharacter: Character | null;
  charactersError: string;
  fetchCharacters: Function;
  fetchCharactersWithFilter: Function;
  selectCharacter: Function;
  setCurrentPage: Function;
  setCurrentSubPage: Function;
};

function CharactersPage({
  characters,
  selectedCharacter,
  info,
  currentPage,
  currentSubPage,
  charactersError,
  fetchCharacters,
  fetchCharactersWithFilter,
  selectCharacter,
  setCurrentPage,
  setCurrentSubPage,
}: CharactersPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currFilter, setCurrFilter] = useState(["Default", "Default"]);
  const [charactersList, setCharactersList] = useState(characters);

  useEffect(() => {
    if (currFilter[1] !== "Default")
      fetchCharactersWithFilter(currentPage, currFilter[0], currFilter[1]);
    else fetchCharacters(currentPage);
  }, [currFilter]);

  useEffect(() => {
    if (info.pages && info.count) {
      const subItems = currentSubPage * 10;
      const currItems = currentPage * 20;
      if (
        (subItems > currItems && subItems - currItems >= 10) ||
        (subItems < currItems && currItems - subItems >= 20)
      ) {
        const div = subItems / 20;
        setCurrentPage((div ^ 0) === div ? div : Math.ceil(div));
      }
    }
    window.scrollTo(0, 0);
  }, [currentSubPage]);

  useEffect(() => {
    setCharactersList([]);
    if (currFilter[1] !== "Default")
      fetchCharactersWithFilter(currentPage, currFilter[0], currFilter[1]);
    else fetchCharacters(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCharactersList(characters);
  }, [characters]);

  const getPartOfList = () => {
    if (currentSubPage % 2 === 0) return charactersList.slice(10);
    else return charactersList.slice(0, 10);
  };

  const filterChange = (filter: string, type: string) => {
    setCurrFilter([filter, type]);
  };

  const openModal = (character: Character) => {
    selectCharacter(character);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!characters.length) return <Loading />;
  if (charactersError)
    return (
      <div className="episodes-page">
        <ErrorMessage
          title="Ooops, can't find any characters"
          text="Try to reload this page :)"
        />
      </div>
    );
  return (
    <>
      <Filters currCharacterFilter={currFilter} onFilterChange={filterChange} />
      <div className="characters-list">
        <CharacterItemModal
          modalOpen={modalOpen}
          closeModal={closeModal}
          character={selectedCharacter}
        />
        {getPartOfList().map((ch) => {
          return (
            <div key={ch.id} onClick={() => openModal(ch)}>
              <CharacterItem character={ch} />
            </div>
          );
        })}
      </div>
      {characters.length ? (
        <PaginationList
          currentPage={currentSubPage}
          totalCount={info.count}
          itemsPerPage={10}
          onPageChange={setCurrentSubPage}
        />
      ) : null}
    </>
  );
}

const mapStateToProps = (state: RootStore) => ({
  info: state.charactersState.info,
  currentPage: state.charactersState.currentPage,
  currentSubPage: state.charactersState.currentSubPage,
  characters: state.charactersState.characters,
  charactersError: state.charactersState.charactersError,
  selectedCharacter: state.charactersState.selectedCharacter,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCharacters,
      selectCharacter,
      fetchCharactersWithFilter,
      setCurrentPage,
      setCurrentSubPage,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CharactersPage);
