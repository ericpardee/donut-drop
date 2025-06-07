
import React from 'react';
import type { Unicorn as UnicornType, Donut as DonutType } from '../types';
import { GAME_WIDTH, GAME_HEIGHT, MoonIcon, StarIcon } from '../constants';
import UnicornComponent from './Unicorn';
import DonutComponent from './Donut';
import ScoreDisplay from './ScoreDisplay';

interface GameAreaProps {
  unicorn: UnicornType;
  donuts: DonutType[];
  score: number;
  missedDonuts: number;
  level: number; // Added level prop
}

const GameArea: React.FC<GameAreaProps> = ({ unicorn, donuts, score, missedDonuts, level }) => {
  const backgroundStyle = level === 1 
    ? { background: 'linear-gradient(to bottom, #87CEEB, #ADD8E6, #f0f9ff 70%)' } // Sky blue gradient for level 1
    : { background: 'linear-gradient(to bottom, #1e0c42, #000033 70%)' }; // Night sky gradient for level 2
    // Darker: #0b021a (top), #000022 (bottom 70%)
    // Indigo/Space Blue: #4B0082 (top), #000033 (bottom 70%)
    // Current: #1e0c42 (top for softer night), #000033 (bottom)

  // Star twinkling animation
  const starTwinkleAnimation = {
    animation: 'twinkle 2s infinite alternate ease-in-out',
  };
  const keyframes = `
    @keyframes twinkle {
      0% { opacity: 0.6; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1.05); }
    }
  `;

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl border-4 border-pink-300"
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        ...backgroundStyle,
      }}
    >
      <style>{keyframes}</style> 
      {level === 1 && (
        <>
          {/* Level 1: Clouds */}
          <div className="absolute top-10 left-20 w-32 h-16 bg-white rounded-full opacity-80 animate-pulse-slow"></div>
          <div className="absolute top-20 left-1/2 w-40 h-20 bg-white rounded-full opacity-70 -translate-x-1/2 animate-pulse-slow animation-delay-500"></div>
          <div className="absolute top-5 right-24 w-28 h-14 bg-white rounded-full opacity-75 animate-pulse-slow animation-delay-1000"></div>
        </>
      )}

      {level === 2 && (
        <>
          {/* Level 2: Moon and Stars */}
          <MoonIcon className="absolute top-8 left-12 w-20 h-20 text-gray-200 opacity-80 transform -rotate-12" />

          {/* Static Stars - smaller, more numerous */}
          <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-100 rounded-full opacity-70 shadow-lg"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-gray-300 rounded-full opacity-60"></div>
          <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-yellow-200 rounded-full opacity-80 shadow-md"></div>
          <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-70"></div>
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-yellow-100 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-gray-300 rounded-full opacity-75 shadow-sm"></div>
          <div className="absolute top-5 right-10 w-1 h-1 bg-yellow-200 rounded-full opacity-60"></div>
          <div className="absolute top-10 right-1/3 w-1.5 h-1.5 bg-gray-200 rounded-full opacity-70"></div>
          <div className="absolute bottom-10 left-10 w-1 h-1 bg-yellow-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-gray-300 rounded-full opacity-80 shadow-md"></div>
          

          {/* Twinkling Stars - slightly larger, fewer */}
          <div className="absolute top-[15%] left-[60%] w-3 h-3 bg-white rounded-full shadow-xl" style={starTwinkleAnimation}></div>
          <div className="absolute top-[65%] left-[20%] w-2.5 h-2.5 bg-yellow-100 rounded-full shadow-lg" style={{...starTwinkleAnimation, animationDelay: '0.5s'}}></div>
          <div className="absolute top-[40%] right-[15%] w-3.5 h-3.5 bg-white rounded-full shadow-2xl" style={{...starTwinkleAnimation, animationDelay: '1s'}}></div>
          <div className="absolute bottom-[20%] left-[40%] w-2 h-2 bg-yellow-200 rounded-full shadow-md" style={{...starTwinkleAnimation, animationDelay: '1.5s'}}></div>

           {/* Optional: A bigger "hero" star using the SVG icon */}
           <StarIcon className="absolute top-[8%] right-[30%] w-8 h-8 text-yellow-300 opacity-90" style={{...starTwinkleAnimation, animationDelay: '0.2s', filter: 'drop-shadow(0 0 5px #fff)'}}/>
        </>
      )}

      <UnicornComponent unicorn={unicorn} />
      {donuts.map((donut) => (
        <DonutComponent key={donut.id} donut={donut} />
      ))}
      <ScoreDisplay score={score} missedDonuts={missedDonuts} level={level} />
    </div>
  );
};

export default GameArea;

// Add to your global CSS or a <style> tag in index.html for Tailwind JIT
// For .animation-delay-500, .animation-delay-1000
// @layer utilities {
//   .animation-delay-200 { animation-delay: 0.2s; }
//   .animation-delay-500 { animation-delay: 0.5s; }
//   .animation-delay-1000 { animation-delay: 1s; }
// }
// Add animation-pulse-slow for clouds
// @keyframes pulse-slow {
//   0%, 100% { opacity: 0.7; transform: scale(1); }
//   50% { opacity: 0.9; transform: scale(1.03); }
// }
// .animate-pulse-slow {
//   animation: pulse-slow 5s infinite alternate ease-in-out;
// }
// These are best placed in index.html style tag or your main CSS file.
// For this exercise, assuming Tailwind might pick up animation-delay or can be added if needed.
// Added twinkle animation keyframes directly in component for encapsulation.
// Added animate-pulse-slow keyframes for clouds for subtle movement.
