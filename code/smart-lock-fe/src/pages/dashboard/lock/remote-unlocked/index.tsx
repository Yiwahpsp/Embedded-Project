'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@/components/button';
import LockIcon from '@mui/icons-material/Lock';
import { TextField } from '@mui/material';

export default function RemoteUnlockedPage() {
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const router = useRouter();

  const handleRemoteUnlocked = () => {
    // Reset previous error
    setPasswordError('');

    // Password validation logic
    if (password.length === 0 || password.length > 50) {
      setPasswordError('Password must be between 1 and 50 characters.');
      return;
    }

    // If validation is successful, proceed
    // Placeholder logic for unlocking, replace with your actual logic
    console.log('Password submitted:', password);

    // Navigate to the dashboard if successful
    router.push('/dashboard');
  };

  return (
      <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
        <div className="relative flex flex-col w-full">
          <button
            className="top-0 left-0 absolute"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <KeyboardBackspaceIcon sx={{ fontSize: 24 }} />
          </button>
          <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Remote Unlocked</h1>
        </div>

        <div className="flex justify-center items-start mx-auto w-full max-w-lg">
          <LockIcon className="text-panorama-blue" sx={{ fontSize: 200 }} />
        </div>
        <div className="flex flex-col justify-start items-start gap-6 mx-auto w-full max-w-lg">
          <div className="flex flex-col justify-start items-start gap-2 w-full" >
            <p className='font-medium text-lg text-primary md:text-xl'>Enter password for unlocked your smart lock</p>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label=""
              type="password"
              fullWidth
              variant="standard"
              error={!!passwordError}
              helperText={passwordError}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="danger"
            wFull
            onClick={(e) => {
              e.preventDefault();
              handleRemoteUnlocked();
            }}
          >
            Unlocked
          </Button>
        </div>
      </div>
  );
}
