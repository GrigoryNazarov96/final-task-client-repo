import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { createCollection } from '../requests/collectionRequests';
import { Context } from '..';

export default function NewCollectionDialog({ newCollectionModalOpen, setNewCollectionModalOpen }) {
  const { user } = useContext(Context);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [stage, setStage] = useState(1);
  const [optionalFields, setOptionalFields] = useState({});

  const handleCloseViaCancel = () => {
    setNewCollectionModalOpen(false);
    setTimeout(() => setStage(1), 500);
    setName('');
    setDescription('');
    setTheme('');
    setOptionalFields({});
  };

  const handleCloseOnCreate = () => {
    setNewCollectionModalOpen(false);
    setTimeout(() => {
      setStage(1);
      window.location.reload(true);
    }, 500);
  };

  const handleCreateNewCollection = async () => {
    try {
      await createCollection(user.user.id, {
        name,
        description,
        theme,
        optionalFields,
      });
      handleCloseOnCreate();
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Dialog open={newCollectionModalOpen} onClose={handleCloseViaCancel}>
      {stage === 1 ? (
        <>
          <DialogTitle>New Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In this window you can create a new collection. "Name", "Description" and "Theme" are
              required. After that you can define extra fields for all future items in the
              collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="theme"
              label="Theme"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setTheme(e.target.value)}
            />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>Define items custom fields</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can define extra fields for all future items in the collection. Non of them are
              required.
            </DialogContentText>
          </DialogContent>
          {stage === 2 && (
            <>
              <DialogTitle>Custom text fields</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalTextTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalTextTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalTextTitle3: e.target.value })
                  }
                />
              </DialogContent>
            </>
          )}
          {stage === 3 && (
            <>
              <DialogTitle>Custom number fields</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalNumberTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalNumberTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalNumberTitle3: e.target.value })
                  }
                />
              </DialogContent>
            </>
          )}
          {stage === 4 && (
            <>
              <DialogTitle>Custom date fields</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalDateTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalDateTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalDateTitle3: e.target.value })
                  }
                />
              </DialogContent>
            </>
          )}
          {stage === 5 && (
            <>
              <DialogTitle>Custom check fields</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalCheckboxTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalCheckboxTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Field name"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalCheckboxTitle3: e.target.value })
                  }
                />
              </DialogContent>
            </>
          )}
        </>
      )}
      <DialogActions>
        <Button onClick={handleCloseViaCancel}>Cancel</Button>
        {stage !== 5 ? (
          <Button
            variant="outlined"
            disabled={!(name !== '' && description !== '' && theme !== '')}
            onClick={() => {
              setStage((prev) => prev + 1);
            }}
          >
            Continue
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleCreateNewCollection}>
            Create
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
