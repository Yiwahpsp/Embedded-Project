'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@/components/button";

export default function LockPage() {
  const router = useRouter();
  const [name, setName] = useState('Name');
  const [location, setLocation] = useState('Location');
  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 text-primary">
      <div className="relative flex flex-col w-full">
        <button
          className="top-0 left-0 absolute"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}>
          <KeyboardBackspaceIcon sx={{ fontSize: 24 }} />
        </button>
        <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Your Lock</h1>
      </div>
      <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="font-semibold text-base md:text-lg">Name:</p>
            <div className="flex flex-row justify-between items-center gap-1 w-full">
              <p className="text-sm md:text-base">{name}</p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="font-semibold text-base md:text-lg">Location:</p>
            <div className="flex flex-row justify-between items-center gap-1 w-full">
              <p className="text-sm md:text-base">{location}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <Button
            variant="secondary"
            wFull
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            wFull
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard/lock/finger-print')
            }}
          >
            User Fingerprint
          </Button>
          <Button
            variant=""
            wFull
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard/lock/remote-unlocked')
            }}
          >
            Remote Unlocked
          </Button>
        </div>
      </div>
    </div>
  )
}