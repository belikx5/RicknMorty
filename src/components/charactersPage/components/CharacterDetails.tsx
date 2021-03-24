import "../../../styles/characters/characterDetails.scss";
import React from "react";
import { Character } from "../../../store/actionTypes/charactersActionTypes";
import Loading from "../../UI/LoadingIndicator";

type DetailsProps = {
  character: Character | null;
};

function CharacterDetails({ character }: DetailsProps) {
  const renderStatus = (status: string) => {
    switch (status) {
      case "Alive":
        return `❤️ ${status}`;
      case "Dead":
        return `☠️ ${status}`;
      case "unknown":
        return `❓ ${status}`;
      default:
        return status;
    }
  };
  const renderSpecies = (species: string) => {
    switch (species) {
      case "Human":
        return `🧍 ${species}`;
      case "Alien":
        return `👽 ${species}`;
      default:
        return `🌀 ${species}`;
    }
  };

  if (!character)
    return (
      <div className="deatils-container">
        <Loading />
      </div>
    );

  return (
    <div className="deatils-container">
      <div
        className="details-image"
        style={{ backgroundImage: `url(${character.image})` }}
      />
      <div className="details-data">
        <h3>{character.name}</h3>
        <p>
          <span>Species:</span>
          {renderSpecies(character.species)}
        </p>
        <p>
          <span>Gender:</span>⚕️ {character.gender}
        </p>
        <p>
          <span>Status:</span>
          {renderStatus(character.status)}
        </p>
        <p>
          <span>Location:</span>📍 {character.location}
        </p>
        <p>
          <span>Origin:</span>🏠 {character.origin}
        </p>
      </div>
    </div>
  );
}

export default CharacterDetails;
