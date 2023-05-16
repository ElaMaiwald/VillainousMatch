import { useState } from 'react';

export default function SelectPlayers({
  amountPlayers,
  setAmountPlayers,
  playerNames,
  setPlayerNames,
}) {
  const [arrowDown, setArrowDown] = useState(true);

  const cssSelector = `players__arrow-${arrowDown ? 'down' : 'up'}`;

  return (
    <>
      <div className="players__layout">
        <h3 className="players__headline">Wie viele Spieler*innen seid ihr?</h3>
        <div className="players__select-layout">
          <span className={cssSelector}></span>
          <select
            id="players"
            onChange={(e) => setAmountPlayers(parseInt(e.target.value))}
            value={amountPlayers}
            onClick={() => setArrowDown(!arrowDown)}
            key={'players'}
          >
            {createOptions(2, 4)}
          </select>
        </div>
      </div>
      <div className="players__input-layout">
        {createInputElements(amountPlayers, playerNames, setPlayerNames)}
      </div>
    </>
  );
}

function createInputElements(amountPlayers, playerNames, setPlayerNames) {
  const inputElements = [];
  for (let i = 1; i <= amountPlayers; i++) {
    const label = 'input' + i;
    const placeholder = 'Spieler*in ' + i;
    const cssForLabels = `players__label players__label--player${i}`;
    const initialValue = playerNames.filter((player, index) => {
      return index === i - 1;
    });

    inputElements.push(
      <div>
        <label htmlFor={label} className={cssForLabels}>
          {placeholder}
        </label>
        <br />
        <input
          type="text"
          id={label}
          placeholder={placeholder}
          key={label}
          value={initialValue}
          className="players__input"
          onChange={(e) => {
            setPlayerNames(
              playerNames.map((player, index) => {
                if (index + 1 === i) {
                  return e.target.value;
                } else {
                  return player;
                }
              })
            );
          }}
        />
        <br />
      </div>
    );
  }
  return inputElements;
}

function createOptions(min = 2, max) {
  const options = [];
  for (let i = min; i <= max; i++) {
    options.push(
      <option key={'option' + i} value={i}>
        {i} Spieler*innen
      </option>
    );
  }
  return options;
}
