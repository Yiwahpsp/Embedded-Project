import { useState } from "react";
import { useRouter } from "next/router";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@/components/button";

import EditIcon from '@mui/icons-material/Edit';

import { emailRegex } from "@/utils/validate-utils";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('test@gmail.com');
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isSignout, setIsSignout] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');

  // Function to handle email change and validation
  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email as string;

    // Email validation
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    } else {
      setEmailError('');
    }

    setEmail(email);
    setIsEditOpen(false);
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    // Add your sign-out logic here, such as clearing tokens, etc.
    router.push('/'); // Redirect to the home page after sign-out
  };

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 text-primary">
      <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Profile</h1>
      <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <p className="font-semibold text-base md:text-lg">Email:</p>
            <div className="flex flex-row justify-between items-center gap-1 w-full">
              <p className="text-sm md:text-base">{email}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEmailError(''); // Reset email error when opening the dialog
                  setIsEditOpen(true);
                }}
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <Button
            wFull
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setIsSignout(true);
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      {/* Edit Email Dialog */}
      <div>
        <Dialog
          open={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setEmailError(''); // Reset email error when closing the dialog
          }}
          PaperProps={{
            component: 'form',
            onSubmit: handleEmailSubmit,
            sx: {
              borderRadius: '12px',
              padding: '4px',
              width: '100%',
              maxWidth: '384px',
              backgroundColor: '#fff4ea',
            }
          }}
          className="mx-0 w-full"
        >
          <DialogTitle className="font-semibold text-lg md:text-xl">Change Email</DialogTitle>
          <DialogContent>
            <DialogContentText className="text-sm md:text-base">
              Please enter a new email.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              error={!!emailError}
              helperText={emailError}
            />
          </DialogContent>
          <DialogActions>
            <Button
              wFull
              variant=""
              onClick={(e) => {
                e.preventDefault();
                setIsEditOpen(false);
                setEmailError(''); // Reset error on cancel
              }}
              isSmall
            >
              Cancel
            </Button>
            <Button
              wFull
              type="submit"
              variant=""
              className=""
              isSmall
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Sign-out Confirmation Dialog */}
        <Dialog
          open={isSignout}
          onClose={() => setIsSignout(false)}
          PaperProps={{
            sx: {
              borderRadius: '12px',
              padding: '4px',
              width: '100%',
              maxWidth: '384px',
              backgroundColor: '#fff4ea',
            }
          }}
        >
          <DialogTitle className="font-semibold text-lg md:text-xl">Confirm Sign Out</DialogTitle>
          <DialogContent>
            <DialogContentText className="text-sm md:text-base">
              Are you sure you want to sign out?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              wFull
              variant="secondary"
              onClick={() => setIsSignout(false)}
              isSmall
            >
              Cancel
            </Button>
            <Button
              wFull
              variant=""
              onClick={handleSignOut}
              isSmall
            >
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
