import { motion } from 'framer-motion';

export default function MatchResult({
  name,
  img,
  player,
  amountPlayers,
  currentIndex,
  startMatch,
  id,
}) {
  const metrics = '250';
  const cssForOuterBox = `${
    amountPlayers > 3
      ? 'match-results__outer-box--many-players'
      : 'match-results__outer-box'
  }`;

  const cssForPlayers = `match-results__player match-results__player--${
    currentIndex + 1
  }`;

  return (
    <>
      {startMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, delay: 0.5 }}
          transition={{ duration: currentIndex + 0.5 }}
        >
          <div className={cssForOuterBox} id={id}>
            <div className="match-results__card-box">
              <picture>
                <source
                  srcSet={`/webp/${img}.webp`}
                  alt={name}
                  width={metrics}
                  height={metrics}
                />
                <img
                  src={`/webp/${img}.jpg`}
                  alt={name}
                  width={metrics}
                  height={metrics}
                />
              </picture>
            </div>
            <p className="match-results__text">
              <span className={cssForPlayers}>{player}</span>
              {' spielt '}
              <span className="match-results__villain">{name}</span>
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
