import React, { useState } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { border, borderColor, styled } from '@mui/system';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const NightLightToggle = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const handleToggle = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div
      className={`flex items-center ${
        isNightMode
          ? 'bg-panorama-blue'
          : 'bg-ambrosia-ivory border border-panorama-blue'
      } w-full h-20 rounded-md p-4`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <p
          className={`line-clamp-1 font-semibold text-pretty text-xl sm:text-2xl ${
            isNightMode ? 'text-ambrosia-ivory' : 'text-panorama-blue'
          }`}
        >
          <LightbulbIcon sx={{ fontSize: 56 }} />
          Night Light
        </p>

        <Switch
  checked={isNightMode}
  onChange={handleToggle}
  sx={{
    width: 51,
    height: 32,
    padding: 0,
    display: 'flex', // Helps to center the thumb perfectly
    alignItems: 'center', // Vertically centers the thumb
    '& .MuiSwitch-switchBase': {
      padding: 2, // Adjusts the starting position
      boxShadow: 'none',
      '&.Mui-checked': {
        transform: 'translateX(22px)', // Moves the thumb to the right edge when checked
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          backgroundColor: '#3ebdc6', // Thumb color when checked
          border: '4px solid #fff4ea', // Border for thumb when checked
          opacity : 1,
          transition: 'background-color 300ms ease, border-color 300ms ease'
        },
        '& + .MuiSwitch-track': {
          backgroundColor: '#fff4ea', // Track color when checked
          border: '4px solid #fff4ea', // Border for track when checked
          opacity : 1,
          transition: 'background-color 300ms ease, border-color 300ms ease'
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      transform: 'translateX(-15px) translateY(-14px)',
      width: 28,
      height: 28,
      backgroundColor: '#fff4ea', // Default thumb color when unchecked
      border: '4px solid #3ebdc6', // Border for thumb when unchecked
      opacity : 1,
      transition: 'background-color 300ms ease, border-color 300ms ease'
    },
    '& .MuiSwitch-track': {
      backgroundColor: '#fff4ea', // Default track color when unchecked
      borderRadius: 16, // Round the track
      border: '4px solid #3ebdc6', // Border for track when unchecked
      position: 'relative', // Ensures proper alignment with thumb
      opacity : 1,
      transition: 'background-color 300ms ease, border-color 300ms ease'
    },
  }}
/>


      </div>
    </div>
  );
};

export default NightLightToggle;

