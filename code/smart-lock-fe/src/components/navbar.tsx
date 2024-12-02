'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import useMediaQuery from '@mui/material/useMediaQuery';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import SettingsIcon from '@mui/icons-material/Settings';
import { DASHBOARD_ROUTE, LOG_ROUTE, PROFILE_ROUTE } from '@/routes';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px)');

  const getIconSize = () => {
    if (isSmallScreen) return '28px';
    if (isMediumScreen) return '30px';
    if (isLargeScreen) return '32px';
    return '28px'; // Default size
  };

  // Define actions with routes and icons
  const actions = [
    { icon: <SpaceDashboardIcon />, route: DASHBOARD_ROUTE },
    { icon: <VerticalSplitIcon />, route: LOG_ROUTE },
    { icon: <SettingsIcon />, route: PROFILE_ROUTE },
  ];

  // Safe handling of `pathname` for determining the active tab
  const currentTab = pathname
    ? actions.findIndex((action) => pathname === action.route || pathname.startsWith(action.route + '/'))
    : 0; // Default to 0 if pathname is not yet available


  const renderAction = (index: number, icon: React.JSX.Element, route: string) => (
    <div
      key={index}
      className="flex justify-center items-center w-1/3" // Each item takes 1/3 width
    >
      <BottomNavigationAction
        icon={React.cloneElement(icon, { sx: { fontSize: getIconSize(), color: currentTab === index ? '#fafafa' : '#061E3A' } })}
        sx={{
          flexGrow: 1,
          maxWidth: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid #061E3A',
          backgroundColor: currentTab === index ? '#061E3A' : '#fafafa',
          '& .MuiBottomNavigationAction-label': { color: currentTab === index ? '#fafafa' : '#061E3A' },
        }}
        className="rounded-xl transition-all duration-300 ease-in-out"
        onClick={() => router.push(route)} // Navigate to the route
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
        value={currentTab >= 0 ? currentTab : false} // Ensure value is valid
        className="transition-all duration-300 ease-in-out"
      >
        {actions.map((action, index) => renderAction(index, action.icon, action.route))}
      </BottomNavigation>
    </div>
  );
};

export default NavBar;
