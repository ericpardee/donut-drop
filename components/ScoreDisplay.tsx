
import React from 'react';
import { MAX_MISSED_DONUTS } from '../constants';
import { HeartIcon } from '../constants'; // Assuming HeartIcon is for lives

interface ScoreDisplayProps {
  score: number;
  missedDonuts: number;
  level: number; // Added level prop
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, missedDonuts, level }) => {
  const livesLeft = MAX_MISSED_DONUTS - missedDonuts;

  return (
    <div className="absolute top-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] flex flex-wrap justify-between items-center p-3 md:p-4 bg-white bg-opacity-75 rounded-lg shadow-md z-10">
      <div className="font-game text-xl md:text-2xl text-pink-600 mb-1 md:mb-0">
        Score: <span className="font-bold">{score}</span>
      </div>
      <div className="font-game text-xl md:text-2xl text-blue-600 mb-1 md:mb-0">
        Level: <span className="font-bold">{level}</span>
      </div>
      <div className="flex items-center font-game text-xl md:text-2xl text-red-500">
        Lives:
        <div className="flex ml-2">
        {Array.from({ length: livesLeft }).map((_, i) => (
            <HeartIcon key={`life-${i}`} className="w-6 h-6 md:w-7 md:h-7 text-red-500 mx-0.5" />
          ))}
        {Array.from({ length: missedDonuts }).map((_, i) => (
            <HeartIcon key={`missed-${i}`} className="w-6 h-6 md:w-7 md:h-7 text-gray-300 mx-0.5" />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;