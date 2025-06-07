import React from 'react';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const UNICORN_WIDTH = 120; // Adjusted for new SVG aspect ratio
export const UNICORN_HEIGHT = 75; // Adjusted for new SVG aspect ratio
export const UNICORN_SPEED = 25;
export const UNICORN_INITIAL_Y_OFFSET = 20; // Moves unicorn slightly up from the absolute bottom

export const DONUT_WIDTH = 40;
export const DONUT_HEIGHT = 40;
export const DONUT_FALL_SPEED = 4; // Pixels per game tick
export const DONUT_SPAWN_INTERVAL = 1800; // Milliseconds

export const MAX_MISSED_DONUTS = 5;

// Horn collision area relative to unicorn's top-center
export const HORN_VISUAL_X_RATIO = 0.79;
export const HORN_CATCH_WIDTH = 30;
export const HORN_CATCH_OFFSET_Y = 2;
export const HORN_CATCH_HEIGHT = 25;

// Dash Mechanics
export const DASH_SPEED_MULTIPLIER = 1.75;
export const DASH_DURATION_MS = 300;
export const DASH_CONSECUTIVE_PRESS_THRESHOLD = 2;
export const DASH_MAX_INTERVAL_MS = 200;

// Jump Mechanics
export const JUMP_INITIAL_VELOCITY = -18;
export const GRAVITY = 0.9;

// Leaderboard
export const LEADERBOARD_MAX_ENTRIES = 3;
export const LOCAL_STORAGE_LEADERBOARD_KEY = 'donutDropLeaderboard';

// Leveling
export const SCORE_TO_LEVEL_UP = 100;


