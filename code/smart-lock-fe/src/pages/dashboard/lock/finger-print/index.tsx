'use client';
import { useState } from 'react';
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

export default function FingerPrintPage() {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  // Validation function for name input
  const validateName = () => {
    if (name.length === 0 || name.length > 50) {
      setNameError('Name must be between 1 and 50 characters.');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName()) {
      console.log('Creating fingerprint:', name);
      setIsCreateOpen(false);
      setName('');
    }
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName()) {
      console.log('Editing fingerprint:', name);
      setIsEditOpen(false);
      setName('');
    }
  };

  const handleDelete = () => {
    console.log('Deleting fingerprint');
    setIsDeleteOpen(false);
  };

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
                <td className="py-2 w-4/6">
                  <p className="font-semibold text-lg md:text-xl">Name</p>
                </td>
                <td className="py-2 w-1/6">
                </td>
                <td className="py-2 w-1/6">
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-t-0 border-r-0 border-b-2 border-l-0 text-primary">
                <td className="py-2 w-4/6">
                  <p className="text-base md:text-lg">Name</p>
                </td>
                <td className="py-2">
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditOpen(true);
                      }}
                      className="mx-auto place-self-center"
                    >
                      <EditIcon sx={{ color: '#061e3a', fontSize: 20 }} />
                    </button>
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setIsDeleteOpen(true);
                      }}
                      className="place-self-center"
                    >
                      <DeleteIcon sx={{ color: '#061e3a', fontSize: 20 }} />
                    </button>
                  </div>
                </td>
              </tr>
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

      {/* Edit Dialog */}
      <Dialog
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setNameError('');
        }}
        PaperProps={{
          component: 'form',
          onSubmit: handleEdit,
          sx: {
            borderRadius: '12px',
            padding: '4px',
            width: '100%',
            maxWidth: '384px',
            backgroundColor: '#fafafa',
          },
        }}
      >
        <DialogTitle className="font-semibold text-lg md:text-xl">Edit User Fingerprint</DialogTitle>
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
          <Button variant='secondary' onClick={() => setIsEditOpen(false)} isSmall wFull>
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
