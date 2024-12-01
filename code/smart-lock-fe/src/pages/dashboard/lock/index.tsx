'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@/components/button";
import EditIcon from '@mui/icons-material/Edit';


import { auth, firestore } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SIGNIN_ROUTE } from "@/routes";

export default function LockPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(firestore, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUser(user);
            const lockDocRef = doc(firestore, "Lock", user.uid);
            const lockDocSnap = await getDoc(lockDocRef);
            if (lockDocSnap.exists()) {
              console.log("Document data:", lockDocSnap.data());
            }
          } else {
            console.log("No such document!");
          }
        } else {
          // If no user is logged in, redirect to sign-in page
          router.push(SIGNIN_ROUTE);
        }
      });
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
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
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <Button
            variant="secondary"
            wFull
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard/lock/edit')
            }}
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
            variant="danger"
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