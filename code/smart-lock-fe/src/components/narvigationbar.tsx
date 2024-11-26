import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
export default function narvigationbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className = {'w-full'}
    >
      <BottomNavigation 
        sx={{ backgroundColor: '#fff4ea' ,  padding: '5px', }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        
       
      >
        <BottomNavigationAction  icon={<SpaceDashboardIcon sx ={{ color: value === 0 ? '#fff4ea' : '#061E3A', size: 24}}/> } 
          sx={{
            backgroundColor: value === 0 ? '#061E3A' : '#fff4ea',
            '& .MuiBottomNavigationAction-label': {
              color: value === 0 ? '#fff4ea' : '#061E3A', 
               
            }
          }} className='border rounded-xl '/>
           <BottomNavigationAction  icon={<VerticalSplitIcon sx ={{ color: value === 1 ? '#fff4ea' : '#061E3A'}}/> } 
          sx={{
            backgroundColor: value === 1 ? '#061E3A' : '#fff4ea',
            '& .MuiBottomNavigationAction-label': {
              color: value === 1 ? '#fff4ea' : '#061E3A', 
            }
          }}  className='border rounded-xl '/>
           <BottomNavigationAction  icon={<SettingsIcon sx ={{ color: value === 2 ? '#fff4ea' : '#061E3A'}}/> } 
          sx={{
            backgroundColor: value === 2 ? '#061E3A' : '#fff4ea',
            '& .MuiBottomNavigationAction-label': {
              color: value === 2 ? '#fff4ea' : '#061E3A', 
            }
          }}  className='border rounded-xl '/>
      </BottomNavigation>
    </Box>
  );
}