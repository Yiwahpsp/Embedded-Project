'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField } from '@mui/material';

import { auth } from '../../../../firebase';
import { signInUser } from '@/firebase/auth';
import Button from '@/components/button';
import { toast } from 'react-toastify';

import { emailRegex } from '@/utils/validate-utils';
import { DASHBOARD_ROUTE, SIGNUP_ROUTE } from '@/routes';

export default function SignIn() {
  console.log(auth.config)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const redirect = '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        await signInUser(email, password);
        toast.success("User signed in successfully"),{
          position: 'top-center'
        }
      } catch (error: any) {
        if (error.code === 'auth/wrong-password') {
          setPasswordError('Incorrect password');
        } else if (error.code === 'auth/user-not-found') {
          setEmailError('No account found with this email');
        } else {
          toast.error('An error occurred. Please try again later.'),{
            position: 'top-center'
          };
        }
      } finally {
        setLoading(false)
        router.push(DASHBOARD_ROUTE)
      }
    }
  };

  return (
    <>
      <div className='p-7 w-full'>
        <div className="flex flex-col justify-start items-start gap-20 mx-auto mt-20 w-full max-w-sm">
          <p className='w-full font-semibold text-4xl text-center md:text-5xl'>Smart Lock</p>
          <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
            <h1 className="font-semibold text-panorama-blue text-xl md:text-2xl">Sign In to Your Account</h1>
            <div className='flex flex-col gap-5 mx-auto w-full max-w-lg'>
              <TextField
                required
                id='email'
                variant='standard'
                label='Email'
                className='w-full'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                required
                id='password'
                variant='standard'
                type='password'
                label='Password'
                className='w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </div>
            <div className='flex flex-col justify-start items-end gap-1 w-full'>
              <Button
                variant=''
                onClick={handleSignIn}
                wFull
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
              <Link href={SIGNUP_ROUTE} className='text-sm md:text-base'>Do not have an account? <span className='text-panorama-blue'>Sign up</span></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