export const UnicornIcon = ({ className, style }: { className?: string; style?: React.CSSProperties; }) => (
  <svg
    width={UNICORN_WIDTH}
    height={UNICORN_HEIGHT}
    viewBox="0 0 120 75"
    className={className}
    style={style}
  >
    <defs>
      <linearGradient id="unicornBodyGradientNew" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#fbfbfb', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#e0e0e8', stopOpacity: 1}} />
      </linearGradient>

      <linearGradient id="unicornHornGradientNew" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#a0e9ff', stopOpacity: 1}} />
        <stop offset="60%" style={{stopColor: '#4ac7f5', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#0077cc', stopOpacity: 1}} />
      </linearGradient>

      <linearGradient id="rainbowManeTailGradient" x1="0%" y1="0%" x2="100%" y2="30%">
        <stop offset="0%" style={{stopColor: '#ff5252', stopOpacity: 1}} />
        <stop offset="15%" style={{stopColor: '#ff9100', stopOpacity: 1}} />
        <stop offset="30%" style={{stopColor: '#ffea00', stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: '#00e676', stopOpacity: 1}} />
        <stop offset="70%" style={{stopColor: '#2979ff', stopOpacity: 1}} />
        <stop offset="85%" style={{stopColor: '#d500f9', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ff4081', stopOpacity: 1}} />
      </linearGradient>

      <filter id="subtleGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <g transform="translate(2, 0)">
      <path d="M20 56 Q 15 66, 18 73 L 22 73 Q 25 66, 30 56 Z" fill="url(#unicornBodyGradientNew)" stroke="#c8c8d0" strokeWidth="0.5" />
      <path d="M30 57 Q 25 67, 28 74 L 32 74 Q 35 67, 40 57 Z" fill="url(#unicornBodyGradientNew)" stroke="#c8c8d0" strokeWidth="0.5" transform="translate(-6, 0.5)" />

      <path d="M78 52 Q 88 57, 93 47 Q 91 67, 83 70 L R79 67 Q 83 52, 78 52 Z" fill="url(#unicornBodyGradientNew)" stroke="#c8c8d0" strokeWidth="0.5" />
      <path d="M63 56 Q 58 66, 61 73 L 65 73 Q 68 66, 73 56 Z" fill="url(#unicornBodyGradientNew)" stroke="#c8c8d0" strokeWidth="0.5" />

      <path d="M25 56 Q 20 31, 50 26 T 83 36 Q 93 56, 78 61 Q 50 71, 25 56 Z" fill="url(#unicornBodyGradientNew)" stroke="#b0b0b8" strokeWidth="1"/>

      <path d="M80 33 C 75 21, 85 11, 95 16 C 100 26, 95 36, 85 39 S 83 41, 80 33 Z" fill="url(#unicornBodyGradientNew)" stroke="#b0b0b8" strokeWidth="1"/>

      <polygon points="93,17 98,2 91,20" fill="url(#unicornHornGradientNew)" stroke="#005a9c" strokeWidth="0.75" style={{filter: 'url(#subtleGlow)'}}/>

      <ellipse cx="96" cy="23" rx="3.5" ry="2.5" fill="#1c2e40" />
      <ellipse cx="97" cy="22.5" rx="1" ry="0.8" fill="white" />

      <path d="M101 29 Q 102 30, 100 31" stroke="#707070" strokeWidth="0.5" fill="none" />

      <path d="M20 41 Q -5 46, -10 31 C -5 26, 5 36, 20 41 Z" fill="url(#rainbowManeTailGradient)" opacity="0.85" transform="rotate(10 20 41)" />
      <path d="M22 43 Q -2 51, -7 36 C -2 31, 8 41, 22 43 Z" fill="url(#rainbowManeTailGradient)" opacity="0.75" transform="rotate(-5 22 43) translate(0, -2) scale(0.9)" />
      <path d="M18 39 Q -7 43, -12 29 C -7 24, 3 33, 18 39 Z" fill="url(#rainbowManeTailGradient)" opacity="0.65" transform="rotate(20 18 39) translate(2, 1) scale(0.8)" />

      <path d="M75 26 Q 80 6, 90 11 Q 100 16, 85 29 Z" fill="url(#rainbowManeTailGradient)" opacity="0.85" />
      <path d="M77 24 Q 85 4, 95 9 Q 105 13, 87 27 Z" fill="url(#rainbowManeTailGradient)" opacity="0.75" transform="translate(2,-2) scale(0.9)" />
      <path d="M73 28 Q 77 -4, 87 6 Q 97 11, 83 31 Z" fill="url(#rainbowManeTailGradient)" opacity="0.65" transform="translate(-2,2) scale(0.85)" />
    </g>
  </svg>
);

export const DonutIcon = ({ className }: { className?: string; }) => (
  <svg
    width={DONUT_WIDTH}
    height={DONUT_HEIGHT}
    viewBox="0 0 40 40"
    className={className}
  >
    <defs>
      <radialGradient id="donutMainGradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: '#F5DEB3', stopOpacity:1}} />
        <stop offset="70%" style={{stopColor: '#DEB887', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor: '#D2B48C', stopOpacity:1}} />
      </radialGradient>
      <linearGradient id="donutGlazeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#FFB6C1', stopOpacity: 0.9}} />
        <stop offset="100%" style={{stopColor: '#FF69B4', stopOpacity: 0.95}} />
      </linearGradient>
      {/* Mask to create the donut hole. White parts are visible, black parts are transparent. */}
      <mask id="donutRingMask">
        <rect width="40" height="40" fill="white" /> {/* Donut body is visible */}
        <circle cx="20" cy="20" r="7" fill="black" />   {/* Center hole is cut out (transparent) */}
      </mask>
    </defs>

    {/* Donut body (drawn as a full circle, then masked to a ring) */}
    <circle cx="20" cy="20" r="18" fill="url(#donutMainGradient)" mask="url(#donutRingMask)" />

    {/* Group for glaze and sprinkles, to apply the same mask */}
    <g mask="url(#donutRingMask)">
      {/* Glaze */}
      <path
        d="M2,20 Q10,10 20,18 T38,20 Q30,32 20,22 T2,20 Z"
        fill="url(#donutGlazeGradient)"
        stroke="#FF1493"
        strokeWidth="0.5"
      />
      {/* Sprinkles */}
      <rect x="10" y="15" width="2" height="4" fill="#FF0000" transform="rotate(30 11 17)" className="opacity-80"/>
      <rect x="25" y="12" width="2" height="4" fill="#00FF00" transform="rotate(-20 26 14)" className="opacity-80"/>
      <rect x="15" y="25" width="4" height="2" fill="#0000FF" transform="rotate(50 17 26)" className="opacity-80"/>
      <rect x="28" y="22" width="4" height="2" fill="#FFFF00" transform="rotate(-10 30 23)" className="opacity-80"/>
      <rect x="20" y="8" width="2" height="4" fill="#FFA500" transform="rotate(10 21 10)" className="opacity-80"/>
    </g>
  </svg>
);


export const HeartIcon = ({ className = "w-6 h-6" } : {className?: string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

export const LeftArrowIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export const RightArrowIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

export const UpArrowIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 17a1 1 0 01-1-1V4.414l-3.293 3.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 11-1.414 1.414L11 4.414V16a1 1 0 01-1 1z" clipRule="evenodd"/>
  </svg>
);

export const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.293 4.293A8 8 0 0011.025 2.023L10 0l-1.025 2.023A8.001 8.001 0 002.707 4.293a1 1 0 00-1.414 1.414c.009.01.023.016.032.026A8.003 8.003 0 001 8c0 1.37.347 2.655.945 3.766.09.168.196.326.31.474L2 12.55V17a1 1 0 001 1h14a1 1 0 001-1v-4.55l.745-.31a7.97 7.97 0 00.31-.474C19.653 10.655 20 9.37 20 8a8.003 8.003 0 00-.026-.532 1.006 1.006 0 00.032-.026 1 1 0 00-1.414-1.414zM10 16a3 3 0 110-6 3 3 0 010 6zm0-8a1 1 0 100-2 1 1 0 000 2zM5 11.55l.372-.156a6.002 6.002 0 010-2.788L5 8.45V11.55zm10 0v-3.1l-.372.156a6.002 6.002 0 010 2.788L15 11.55z" />
  </svg>
);

export const MoonIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.035c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2.035 12 2.035zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8c1.074 0 2.097.223 3.043.625-.527.789-.843 1.722-.843 2.75 0 2.206 1.794 4 4 4 .945 0 1.809-.307 2.53-.801C20.797 17.161 19.156 20.035 12 20.035z" fillRule="evenodd" clipRule="evenodd"/>
  </svg>
);

// Simple star icon, more complex stars can be done with styled divs for variety
export const StarIcon = ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties; }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27l-5.18 3.73 1.64-7.03L2.86 9.12l7.16-.61L12 2l2.98 6.51 7.16.61-5.6 4.85 1.64 7.03z"/>
  </svg>
);