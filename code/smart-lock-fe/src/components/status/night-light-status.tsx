'use client'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import { getNightLightStatus, updateNightLightStatus } from '@/api/night-light';

interface stateProp {
  display: string;
  value: number;
}

const NightLightStatus = ({
  disabled
}: {
  disabled: boolean;
}) => {
  const [state, setState] = useState<number>(2);

  const allStates = {
    0: {
      display: 'always off',
      value: 0,
    },
    1: {
      display: 'always on',
      value: 1,
    },
    2: {
      display: 'auto',
      value: 2,
    },
  }

  const fetchNightLight = async () => {
    const nightLightData = await getNightLightStatus();
    if (nightLightData === 0 || nightLightData === 1 || nightLightData === 2) {
      setState(nightLightData);
    } else {
      setState(2);
    }
  };

  const handleChangeNightLight = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const value = parseInt(event.currentTarget.value);
    const response = await updateNightLightStatus(value);
    if (!response) {
      return;
    }
    fetchNightLight();
  }

  useEffect(() => {
    fetchNightLight();
  }, []);

  return (
    <div
      className={`flex flex-col gap-5 justify-between items-start w-full rounded-xl p-4 border-panorama-blue bg-ambrosia-ivory border text-panorama-blue`}>
      <div className="flex items-center gap-1 font-semibold text-wrap text-xl md:text-2xl">
        <LightbulbIcon sx={{ fontSize: 32, color: '#3ebdc6' }} />
        <p className="line-clamp-1 overflow-hidden">Night Light</p>
      </div>

      <ButtonGroup
        variant="outlined"
        fullWidth
        aria-label="Basic button group"
        sx={{
          borderColor: '#3ebdc6',
        }}
      >
        {Object.values(allStates).map((item: stateProp, index: number) => (
          <Button
            key={index}
            disabled={disabled}
            value={item.value}
            onClick={handleChangeNightLight}
            sx={{
              backgroundColor: state === index ? '#3ebdc6' : 'transparent',
              color: state === index ? '#fff' : '#3ebdc6',
              borderColor: '#3ebdc6',
              '&:hover': {
                backgroundColor: state === index ? '#3ebdc6' : '#e0f7fa',
              },
              padding: '8px 0px',
            }}
          >
            <p className="font-semibold text-sm md:text-base">{item.display}</p>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default NightLightStatus;
