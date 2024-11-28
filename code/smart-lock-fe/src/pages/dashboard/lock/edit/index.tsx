'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@/components/button";
import TextField from '@mui/material/TextField';

export default function EditLockPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")
  const [locationError, setLocationError] = useState<string>("")

  const handleUpdateLockData = async () => {
    // Reset previous errors
    setNameError("");
    setLocationError("");

    // Basic validation
    let hasError = false;
    if (name.length === 0 || name.length > 50) {
      setNameError("Name must be between 1 and 50 characters.");
      hasError = true;
    }
    if (location.length === 0 || location.length > 50) {
      setLocationError("Location must be between 1 and 50 characters.");
      hasError = true;
    }
    if (name.trim() === "") {
      setNameError("Lock name is required");
      hasError = true;
    }
    if (location.trim() === "") {
      setLocationError("Lock location is required");
      hasError = true;
    }

    // If there are errors, do not proceed
    if (hasError) return;

    router.back()
    // try {
    //   // Mock API call to update lock data
    //   const response = await fetch('/api/locks/update', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       name,
    //       location,
    //     }),
    //   });

    //   // Check if the response is OK
    //   if (!response.ok) {
    //     throw new Error("Failed to update lock data");
    //   }

    //   // Assume response contains the updated lock data
    //   const updatedLock = await response.json();
    //   console.log("Lock updated successfully:", updatedLock);

    //   // Optionally, navigate back or show a success message
    //   alert("Lock updated successfully!");
    //   router.back();
    // } catch (error) {
    //   console.error("Error updating lock data:", error);
    //   alert("Error updating lock data. Please try again.");
    // }
  };

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
        <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Edit Your Lock</h1>
      </div>

      <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="font-semibold text-base md:text-lg">Name:</p>
            <div className="flex flex-row justify-between items-center gap-1 w-full">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label=""
                type="text"
                fullWidth
                variant="standard"
                error={!!nameError}
                helperText={nameError}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="font-semibold text-base md:text-lg">Location:</p>
            <div className="flex flex-row justify-between items-center gap-1 w-full">
              <TextField
                autoFocus
                required
                margin="dense"
                id="location"
                name="location"
                label=""
                type="text"
                fullWidth
                variant="standard"
                error={!!locationError}
                helperText={locationError}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <Button
            variant=""
            wFull
            onClick={(e) => {
              e.preventDefault();
              handleUpdateLockData()
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}