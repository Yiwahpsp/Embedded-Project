'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { TextField } from '@mui/material'

import { createUser } from '@/firebase/auth'
import { useAuth } from '@/contexts/authContext'
import Button from '@/components/button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

import { emailRegex } from '@/utils/validate-utils'

export default function SignUP() {
  const userLoggedIn = useAuth();
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  // State variables for form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // State variables for validation errors
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  useEffect(() => {
    if (userLoggedIn) {
      router.push('/dashboard');
    }
  }, [userLoggedIn, router]);

  // Function to validate form
  const validateForm = () => {
    let isValid = true

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address')
      isValid = false
    } else {
      setEmailError('')
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    } else {
      setPasswordError('')
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      isValid = false
    } else {
      setConfirmPasswordError('')
    }

    return isValid
  }

  // Function to handle form submission
  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (validateForm()) {
      setLoading(true)
      try {
        await createUser(email, password)
      } catch (error: any) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError("The email address is already in use by another account.");
          case "auth/invalid-email":
            setEmailError("The email address is not valid.");
          case "auth/weak-password":
            setPasswordError("The password is too weak. Please use a stronger password.");
          case "auth/operation-not-allowed":
            setDialogMessage("Email/password accounts are currently disabled.");
          default:
            setDialogMessage("An unknown error occurred.");
        }
        setDialogOpen(true)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      {userLoggedIn && (router.push('/dashboard'))}
      <div className="flex flex-col justify-start items-start gap-20 mx-auto mt-20 w-full max-w-sm">
        <p className='w-full font-semibold text-4xl text-center md:text-5xl'>Smart Lock</p>
        <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
          <h1 className="font-semibold text-panorama-blue text-xl md:text-2xl">Create Your Account</h1>
          <div className='flex flex-col gap-5 w-full'>
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
            <TextField
              required
              id='confirm-password'
              variant='standard'
              type='password'
              label='Confirm Password'
              className='w-full'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          </div>
          <div className='flex flex-col justify-start items-end gap-1 w-full'>
            <Button
              variant=''
              onClick={handleSignUp}
              wFull
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
            <Link
              href={'/auth/signin'}
              className='text-sm md:text-base'
            >Already have an account? <span className='text-panorama-blue'>Sign in</span></Link>
          </div>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '4px',
            width: '100%',
            maxWidth: '384px',
            backgroundColor: '#fafafa',
          }
        }}
      >
        <DialogTitle className="font-semibold text-lg md:text-xl">
          Sign Up Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-sm md:text-base">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            wFull
            variant="secondary"
            onClick={() => setDialogOpen(false)}
            isSmall
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
} 