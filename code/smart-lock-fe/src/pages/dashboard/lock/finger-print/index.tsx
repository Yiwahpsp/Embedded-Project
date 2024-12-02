'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@/components/button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createFingerprint, deleteFingerprint } from '@/api/fingerprint';

interface Fingerprint {
  id: string;
  name: string;
}
import { firestore } from '../../../../../firebase';
import { doc, setDoc, deleteDoc, getDoc, Firestore, collection, getDocs } from 'firebase/firestore';

export default function FingerPrintPage() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [fingerprints, setFingerprints] = useState<any[]>([]);
  const [indexDelete, setIndexDelete] = useState<string>('');

  // Validation function for name input
  const validateName = () => {
    if (name.length === 0 || name.length > 50) {
      setNameError('Name must be between 1 and 50 characters.');
      return false;
    }
    setNameError('');
    return true;
  };

  const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName()) {
      try {
        let unique = false;
        let numberIndex: number = 0;
        const maxAttempts = 10;
        let attempts = 0;

        while (!unique && attempts < maxAttempts) {
          numberIndex = generateRandomNumber(1, 127);
          const docRef = doc(firestore, "Fingerprints", numberIndex.toString());
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            unique = true;
          }
          attempts++;
        }

        if (!unique) {
          console.error("Failed to generate a unique fingerprint ID. Please try again.");
          return;
        }

        await createFingerprint(numberIndex.toString());
        await setDoc(doc(firestore, "Fingerprints", numberIndex.toString()), {
          name: name,
        });

        console.log('Creating fingerprint:', name);
        setIsCreateOpen(false);
        setName('');
      } catch (error) {
        console.error("Error creating fingerprint:", error);
      }
    }
  };

  // const handleEdit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (validateName()) {
  //     console.log('Editing fingerprint:', name);
  //     setIsEditOpen(false);
  //     setName('');
  //   }
  // };

  const handleDelete = async () => {
    await deleteFingerprint(indexDelete);
    const fingerprintDoc = doc(firestore, "Fingerprints", indexDelete);
    await deleteDoc(fingerprintDoc);
    console.log('Deleting fingerprint');
    setIsDeleteOpen(false);
    setIndexDelete('');
  };

  useEffect(() => {
    const fetchFingerprints = async () => {
      try {
        const fingerprintsCol = collection(firestore, 'Fingerprints');
        const snapshot = await getDocs(fingerprintsCol);
        const fingerprintsData: Fingerprint[] = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Fingerprint, 'id'>),
        }));
        setFingerprints(fingerprintsData);
      } catch (error) {
        console.error("Error fetching fingerprints:", error);
      }
    };

    fetchFingerprints();
  }, []);

  return (
    <div className='w-full'>
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
          <h1 className="w-full font-semibold text-2xl text-center md:text-3xl">User Fingerprint</h1>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <p className="flex-grow font-semibold text-panorama-blue text-xl md:text-2xl">Name</p>
            <Button
              variant=""
              className="flex flex-row justify-center items-center gap-1"
              isSmall
              onClick={(e) => {
                e.preventDefault();
                setIsCreateOpen(true);
              }}
            >
              <AddIcon sx={{ color: '#fafafa', fontSize: 20 }} />
              <p className="text-base text-secondary">user</p>
            </Button>
          </div>
          {/* Table */}
          <table className="table-fixed w-full">
            <thead>
              <tr className="border border-t-0 border-r-0 border-b-2 border-l-0 text-primary">
                <td className="py-2 w-5/6">
                  <p className="font-semibold text-lg md:text-xl">Name</p>
                </td>

                <td className="py-2 w-1/6">
                </td>
              </tr>
            </thead>
            <tbody>
              {
                fingerprints.map((fingerprint: Fingerprint) => (
                  <tr key={fingerprint.id} className="border border-t-0 border-r-0 border-b-2 border-l-0 text-primary">
                    <td className="py-2 w-5/6">
                      <p className="text-base md:text-lg">{fingerprint.name}</p>
                    </td>

                    <td className="py-2">
                      <div className="flex justify-center items-center w-full">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIndexDelete(fingerprint.id);
                            setIsDeleteOpen(true);
                          }}
                          className="place-self-center"
                        >
                          <DeleteIcon sx={{ color: '#061e3a', fontSize: 20 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog
        open={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          setNameError('');
        }}
        PaperProps={{
          component: 'form',
          onSubmit: handleCreate,
          sx: {
            borderRadius: '12px',
            padding: '4px',
            width: '100%',
            maxWidth: '384px',
            backgroundColor: '#fafafa',
          },
        }}
      >
        <DialogTitle className="font-semibold text-lg md:text-xl">Add User Fingerprint</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-sm md:text-base">
            Please enter a user fingerprint name
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label=""
            type='text'
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='secondary' onClick={() => setIsCreateOpen(false)} isSmall wFull>
            Cancel
          </Button>
          <Button variant='' type="submit" isSmall wFull>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '4px',
            width: '100%',
            maxWidth: '384px',
            backgroundColor: '#fafafa',
          },
        }}
      >
        <DialogTitle className="font-semibold text-lg md:text-xl">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-sm md:text-base">
            Are you sure you want to delete this fingerprint?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='secondary' onClick={() => setIsDeleteOpen(false)} isSmall wFull>
            Cancel
          </Button>
          <Button type='submit' variant='danger' onClick={handleDelete} isSmall wFull>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

