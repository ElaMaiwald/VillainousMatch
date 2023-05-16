import { useState, useEffect } from 'react';

export default function SingleCharacter({
  img,
  name,
  id,
  edition,
  selectedCharacters,
  selectedCharactersDispatch,
  selectedEdition,
  setSelectedEdition,
}) {
  const [isCharacterSelected, setIsCharacterSelected] = useState();

  useEffect(() => {
    setIsCharacterSelected(selectedCharacters.some((number) => number === id));
  }, [selectedCharacters]);

  const handleCharacterChange = (
    characterId,
    characterEdition,
    isSelected,
    selectedEdition
  ) => {
    setIsCharacterSelected(isSelected);

    const alreadyInEdition = selectedEdition.includes(characterEdition);
    if (isSelected) {
      if (!alreadyInEdition) {
        setSelectedEdition([...selectedEdition, characterEdition]);
      }
    }

    selectedCharactersDispatch({
      id: characterId,
      edition: characterEdition,
      action: 'toggle_character',
      selected: isSelected,
    });
  };

  const showCharacterCss = `characters__button ${
    isCharacterSelected ? ' ' : 'characters--unchecked'
  }`;

  return (
    <button
      className={showCharacterCss}
      onClick={() => {
        handleCharacterChange(
          id,
          edition,
          !isCharacterSelected,
          selectedEdition
        );
      }}
    >
      <picture>
        <source
          className="characters__img"
          srcSet={`/webp/${img}.webp`}
          alt={name}
          width="120"
          height="120"
        />
        <img
          className="characters__img"
          src={`/webp/${img}.jpg`}
          alt={name}
          width="120"
          height="120"
        />
      </picture>
    </button>
  );
}
