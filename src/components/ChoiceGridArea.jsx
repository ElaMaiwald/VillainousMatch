import SingleCharacter from './SingleCharacter';
import SingleEdition from './SingleEdition';

export default function ChoiceGridArea({
  villains,
  editions,
  selectedCharacters,
  selectedCharactersDispatch,
  selectedEdition,
  setSelectedEdition,
}) {
  return (
    <>
      {editions.map((edition) => {
        const gridAreaCssEdition = `table-grid__flex table-grid--grid-area-edition${edition.id}`;
        const gridAreaCssCharacter = `characters__layout table-grid--grid-area-character${edition.id}`;
        return (
          <>
            <div className={gridAreaCssEdition}>
              <SingleEdition
                {...edition}
                key={edition.name}
                selectedCharacters={selectedCharacters}
                selectedCharactersDispatch={selectedCharactersDispatch}
                selectedEdition={selectedEdition}
                setSelectedEdition={setSelectedEdition}
                villains={villains}
              />
            </div>
            <div className={gridAreaCssCharacter}>
              {villains.map((villain) => {
                return (
                  edition.name === villain.edition && (
                    <SingleCharacter
                      {...villain}
                      key={villain.name}
                      selectedCharacters={selectedCharacters}
                      selectedCharactersDispatch={selectedCharactersDispatch}
                      selectedEdition={selectedEdition}
                      setSelectedEdition={setSelectedEdition}
                    />
                  )
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );
}
