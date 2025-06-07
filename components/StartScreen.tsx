import React from 'react';
import { UnicornIcon, DonutIcon, TrophyIcon } from '../constants';
import type { LeaderboardEntry } from '../types';

interface StartScreenProps {
  onStartGame: () => void;
  leaderboard: LeaderboardEntry[];
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, leaderboard }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-pink-100 bg-opacity-80 p-6 md:p-10 rounded-xl shadow-2xl text-center w-full max-w-lg">
      <div className="flex items-center mb-4">
        <DonutIcon className="w-12 h-12 md:w-16 md:h-16 animate-bounce" />
        <h1 className="font-game text-4xl md:text-6xl font-bold text-pink-500 mx-2 md:mx-4 tracking-wider" style={{textShadow: '2px 2px #fff, 4px 4px #f871b2'}}>
          Donut Drop
        </h1>
        <DonutIcon className="w-12 h-12 md:w-16 md:h-16 animate-bounce animation-delay-200" />
      </div>
      <UnicornIcon className="w-24 h-24 md:w-32 md:h-32 my-4 md:my-6" />
      <p className="font-game text-xl md:text-2xl text-purple-600 mb-6">
        Help Luna's unicorn catch the falling donuts!
      </p>
      <p className="font-game text-base md:text-lg text-gray-700 mb-1">Use <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">←</kbd> and <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">→</kbd> arrow keys to move.</p>
      <p className="font-game text-base md:text-lg text-gray-700 mb-2">Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-lg">↑</kbd> to jump.</p>
      <p className="font-game text-sm md:text-base text-gray-600 mb-6">Double tap move keys to dash!</p>
      <button
        onClick={onStartGame}
        className="font-game px-8 py-3 md:px-10 md:py-4 bg-green-500 text-white text-2xl md:text-3xl rounded-lg shadow-lg hover:bg-green-600 active:bg-green-700 transform hover:scale-105 transition-all duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Start Game"
      >
        Start Game!
      </button>

      {leaderboard && leaderboard.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="font-game text-2xl md:text-3xl text-purple-700 mb-3 flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 md:w-10 md:h-10 mr-2 text-yellow-500" />
            Top Scores
            <TrophyIcon className="w-8 h-8 md:w-10 md:h-10 ml-2 text-yellow-500" />
          </h2>
          <ol className="font-game text-lg md:text-xl text-left list-decimal list-inside bg-white/70 p-4 rounded-lg shadow-inner">
            {leaderboard.map((entry, index) => (
              <li key={entry.id} className="py-1 px-2 border-b border-pink-200 last:border-b-0 flex justify-between">
                <span>{index + 1}. {entry.initials}</span>
                <span>{entry.score} PTS</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      <p className="font-game text-xs md:text-sm text-pink-400 mt-6">A game for Luna! ❤️</p>
    </div>
  );
};

export default StartScreen;