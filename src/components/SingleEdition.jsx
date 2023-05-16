import { useEffect, useState } from 'react';

export default function SingleEdition({
  name,
  title,
  selectedEdition,
  setSelectedEdition,
  selectedCharactersDispatch,
  villains,
}) {
  const [isEditionSelected, setIsEditionSelected] = useState(
    selectedEdition.some((editionName) => editionName === name)
  );

  useEffect(() => {
    setIsEditionSelected(selectedEdition.includes(name));
  }, [selectedEdition]);

  const boxCss = `edition__text edition__box edition--${name} ${
    isEditionSelected ? '' : 'edition--unchecked'
  }`;

  const handleEditionChange = (editionName, isSelected) => {
    setIsEditionSelected(isSelected);

    if (isSelected) {
      setSelectedEdition([...selectedEdition, editionName]);
    } else {
      setSelectedEdition(
        selectedEdition.filter((edition) => edition !== editionName)
      );
    }

    selectedCharactersDispatch({
      name: editionName,
      selected: isSelected,
      action: 'toggle_edition',
      villains,
    });
  };

  return (
    <div className="table-grid__contents">
      <button
        className={boxCss}
        value={name}
        onClick={() => handleEditionChange(name, !isEditionSelected)}
      >
        {title}
      </button>
    </div>
  );
}
