'use client'
import { useState } from 'react'
import { TextField } from '@mui/material'
import Link from 'next/link'
import Button from '@/components/button'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()

  // State variables for form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // State variables for validation errors
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Function to validate form
  const validateForm = () => {
    let isValid = true

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
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

    return isValid
  }

  // Function to handle form submission
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (validateForm()) {
      // If form is valid, proceed with sign-in (e.g., make API call)
      router.push('/dashboard') // Redirect to a dashboard or appropriate page after sign-in
    }
  }

  return (
    <div className="flex flex-col justify-start items-start gap-20 mx-auto mt-20 w-full max-w-sm">
      <p className='w-full font-semibold text-4xl text-center md:text-5xl'>Smart Lock</p>
      <div className='flex flex-col justify-start items-start gap-14 w-full'>
        <h1 className="font-semibold text-panorama-blue text-xl md:text-2xl">Sign In to Your Account</h1>
        <div className='flex flex-col gap-5 w-full'>
          <TextField
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
          >
            Sign in
          </Button>
          <Link
            href={'/auth/signup'}
            className='text-sm md:text-base'
          >
            Don't have an account? <span className='text-panorama-blue'>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
