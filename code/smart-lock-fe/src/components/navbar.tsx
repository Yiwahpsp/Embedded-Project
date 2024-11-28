'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useMediaQuery from '@mui/material/useMediaQuery';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px)');

  const getIconSize = () => {
    if (isSmallScreen) return '28px';
    if (isMediumScreen) return '30px';
    if (isLargeScreen) return '32px';
    return '28px'; // Default size
  };

  const actions = [
    { icon: <SpaceDashboardIcon />, route: '/dashboard' },
    { icon: <VerticalSplitIcon />, route: '/log' },
    { icon: <SettingsIcon />, route: '/profile' },
  ];

  const renderAction = (index: number, icon: React.JSX.Element, route: string) => (
    <div
      key={index}
      className="flex justify-center items-center w-1/3" // Ensures each action is centered and takes 1/3 width
    >
      <BottomNavigationAction
        icon={React.cloneElement(icon, { sx: { fontSize: getIconSize, color: value === index ? '#fafafa' : '#061E3A' } })}
        sx={{
          flexGrow: 1, // Ensures it stretches to fill the wrapper
          maxWidth: '100%', // Prevents Material UI from applying default widths
          justifyContent: 'center', // Centers the content
          alignItems: 'center',
          padding: '12px',
          border: '1px solid #061E3A',
          backgroundColor: value === index ? '#061E3A' : '#fafafa',
          '& .MuiBottomNavigationAction-label': { color: value === index ? '#fafafa' : '#061E3A' },
        }}
        className="rounded-xl transition-all duration-300 ease-in-out"
        onClick={() => {
          setValue(index);
          router.push(route);
        }}
      />
    </div>
  );

  return (
    <div className="bottom-0 z-10 fixed mx-auto border-t-2 w-full lg:max-w-lg h-24">
      <BottomNavigation
        sx={{
          display: 'flex',
          padding: '12px 12px',
          gap: '12px',
          backgroundColor: '#fafafa',
          width: '100%',
          alignItems: 'center',
          height: '100%',
        }}
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        className="transition-all duration-300 ease-in-out"
      >
        {actions.map((action, index: number) => renderAction(index, action.icon, action.route))}
      </BottomNavigation>
    </div>
  );
};

export default NavBar;
