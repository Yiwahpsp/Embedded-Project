'use client'
import { useState } from 'react'
import { TextField } from '@mui/material'
import Link from 'next/link'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'
import { emailRegex } from '@/utils/validate-utils'

export default function SignUP() {
  const router = useRouter()

  // State variables for form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // State variables for validation errors
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

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
  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (validateForm()) {
      // If form is valid, proceed with sign-up
      router.push('/auth/signin')
    }
  }

  return (
    <div className="flex flex-col justify-start items-start gap-20 mx-auto mt-20 w-full max-w-sm">
      <p className='w-full font-semibold text-4xl text-center md:text-5xl'>Smart Lock</p>
      <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
        <h1 className="font-semibold text-panorama-blue text-xl md:text-2xl">Create Your Account</h1>
        <div className='flex flex-col gap-5 w-full'>
          <TextField
            autoFocus
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
            autoFocus
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
            autoFocus
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
          >
            Sign up
          </Button>
          <Link
            href={'/auth/signin'}
            className='text-sm md:text-base'
          >Already have an account? <span className='text-panorama-blue'>Sign in</span></Link>
        </div>
      </div>

    </div>
  )
} 