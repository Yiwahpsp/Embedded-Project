import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { auth, firestore } from "../../../firebase";
import { signOutUser } from "@/firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Button from "@/components/button";
import { SIGNIN_ROUTE } from "@/routes";

interface FormData {
  new_password: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isSignout, setIsSignout] = useState<boolean>(false);

    useEffect(() => {
      const fetchUser = () => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(firestore, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setUser(user);
              setUserData(docSnap.data());
              setEmail(docSnap.data().email);
              setPassword(docSnap.data().password);
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

  // Function to handle Password change and validation
  const handleEditPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const newPassword = formJson.password;

    // Password validation
    if (newPassword.length < 6) {
      return setPasswordError('Password must be at least 6 characters')
    } else {
      setPasswordError('')
    }

    const docRef = doc(firestore, "Users", user.uid);
    await updateDoc(docRef, {
      password: newPassword
    })

    setPassword(newPassword);
    setSeePassword(false);
    setIsEditOpen(false);
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOutUser(); // Clears the auth-token cookie
      router.push('/auth/signin'); // Redirect to the sign-in page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start gap-16 px-4 py-8 w-full text-primary">
      {
        !userData ?
          <p className="text-lg">Loading...</p>
          :
          <>
            <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">Profile</h1>
            <div className='flex flex-col justify-start items-start gap-14 mx-auto w-full max-w-lg'>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <p className="font-semibold text-xl md:text-2xl">Email:</p>
                  <div className="flex flex-row justify-between items-center gap-1 w-full">
                    <p className="text-base md:text-lg">{email}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-1 w-full">
                  <p className="font-semibold text-xl md:text-2xl">Password:</p>
                  <div className="flex flex-row justify-between items-center gap-1 w-full">
                    {
                      seePassword ?
                        <p className="text-base md:text-lg">{password}</p>
                        :
                        <p className="text-base md:text-lg">{'*'.repeat(password.length)}</p>
                    }
                    <div className="flex items-center gap-5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSeePassword(!seePassword);
                        }}
                      >
                        {
                          seePassword ?
                            <VisibilityIcon sx={{ fontSize: 20 }} />
                            :
                            <VisibilityOffIcon sx={{ fontSize: 20 }} />
                        }
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPasswordError(''); // Reset email error when opening the dialog
                          setIsEditOpen(true);
                        }}
                      >
                        <EditIcon sx={{ fontSize: 20 }} />
                      </button>
                    </div>
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
                  setPasswordError(''); // Reset email error when closing the dialog
                }}
                PaperProps={{
                  component: 'form',
                  onSubmit: handleEditPassword,
                  sx: {
                    borderRadius: '12px',
                    padding: '4px',
                    width: '100%',
                    maxWidth: '384px',
                    backgroundColor: '#fafafa',
                  }
                }}
                className="mx-0 w-full"
              >
                <DialogTitle className="font-semibold text-lg md:text-xl">Change Email</DialogTitle>
                <DialogContent>
                  <DialogContentText className="text-base">
                    Please enter a new password.
                  </DialogContentText>
                  <TextField
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label=""
                    type="password"
                    fullWidth
                    variant="standard"
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    wFull
                    variant=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditOpen(false);
                      setPasswordError(''); // Reset error on cancel
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
                    backgroundColor: '#fafafa',
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
          </>
      }
    </div>
  );
}
