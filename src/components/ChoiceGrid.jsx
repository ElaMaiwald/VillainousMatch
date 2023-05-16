import ChoiceGridArea from './ChoiceGridArea';

export default function ChoiceGrid({
  villains,
  editions,
  selectedCharacters,
  selectedCharactersDispatch,
  isCharacterSelected,
  selectedEdition,
  setSelectedEdition,
}) {
  return (
    <div
      className="table-grid"
      style={{ gridTemplateRows: `repeat(${editions.length + 1}, 0fr)` }}
    >
      <div className="table-grid--grid-area-headline-edition">
        <h3 className="edition__headline">Wählt eure Edition(en)</h3>
      </div>
      <div className="table-grid--grid-area-headline-characters">
        <h3 className="edition__headline">Wählt eure Bösewichte</h3>
      </div>
      <ChoiceGridArea
        villains={villains}
        editions={editions}
        selectedCharacters={selectedCharacters}
        selectedCharactersDispatch={selectedCharactersDispatch}
        isCharacterSelected={isCharacterSelected}
        selectedEdition={selectedEdition}
        setSelectedEdition={setSelectedEdition}
      />
    </div>
  );
}
