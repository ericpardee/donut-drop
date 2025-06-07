
import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import type { Unicorn as UnicornType, Donut as DonutType, LeaderboardEntry } from './types';
import { GameState } from './types';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  UNICORN_WIDTH,
  UNICORN_HEIGHT,
  UNICORN_SPEED,
  UNICORN_INITIAL_Y_OFFSET,
  DONUT_WIDTH,
  DONUT_HEIGHT,
  DONUT_FALL_SPEED,
  DONUT_SPAWN_INTERVAL,
  MAX_MISSED_DONUTS,
  HORN_VISUAL_X_RATIO,
  HORN_CATCH_WIDTH,
  HORN_CATCH_OFFSET_Y,
  HORN_CATCH_HEIGHT,
  LeftArrowIcon,
  RightArrowIcon,
  UpArrowIcon, 
  DASH_SPEED_MULTIPLIER,
  DASH_DURATION_MS,
  DASH_CONSECUTIVE_PRESS_THRESHOLD,
  DASH_MAX_INTERVAL_MS,
  JUMP_INITIAL_VELOCITY, 
  GRAVITY, 
  LEADERBOARD_MAX_ENTRIES,
  LOCAL_STORAGE_LEADERBOARD_KEY,
  SCORE_TO_LEVEL_UP, 
  TrophyIcon, 
} from './constants';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import GameArea from './components/GameArea';

interface LastInputInfo {
  direction: 'left' | 'right' | null;
  time: number;
  count: number;
}

