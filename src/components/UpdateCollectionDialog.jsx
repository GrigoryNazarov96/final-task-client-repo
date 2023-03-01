import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { updateCollection } from '../requests/collectionRequests';
// import { Context } from '..';

export default function UpdateCollectionDialog({
  updateCollectionModalOpen,
  setUpdateCollectionModalOpen,
  collection,
}) {
  // const { user } = useContext(Context);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [stage, setStage] = useState(1);
  const [optionalFields, setOptionalFields] = useState('');

  const handleCloseViaCancel = () => {
    setUpdateCollectionModalOpen(false);
    setTimeout(() => setStage(1), 500);
  };

  const handleCloseOnUpdate = () => {
    setUpdateCollectionModalOpen(false);
    // setTimeout(() => {
    //   setStage(1);
    //   window.location.reload(true);
    // }, 500);
  };

  const handleUpdateCollection = async () => {
    try {
      await updateCollection(collection._id, {
        name,
        description,
        theme,
        optionalFields,
      });
      handleCloseOnUpdate();
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    setName(collection.name);
    setDescription(collection.description);
    setTheme(collection.theme);
    setOptionalFields(collection.optionalFields);
  }, [collection]);

  return (
    <Dialog open={updateCollectionModalOpen} onClose={handleCloseViaCancel}>
      {stage === 1 ? (
        <>
          <DialogTitle>Update Collection</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In this window you can update the collection. "Name", "Description" and "Theme" are
              required. After that you can define extra fields for all future items in the
              collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={name ? '' : 'Name'}
              defaultValue={name}
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label={description ? '' : 'Description'}
              defaultValue={description}
              fullWidth
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="theme"
              label={theme ? '' : 'Theme'}
              defaultValue={theme}
              fullWidth
              variant="standard"
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
                  label={optionalFields.optionalTextTitle1 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalTextTitle1 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalTextTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalTextTitle2 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalTextTitle2 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalTextTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalTextTitle3 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalTextTitle3 ?? ''}
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
                  label={optionalFields.optionalNumberTitle1 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalNumberTitle1 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalNumberTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalNumberTitle2 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalNumberTitle2 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalNumberTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalNumberTitle3 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalNumberTitle3 ?? ''}
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
                  label={optionalFields.optionalDateTitle1 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalDateTitle1 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalDateTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalDateTitle2 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalDateTitle2 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalDateTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalDateTitle3 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalDateTitle3 ?? ''}
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
                  label={optionalFields.optionalCheckboxTitle1 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalCheckboxTitle1 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalCheckboxTitle1: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalCheckboxTitle2 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalCheckboxTitle2 ?? ''}
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setOptionalFields({ ...optionalFields, optionalCheckboxTitle2: e.target.value })
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label={optionalFields.optionalCheckboxTitle3 ? '' : 'Field name'}
                  defaultValue={optionalFields.optionalCheckboxTitle3 ?? ''}
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
          <Button variant="outlined" onClick={handleUpdateCollection}>
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
