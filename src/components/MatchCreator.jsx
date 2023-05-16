import ChoiceGrid from './ChoiceGrid';
import villains from '../villains';
import { editions } from '../villains';
import SelectPlayers from '../components/SelectPlayers';
import StartMatch from '../components/StartMatch';
import { useReducer, useState, useEffect } from 'react';
import MatchResult from '../components/MatchResult';
import BackToGenerator from './BackToGenerator';

export default function MatchCreator() {
  const [amountPlayers, setAmountPlayers] = useState(2);
  const [selectedCharacters, selectedCharactersDispatch] = useReducer(
    selectedCharactersReducer,
    getInitialCharactersFromStorage(villains)
  );
  const [startMatch, setStartMatch] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);
  const [randomVillains, setRandomVillains] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState(
    getInitialEditionsFromStorage
  );

  useEffect(() => {
    const playerNamesArray = [];
    for (let i = 1; i <= amountPlayers; i++) {
      playerNamesArray.push('Spieler*in ' + i);
    }
    setPlayerNames(playerNamesArray);
  }, [amountPlayers]);

  useEffect(() => {
    const randomNumbers = getRandomNumbers(selectedCharacters, amountPlayers);
    setRandomVillains(getVillains(randomNumbers));
    window.scrollTo(0, 0);
    saveCharactersInStorage(selectedCharacters);
    saveEditionsInStorage(selectedEdition);
  }, [startMatch]);

  return (
    <>
      {!startMatch && (
        <section>
          <div>
            <h1 className="header__headline">Villainous Match Creator</h1>
          </div>
          <ChoiceGrid
            villains={villains}
            editions={editions}
            selectedCharacters={selectedCharacters}
            selectedCharactersDispatch={selectedCharactersDispatch}
            selectedEdition={selectedEdition}
            setSelectedEdition={setSelectedEdition}
          />
          <SelectPlayers
            amountPlayers={amountPlayers}
            setAmountPlayers={setAmountPlayers}
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
          />
          <StartMatch
            amountPlayers={amountPlayers}
            selectedCharacters={selectedCharacters}
            setStartMatch={setStartMatch}
          />
          <section></section>
        </section>
      )}
      {startMatch && (
        <section>
          <h2 className="match-results__headline">Das ist euer Match!</h2>
          <div className="match-results__layout">
            {randomVillains.map((villain, vIndex) => {
              return (
                <MatchResult
                  {...villain}
                  key={`result-${villain.name}`}
                  player={playerNames[vIndex]}
                  currentIndex={vIndex}
                  amountPlayers={amountPlayers}
                  startMatch={startMatch}
                />
              );
            })}
          </div>
          <BackToGenerator setStartMatch={setStartMatch} />
        </section>
      )}
    </>
  );
}

function selectedCharactersReducer(selectedCharacters, message) {
  switch (message.action) {
    case 'toggle_character':
      if (message.selected) {
        return [...selectedCharacters, message.id];
      } else {
        return selectedCharacters.filter((id) => id !== message.id);
      }

    case 'toggle_edition': {
      const villainsInEdition = message.villains
        .filter((villain) => villain.edition === message.name)
        .map((villain) => villain.id);
      if (message.selected) {
        const filteredVillains = villainsInEdition.filter(
          (villain) => !selectedCharacters.includes(villain)
        );
        return [...selectedCharacters].concat(filteredVillains);
      } else {
        return selectedCharacters.filter(
          (id) => !villainsInEdition.includes(id)
        );
      }
    }
  }

  return selectedCharacters;
}

function getInitialCharacters(villains) {
  return villains
    .filter((villain) => villain.edition === 'basic')
    .map((villain) => villain.id);
}

function getRandomNumbers(selectedCharacters, amountPlayers) {
  const randomCardArray = [];
  for (let i = 1; i <= amountPlayers; i++) {
    const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
    const randomCard = selectedCharacters[randomIndex];
    if (randomCardArray.includes(randomCard)) {
      i--;
    } else {
      randomCardArray.push(randomCard);
    }
  }

  return randomCardArray;
}

function getVillains(randomNumbers) {
  const mixedVillains = [];
  for (const number of randomNumbers) {
    mixedVillains.push(villains[number - 1]);
  }
  return mixedVillains;
}

function saveCharactersInStorage(selectedCharacters) {
  localStorage.setItem(
    'selectedCharacters',
    JSON.stringify(selectedCharacters)
  );
}

function saveEditionsInStorage(selectedEdition) {
  localStorage.setItem('selectedEdition', JSON.stringify(selectedEdition));
}

function getInitialCharactersFromStorage(villains) {
  const selectedVillains = getInitialCharacters(villains);
  try {
    const oldCharacters = JSON.parse(
      localStorage.getItem('selectedCharacters')
    );
    return Array.isArray(oldCharacters) ? oldCharacters : selectedVillains;
  } catch (error) {
    localStorage.removeItem('selectedCharacters');
    return selectedVillains;
  }
}

function getInitialEditionsFromStorage() {
  try {
    const oldEdition = JSON.parse(localStorage.getItem('selectedEdition'));
    return Array.isArray(oldEdition) ? oldEdition : ['basic'];
  } catch (error) {
    localStorage.removeItem('selectedEdition');
    return [];
  }
}