interface ActiveDashInfo {
  direction: 'left' | 'right';
  endTime: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.StartScreen);
  const [score, setScore] = useState<number>(0);
  const [missedDonuts, setMissedDonuts] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [showLevelUpMessage, setShowLevelUpMessage] = useState<boolean>(false);

  const [unicorn, setUnicorn] = useState<UnicornType>({
    id: 'unicorn',
    x: GAME_WIDTH / 2 - UNICORN_WIDTH / 2,
    y: GAME_HEIGHT - UNICORN_HEIGHT - UNICORN_INITIAL_Y_OFFSET,
    width: UNICORN_WIDTH,
    height: UNICORN_HEIGHT,
    facingDirection: 'right',
    isJumping: false, 
    velocityY: 0, 
  });
  const [donuts, setDonuts] = useState<DonutType[]>([]);
  const [scale, setScale] = useState<number>(1);

  const [lastInputInfo, setLastInputInfo] = useState<LastInputInfo>({ direction: null, time: 0, count: 0 });
  const [activeDash, setActiveDash] = useState<ActiveDashInfo | null>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentPlayerInitials, setCurrentPlayerInitials] = useState<string>("");

  const lastDonutSpawnTimeRef = useRef<number>(0);
  const gameLoopRequestRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem(LOCAL_STORAGE_LEADERBOARD_KEY);
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from localStorage:", error);
      setLeaderboard([]);
    }
  }, []);

  const saveLeaderboard = useCallback((updatedLeaderboard: LeaderboardEntry[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error("Failed to save leaderboard to localStorage:", error);
    }
  }, []);


  const checkAndPrepareForHighScoreEntry = useCallback((currentScore: number) => {
    const isHighScore = leaderboard.length < LEADERBOARD_MAX_ENTRIES || 
                        currentScore > leaderboard[leaderboard.length - 1]?.score ||
                        (leaderboard.length > 0 && currentScore > Math.min(...leaderboard.map(e => e.score)));

    if (isHighScore && currentScore > 0) {
      setGameState(GameState.EnteringHighScore);
    } else {
      setGameState(GameState.GameOver);
    }
  }, [leaderboard]);


  const handleInitialsSubmit = useCallback(() => {
    if (currentPlayerInitials.trim().length !== 3) return;

    const newEntry: LeaderboardEntry = {
      initials: currentPlayerInitials.trim().toUpperCase(),
      score: score, // This score is from state, which should be updated by the time this is called
      id: `score-${Date.now()}-${Math.random()}`
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, LEADERBOARD_MAX_ENTRIES);

    saveLeaderboard(updatedLeaderboard);
    setCurrentPlayerInitials("");
    setGameState(GameState.GameOver);
  }, [currentPlayerInitials, score, leaderboard, saveLeaderboard]);


  useLayoutEffect(() => {
    const calculateScale = () => {
      const nativeGameWidth = GAME_WIDTH;
      const controlsHeightEstimate = 120; 
      const nativeTotalHeight = GAME_HEIGHT + controlsHeightEstimate;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const scaleBasedOnWidth = viewportWidth / nativeGameWidth;
      const scaleBasedOnHeight = viewportHeight / nativeTotalHeight;
      
      let newScale = Math.min(scaleBasedOnWidth, scaleBasedOnHeight);
      
      newScale = Math.min(1, newScale); 
      newScale *= 0.98; 

      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    window.addEventListener('orientationchange', calculateScale);

    return () => {
      window.removeEventListener('resize', calculateScale);
      window.removeEventListener('orientationchange', calculateScale);
    };
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setMissedDonuts(0);
    setLevel(1);
    setShowLevelUpMessage(false);
    setUnicorn({
      id: 'unicorn',
      x: GAME_WIDTH / 2 - UNICORN_WIDTH / 2,
      y: GAME_HEIGHT - UNICORN_HEIGHT - UNICORN_INITIAL_Y_OFFSET,
      width: UNICORN_WIDTH,
      height: UNICORN_HEIGHT,
      facingDirection: 'right',
      isJumping: false, 
      velocityY: 0,   
    });
    setDonuts([]);
    setLastInputInfo({ direction: null, time: 0, count: 0 });
    setActiveDash(null);
    setCurrentPlayerInitials("");
    lastDonutSpawnTimeRef.current = performance.now();
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState(GameState.Playing);
  }, [resetGame]);

  const restartGame = useCallback(() => {
    resetGame();
    setGameState(GameState.Playing);
  }, [resetGame]);

  const handleMoveUnicorn = useCallback((direction: 'left' | 'right') => {
    if (gameState !== GameState.Playing) return;

    setUnicorn(prevUnicorn => {
      let currentSpeed = UNICORN_SPEED;
      const currentTime = performance.now();

      if (activeDash && activeDash.direction === direction && currentTime < activeDash.endTime) {
        currentSpeed = UNICORN_SPEED * DASH_SPEED_MULTIPLIER;
      } else if (activeDash && currentTime >= activeDash.endTime) {
        setActiveDash(null); 
      }

      let newX = prevUnicorn.x;
      const newFacingDirection = direction;

      if (direction === 'left') {
        newX = Math.max(0, prevUnicorn.x - currentSpeed);
      } else { 
        newX = Math.min(GAME_WIDTH - UNICORN_WIDTH, prevUnicorn.x + currentSpeed);
      }
      return { ...prevUnicorn, x: newX, facingDirection: newFacingDirection };
    });
  }, [gameState, activeDash]);


  const processInputAttempt = useCallback((direction: 'left' | 'right') => {
    if (gameState !== GameState.Playing) return;

    const currentTime = performance.now();
    let updatedInputInfo = { ...lastInputInfo };

    if (lastInputInfo.direction === direction && currentTime - lastInputInfo.time <= DASH_MAX_INTERVAL_MS) {
      updatedInputInfo.count++;
    } else {
      updatedInputInfo = { direction, time: currentTime, count: 1 };
    }
    setLastInputInfo(updatedInputInfo);

    if (updatedInputInfo.count >= DASH_CONSECUTIVE_PRESS_THRESHOLD) {
      if (!activeDash || activeDash.direction !== direction || currentTime > activeDash.endTime) {
         setActiveDash({ direction, endTime: currentTime + DASH_DURATION_MS });
      }
    }
    handleMoveUnicorn(direction);
  }, [gameState, lastInputInfo, activeDash, handleMoveUnicorn]);

  const handleJump = useCallback(() => {
    if (gameState !== GameState.Playing) return;
    setUnicorn(prevUnicorn => {
      if (!prevUnicorn.isJumping) {
        return { ...prevUnicorn, isJumping: true, velocityY: JUMP_INITIAL_VELOCITY };
      }
      return prevUnicorn;
    });
  }, [gameState]);


  useEffect(() => {
    if (gameState !== GameState.Playing) {
      if (gameLoopRequestRef.current) {
        cancelAnimationFrame(gameLoopRequestRef.current);
      }
      return;
    }

    const gameTick = (currentTime: number) => {
      if (activeDash && currentTime >= activeDash.endTime) {
        setActiveDash(null);
        setLastInputInfo({ direction: null, time: 0, count: 0 });
      }

      setUnicorn(prevUnicorn => {
        if (prevUnicorn.isJumping) {
          let newY = prevUnicorn.y + prevUnicorn.velocityY;
          let newVelocityY = prevUnicorn.velocityY + GRAVITY;
          
          const groundY = GAME_HEIGHT - UNICORN_HEIGHT - UNICORN_INITIAL_Y_OFFSET;
          if (newY >= groundY) {
            newY = groundY;
            newVelocityY = 0;
            return { ...prevUnicorn, y: newY, velocityY: newVelocityY, isJumping: false };
          }
          return { ...prevUnicorn, y: newY, velocityY: newVelocityY };
        }
        return prevUnicorn;
      });
      
      const currentDonutSpawnInterval = DONUT_SPAWN_INTERVAL;
      if (currentTime - lastDonutSpawnTimeRef.current > currentDonutSpawnInterval) {
        lastDonutSpawnTimeRef.current = currentTime;
        const newDonut: DonutType = {
          id: `donut-${currentTime}-${Math.random().toString(36).substr(2, 5)}`,
          x: Math.random() * (GAME_WIDTH - DONUT_WIDTH),
          y: 0 - DONUT_HEIGHT,
          width: DONUT_WIDTH,
          height: DONUT_HEIGHT,
          caught: false,
          missed: false,
        };
        setDonuts(prevDonuts => [...prevDonuts, newDonut]);
      }

      let scoreFromThisTick = score; 
      let missedInThisTick = 0;
      
      // It's important to get the most recent unicorn state for collision detection within this tick.
      let currentUnicornState = unicorn;
      setUnicorn(u => { currentUnicornState = u; return u; });


      setDonuts(prevDonuts => {
        const updatedDonuts = prevDonuts.map(donut => {
          if (donut.caught || donut.missed) return donut;

          const currentDonutFallSpeed = DONUT_FALL_SPEED;
          const newY = donut.y + currentDonutFallSpeed;

          let hornCenterX;
          if (currentUnicornState.facingDirection === 'right') {
            hornCenterX = currentUnicornState.x + currentUnicornState.width * HORN_VISUAL_X_RATIO;
          } else { 
            hornCenterX = currentUnicornState.x + currentUnicornState.width * (1 - HORN_VISUAL_X_RATIO);
          }
          
          const hornCatchMinX = hornCenterX - HORN_CATCH_WIDTH / 2;
          const hornCatchMaxX = hornCenterX + HORN_CATCH_WIDTH / 2;
          const hornCatchMinY = currentUnicornState.y + HORN_CATCH_OFFSET_Y;
          const hornCatchMaxY = currentUnicornState.y + HORN_CATCH_OFFSET_Y + HORN_CATCH_HEIGHT;

          const donutCenterX = donut.x + donut.width / 2;
          const donutBottomY = newY + donut.height;

          if (
            !currentUnicornState.isJumping && // Simplified: only catch if on ground. More complex horn logic might be needed if catching mid-air.
                                         // Or, remove this if horn position is always absolute relative to unicorn.y
            donutBottomY >= hornCatchMinY &&
            newY <= hornCatchMaxY &&    
            donutCenterX >= hornCatchMinX && 
            donutCenterX <= hornCatchMaxX
          ) {
            scoreFromThisTick += 10;
            setScore(s => s + 10); // Update React state

            if (level === 1 && scoreFromThisTick >= SCORE_TO_LEVEL_UP) {
              setLevel(2); // Update React state
              setShowLevelUpMessage(true);
              setTimeout(() => setShowLevelUpMessage(false), 3000);
            }
            return { ...donut, y: newY, caught: true };
          }

          if (newY + donut.height >= GAME_HEIGHT) {
            missedInThisTick++;
            return { ...donut, y: newY, missed: true };
          }
          return { ...donut, y: newY };
        });
        
        if (missedInThisTick > 0) {
            setMissedDonuts(m => m + missedInThisTick); // Update React state
        }
        return updatedDonuts.filter(d => !d.caught && !d.missed);
      });
      
      const totalMissedAfterThisTick = missedDonuts + missedInThisTick;

      if (totalMissedAfterThisTick >= MAX_MISSED_DONUTS) {
        // Check if a level up (from L1 to L2) was triggered in THIS tick
        if (level === 1 && scoreFromThisTick >= SCORE_TO_LEVEL_UP) {
          // Level up is happening, so don't end the game yet.
          // The game loop will continue, and next tick `level` state will be 2.
        } else {
          // No level up, or already on level 2 and game over condition met.
          if (gameLoopRequestRef.current) cancelAnimationFrame(gameLoopRequestRef.current);
          checkAndPrepareForHighScoreEntry(scoreFromThisTick); 
          return; 
        }
      }
      
      gameLoopRequestRef.current = requestAnimationFrame(gameTick);
    };

    gameLoopRequestRef.current = requestAnimationFrame(gameTick);

    return () => {
      if (gameLoopRequestRef.current) {
        cancelAnimationFrame(gameLoopRequestRef.current);
      }
    };
  }, [gameState, unicorn, activeDash, score, missedDonuts, level, checkAndPrepareForHighScoreEntry, GRAVITY, UNICORN_INITIAL_Y_OFFSET, UNICORN_HEIGHT, HORN_VISUAL_X_RATIO, HORN_CATCH_WIDTH, HORN_CATCH_OFFSET_Y, HORN_CATCH_HEIGHT]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState === GameState.EnteringHighScore) {
        if (event.key === 'Enter' && currentPlayerInitials.trim().length === 3) {
            handleInitialsSubmit();
        }
        return; 
      }

      if (gameState !== GameState.Playing && !showLevelUpMessage) {
        if ((gameState === GameState.StartScreen || gameState === GameState.GameOver) && event.key === 'Enter') {
          if (gameState === GameState.StartScreen) startGame();
          else restartGame();
        }
        return;
      }
      if (gameState === GameState.Playing) {
        if (event.key === 'ArrowLeft') {
          processInputAttempt('left');
        } else if (event.key === 'ArrowRight') {
          processInputAttempt('right');
        } else if (event.key === 'ArrowUp') {
          handleJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, processInputAttempt, startGame, restartGame, currentPlayerInitials, handleInitialsSubmit, handleJump, showLevelUpMessage]);

  const handleInitialsChange = (value: string) => {
    const processedValue = value.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
    setCurrentPlayerInitials(processedValue);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-2 sm:p-4 select-none overflow-hidden">
      {gameState === GameState.StartScreen && <StartScreen onStartGame={startGame} leaderboard={leaderboard} />}
      
      {gameState === GameState.Playing && (
        <div 
          style={{
            width: GAME_WIDTH, 
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.1s ease-out',
            position: 'relative', 
          }}
          className="flex flex-col items-center" 
        >
          <GameArea
            unicorn={unicorn}
            donuts={donuts}
            score={score}
            missedDonuts={missedDonuts}
            level={level}
          />
          {showLevelUpMessage && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-20 rounded-lg"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT}} 
            >
              <p className="font-game text-5xl md:text-7xl text-yellow-300 animate-bounce" style={{textShadow: '3px 3px #000'}}>Level Up!</p>
              <p className="font-game text-3xl md:text-4xl text-white mt-4">Welcome to Level {level}!</p>
            </div>
          )}
          <div 
            className="flex justify-around mt-4 w-full px-2"
            style={{ maxWidth: GAME_WIDTH * 0.8 }} 
          >
            <button
              onClick={() => processInputAttempt('left')}
              onTouchStart={(e) => { e.preventDefault(); processInputAttempt('left'); }}
              className="bg-pink-500 text-white font-bold py-5 px-8 rounded-lg shadow-xl active:bg-pink-600 transform active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-300"
              aria-label="Move unicorn left"
            >
              <LeftArrowIcon className="w-12 h-12" />
            </button>
             <button
              onClick={handleJump}
              onTouchStart={(e) => { e.preventDefault(); handleJump(); }}
              className="bg-green-500 text-white font-bold py-5 px-8 rounded-lg shadow-xl active:bg-green-600 transform active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Jump"
            >
              <UpArrowIcon className="w-12 h-12" />
            </button>
            <button
              onClick={() => processInputAttempt('right')}
              onTouchStart={(e) => { e.preventDefault(); processInputAttempt('right'); }}
              className="bg-pink-500 text-white font-bold py-5 px-8 rounded-lg shadow-xl active:bg-pink-600 transform active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-300"
              aria-label="Move unicorn right"
            >
              <RightArrowIcon className="w-12 h-12" />
            </button>
          </div>
        </div>
      )}

      {(gameState === GameState.GameOver || gameState === GameState.EnteringHighScore) && (
        <GameOverScreen
          score={score}
          onRestartGame={restartGame}
          leaderboard={leaderboard}
          showInitialsInput={gameState === GameState.EnteringHighScore}
          currentPlayerInitials={currentPlayerInitials}
          onInitialsChange={handleInitialsChange}
          onInitialsSubmit={handleInitialsSubmit}
        />
      )}
    </div>
  );
};

export default App;
