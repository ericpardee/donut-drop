import React from 'react';
import { DonutIcon, TrophyIcon } from '../constants';
import type { LeaderboardEntry } from '../types';

interface GameOverScreenProps {
  score: number;
  onRestartGame: () => void;
  leaderboard: LeaderboardEntry[];
  showInitialsInput: boolean;
  currentPlayerInitials: string;
  onInitialsChange: (initials: string) => void;
  onInitialsSubmit: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestartGame,
  leaderboard,
  showInitialsInput,
  currentPlayerInitials,
  onInitialsChange,
  onInitialsSubmit
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInitialsSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-purple-100 bg-opacity-80 p-6 md:p-10 rounded-xl shadow-2xl text-center w-full max-w-lg">
      <h1 className="font-game text-4xl md:text-6xl font-bold text-purple-600 mb-4" style={{textShadow: '2px 2px #fff, 4px 4px #c084fc'}}>Game Over!</h1>
      
      {showInitialsInput ? (
        <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center">
          <DonutIcon className="w-16 h-16 md:w-20 md:h-20 my-3 opacity-70" />
          <p className="font-game text-2xl md:text-3xl text-pink-500 mb-2">Your Score: {score}</p>
          <p className="font-game text-lg md:text-xl text-green-600 mb-3">🎉 New High Score! 🎉</p>
          <label htmlFor="initials" className="font-game text-md md:text-lg text-gray-700 mb-2">Enter your initials (3 letters):</label>
          <input
            type="text"
            id="initials"
            value={currentPlayerInitials}
            onChange={(e) => onInitialsChange(e.target.value)}
            maxLength={3}
            className="font-game text-xl md:text-2xl p-2 border-2 border-pink-300 rounded-md w-1/2 text-center uppercase focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={currentPlayerInitials.length !== 3}
            className="font-game mt-4 px-6 py-3 md:px-8 md:py-3 bg-green-500 text-white text-xl md:text-2xl rounded-lg shadow-lg hover:bg-green-600 active:bg-green-700 disabled:bg-gray-400 transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Submit Score
          </button>
        </form>
      ) : (
        <>
          <DonutIcon className="w-16 h-16 md:w-24 md:h-24 my-3 opacity-70" />
          <p className="font-game text-3xl md:text-4xl text-pink-500 mb-1">Your Score: {score}</p>
          {score > 0 ? (
            <p className="font-game text-lg md:text-xl text-green-600 mb-4">Great job catching those donuts!</p>
          ) : (
            <p className="font-game text-lg md:text-xl text-gray-600 mb-4">Oh no! Try to catch some donuts next time!</p>
          )}
          <button
            onClick={onRestartGame}
            className="font-game px-8 py-3 md:px-10 md:py-4 bg-yellow-400 text-gray-800 text-2xl md:text-3xl rounded-lg shadow-lg hover:bg-yellow-500 active:bg-yellow-600 transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            Play Again?
          </button>
        </>
      )}

      {leaderboard && leaderboard.length > 0 && !showInitialsInput && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="font-game text-2xl md:text-3xl text-purple-700 mb-3 flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 md:w-10 md:h-10 mr-2 text-yellow-500" />
            Top Scores
             <TrophyIcon className="w-8 h-8 md:w-10 md:h-10 ml-2 text-yellow-500" />
          </h2>
          <ol className="font-game text-lg md:text-xl text-left list-decimal list-inside bg-white/70 p-4 rounded-lg shadow-inner">
            {leaderboard.map((entry, index) => (
              <li key={entry.id} className={`py-1 px-2 border-b border-pink-200 last:border-b-0 flex justify-between ${entry.score === score && entry.initials === "" ? 'font-bold text-pink-600' : ''}`}> {/* Highlight recent score if applicable */}
                <span>{index + 1}. {entry.initials || "---"}</span>
                <span>{entry.score} PTS</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default GameOverScreen;
