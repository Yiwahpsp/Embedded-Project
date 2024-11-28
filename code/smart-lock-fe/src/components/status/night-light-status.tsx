import React, { useState } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { border, borderColor, styled } from '@mui/system';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const NightLightStatus = ({
  status,
  handleChange
}: {
  status: boolean,
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}) => {
  return (
    <div
      className={`flex flex-row justify-between items-center w-full rounded-xl p-4 border-panorama-blue 
        ${status
          ? 'bg-panorama-blue'
          : 'bg-ambrosia-ivory border'
        }`}
    >
      <div
        className={`flex flex-row items-center gap-1 ${status ? 'text-ambrosia-ivory' : 'text-panorama-blue'}`}
      >
        <LightbulbIcon sx={{ fontSize: 32 }} />
        <p className='line-clamp-1 w-full font-semibold text-pretty text-xl sm:text-2xl'>
          Night Light
        </p>
      </div>

      <Switch
        checked={status}
        onChange={handleChange}
        sx={{
          width: 51,
          height: 32,
          padding: 0,
          scale: 0.8,
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
                border: '4px solid #fafafa', // Border for thumb when checked
                opacity: 1,
                transition: 'background-color 300ms ease, border-color 300ms ease'
              },
              '& + .MuiSwitch-track': {
                backgroundColor: '#fafafa', // Track color when checked
                border: '4px solid #fafafa', // Border for track when checked
                opacity: 1,
                transition: 'background-color 300ms ease, border-color 300ms ease'
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            transform: 'translateX(-15px) translateY(-14px)',
            width: 28,
            height: 28,
            backgroundColor: '#fafafa', // Default thumb color when unchecked
            border: '4px solid #3ebdc6', // Border for thumb when unchecked
            opacity: 1,
            transition: 'background-color 300ms ease, border-color 300ms ease'
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#fafafa', // Default track color when unchecked
            borderRadius: 16, // Round the track
            border: '4px solid #3ebdc6', // Border for track when unchecked
            position: 'relative', // Ensures proper alignment with thumb
            opacity: 1,
            transition: 'background-color 300ms ease, border-color 300ms ease'
          },
        }}
      />
    </div>
  );
};

export default NightLightStatus;

