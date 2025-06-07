# 🦄🍩 Donut Drop

A whimsical browser game where you control a magical unicorn to catch falling donuts on your horn! Built with React, TypeScript, and Vite.

## 🎮 How to Play

- **Move**: Use A/D keys or Left/Right arrow keys to move the unicorn
- **Jump**: Press W or Up arrow to jump and catch donuts in mid-air
- **Dash**: Double-tap movement keys quickly for a speed boost
- **Catch donuts** on the unicorn's horn to score points
- **Don't let donuts hit the ground** - you can only miss 5 before game over!

## 🚀 Getting Started

**Prerequisites:** Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to the local development URL (typically `http://localhost:5173`)

## 🎯 Features

- Smooth unicorn movement with physics-based jumping
- Dash mechanics for quick movements
- Progressive difficulty with increasing donut spawn rates
- Local leaderboard to track high scores
- Beautiful hand-crafted SVG graphics
- Responsive game area that scales to your screen

## 🛠️ Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Custom SVG Graphics** - Hand-crafted unicorn and donut icons
- **Local Storage** - Persistent leaderboard

## 🎨 Development Notes

This game was primarily vibe coded using **Google Gemini** with a little help from **Claude Sonnet** for specific refinements. The development focused on creating a fun, playful experience with smooth gameplay mechanics and delightful visuals.

## 🏗️ Project Structure

```
donut-drop/
├── components/          # React components
│   ├── GameArea.tsx    # Main game logic and rendering
│   ├── Unicorn.tsx     # Unicorn character component
│   ├── Donut.tsx       # Donut item component
│   └── ...
├── constants.tsx       # Game constants and SVG icons
├── types.ts           # TypeScript type definitions
└── App.tsx            # Main app component
```

## 🎪 Game Mechanics

- **Movement**: Smooth left/right movement with momentum
- **Jumping**: Physics-based jumping with gravity
- **Dash System**: Double-tap detection for speed boosts
- **Collision Detection**: Precise horn-to-donut collision detection
- **Scoring**: Points awarded for each caught donut
- **Lives System**: Limited misses before game over

Enjoy catching those donuts! 🦄✨
