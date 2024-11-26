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

        <IOSSwitch checked={isNightMode} onChange={handleToggle} />
      </div>
    </div>
  );
};

export default NightLightToggle;

const IOSSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
  width: 51.2,
  height: 32,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(19px)',
      color: '#3ebdc6',
      '& + .MuiSwitch-track': {
        backgroundColor: '#fff4ea',
        opacity: 1,
        border: '2px solid #3ebdc6',
        borderColor: '#fff4ea',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        // Add styles for disabled + checked state if needed
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      backgroundColor: '#ffcc00', // Change thumb color when focused
      border: '6px solid #ff9900', // Optional: Change border color too
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: '#3ebdc6',
      border: '6px solid #ff9900',
     
    },
  },
  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,
  
     // Default thumb color
    border: '6px solid #3ebdc6',
    transition: 'border 300ms ease, background-color 300ms ease',
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    backgroundColor: '#fff4ea',
    border: '6px solid #3ebdc6',
    transition: 'background-color 500ms ease, border 300ms ease',
    opacity: 1,
  },
}));

