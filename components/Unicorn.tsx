
import React from 'react';
import type { Unicorn as UnicornType } from '../types';
import { UnicornIcon } from '../constants';

interface UnicornProps {
  unicorn: UnicornType;
}

const UnicornComponent: React.FC<UnicornProps> = ({ unicorn }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${unicorn.x}px`,
        top: `${unicorn.y}px`,
        width: `${unicorn.width}px`,
        height: `${unicorn.height}px`,
        // border: '1px solid lime' // For debug collision box
      }}
    >
      <UnicornIcon 
        className="w-full h-full" 
        style={{ 
          transform: unicorn.facingDirection === 'left' ? 'scaleX(-1)' : 'none',
          transition: 'transform 0.1s ease-out' // Optional: smooth flip
        }} 
      />
    </div>
  );
};

export default UnicornComponent;