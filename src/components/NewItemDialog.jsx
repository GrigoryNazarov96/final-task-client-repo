import React, { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
// import { DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { createItem } from '../requests/itemRequests';
import { Context } from '..';

export default function NewItemDialog({ newItemModalOpen, setNewItemModalOpen, collection }) {
  const { user } = useContext(Context);
  const [name, setName] = useState('');
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState('');
  const [optionalFields, setOptionalFields] = useState({});

  const handleCloseViaCancel = () => {
    setNewItemModalOpen(false);
    setName('');
    setDescription('');
    setOptionalFields({});
  };

  const handleCloseOnCreate = () => {
    setNewItemModalOpen(false);
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };

  const handleCreateNewItem = async () => {
    try {
      await createItem(user.user.id, collection._id, {
        name,
        description,
        tags,
        optionalFields,
      });
      handleCloseOnCreate();
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Dialog open={newItemModalOpen} onClose={handleCloseViaCancel}>
      <DialogTitle>New Item in {collection.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          In this window you can add new item to chosen collection. "Name" and "Description" are
          required. Other fields have been defined on collection creation
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
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="tags"
          label="Tags"
          fullWidth
          variant="standard"
          required
          onChange={(e) => setTags(e.target.value.split(', '))}
        />
        {collection.optionalFields &&
          Object.entries(collection.optionalFields)
            .filter(([key, value]) => value !== null && key.startsWith('optionalTextTitle'))
            .map(([key, value], i) => (
              <TextField
                key={i}
                // id={`textField${i + 1}`}
                margin="dense"
                label={value}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setOptionalFields({
                    ...optionalFields,
                    [`optionalTextValue${i + 1}`]: e.target.value,
                  })
                }
              />
            ))}
        {collection.optionalFields &&
          Object.entries(collection.optionalFields)
            .filter(([key, value]) => value !== null && key.startsWith('optionalNumberTitle'))
            .map(([key, value], i) => (
              <TextField
                key={i}
                // id={`numberField${i + 1}`}
                margin="dense"
                label={value}
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setOptionalFields({
                    ...optionalFields,
                    [`optionalNumberValue${i + 1}`]: e.target.value,
                  })
                }
              />
            ))}

        <Box
          sx={{
            marginTop: '3%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {collection.optionalFields &&
            Object.entries(collection.optionalFields)
              .filter(([key, value]) => value !== null && key.startsWith('optionalDateTitle'))
              .map(([key, value], i) => (
                <LocalizationProvider dateAdapter={AdapterLuxon} key={i}>
                  <DesktopDatePicker
                    // id={`datePicker${i + 1}`}
                    disableMaskedInput
                    label={value}
                    value={optionalFields[`optionalDateValue${i + 1}`] ?? null}
                    onChange={(newValue) =>
                      setOptionalFields({
                        ...optionalFields,
                        [`optionalDateValue${i + 1}`]: newValue,
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              ))}
        </Box>
        <Box
          sx={{
            marginTop: '3%',
          }}
        >
          {collection.optionalFields &&
            Object.entries(collection.optionalFields)
              .filter(([key, value]) => value !== null && key.startsWith('optionalCheckboxTitle'))
              .map(([key, value], i) => (
                <Box key={i}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) =>
                            setOptionalFields({
                              ...optionalFields,
                              [`optionalCheckboxValue${i + 1}`]: e.target.checked,
                            })
                          }
                        />
                      }
                      label={value}
                    />
                  </FormGroup>
                </Box>
              ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseViaCancel}>Cancel</Button>
        <Button
          variant="outlined"
          // eslint-disable-next-line eqeqeq
          disabled={(name && description && tags) == ''}
          onClick={handleCreateNewItem}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
