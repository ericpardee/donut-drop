export interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Donut extends GameObject {
  caught: boolean;
  missed: boolean;
}

export interface Unicorn extends GameObject {
  facingDirection: 'left' | 'right';
  isJumping: boolean;
  velocityY: number;
}

export enum GameState {
  StartScreen,
  Playing,
  GameOver,
  EnteringHighScore // New state for initials input
}

export interface LeaderboardEntry {
  initials: string;
  score: number;
  id: string; // Unique ID for key prop in React
}