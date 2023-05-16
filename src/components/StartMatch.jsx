import { useEffect, useState } from 'react';

export default function StartMatch({
  amountPlayers,
  selectedCharacters,
  setStartMatch,
}) {
  const [throwError, setThrowError] = useState();

  useEffect(() => {
    setThrowError(selectedCharacters.length < amountPlayers);
  }, [amountPlayers, selectedCharacters]);

  return (
    <div>
      <div className="button__layout">
        <div className="button__wrapper">
          <button
            className="button__match-button"
            disabled={throwError}
            onClick={(e) => {
              e.preventDefault;
              setStartMatch(true);
            }}
          >
            Match starten!
          </button>
          {throwError && (
            <p className="button__error">
              Es sind zu wenig Bösewichte für die Anzahl der Spieler*innen
              vorhanden. Um den Generator zu starten, wählt bitte weitere
              Bösewichte aus.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
