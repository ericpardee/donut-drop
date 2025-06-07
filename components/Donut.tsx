
import React from 'react';
import type { Donut as DonutType } from '../types';
import { DonutIcon } from '../constants';

interface DonutProps {
  donut: DonutType;
}

const DonutComponent: React.FC<DonutProps> = ({ donut }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${donut.x}px`,
        top: `${donut.y}px`,
        width: `${donut.width}px`,
        height: `${donut.height}px`,
        // border: '1px solid cyan' // For debug collision box
      }}
      className="transition-transform duration-100 ease-linear" // For potential catch/miss animations
    >
      <DonutIcon className="w-full h-full" />
    </div>
  );
};

export default DonutComponent;
