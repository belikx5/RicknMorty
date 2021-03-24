import "../../../styles/characters/characterItem.scss";
import React from "react";
import { Character } from "../../../store/actionTypes/charactersActionTypes";

type CharacterItemProps = {
  character: Character;
};

function CharacterItem({ character }: CharacterItemProps) {
  return (
    <div className="character-item" style={{backgroundImage: `url(${character.image})`}}>
      <div className="character-item-gradient">
        <p className="character-item-name">{character.name}</p>
      </div>
    </div>
  );
}

export default CharacterItem;
