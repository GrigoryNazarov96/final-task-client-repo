import React, { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { updateItem } from "../requests/itemRequests";
import { Context } from "..";

export default function UpdateItemDialog({
  updateItemModalOpen,
  setUpdateItemModalOpen,
  collection,
  item,
}) {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [optionalFields, setOptionalFields] = useState({});

  const handleCloseViaCancel = () => {
    setUpdateItemModalOpen(false);
  };

  const handleCloseOnUpdate = () => {
    setUpdateItemModalOpen(false);
    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 500);
  };

  const handleUpdateItem = async () => {
    try {
      await updateItem(item._id, {
        name,
        description,
        tags,
        optionalFields,
      });
      handleCloseOnUpdate();
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  useEffect(() => {
    setName(item.name);
    setTags(item.tags);
    setDescription(item.description);
    setOptionalFields(item.optionalFields ?? {});
  }, [item]);

  return (
    <Dialog open={updateItemModalOpen} onClose={handleCloseViaCancel}>
      <DialogTitle>Edit {item.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>In this window you can edit item</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={name ? "" : "Name"}
          defaultValue={name}
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label={description ? "" : "Description"}
          defaultValue={description}
          fullWidth
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          id="tags"
          label={tags ? "" : "Tags"}
          defaultValue={tags}
          fullWidth
          variant="standard"
          onChange={(e) => setTags(e.target.value.split(", "))}
        />
        {collection.optionalFields &&
          Object.entries(collection.optionalFields)
            .filter(
              ([key, value]) =>
                value !== null && key.startsWith("optionalTextTitle")
            )
            .map(([key, value], i) => (
              <TextField
                key={i}
                margin="dense"
                label={optionalFields[`optionalTextValue${i + 1}`] ? "" : value}
                defaultValue={optionalFields[`optionalTextValue${i + 1}`]}
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
            .filter(
              ([key, value]) =>
                value !== null && key.startsWith("optionalNumberTitle")
            )
            .map(([key, value], i) => (
              <TextField
                key={i}
                margin="dense"
                label={
                  optionalFields[`optionalNumberValue${i + 1}`] ? "" : value
                }
                defaultValue={optionalFields[`optionalNumberValue${i + 1}`]}
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
            marginTop: "3%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {collection.optionalFields &&
            Object.entries(collection.optionalFields)
              .filter(
                ([key, value]) =>
                  value !== null && key.startsWith("optionalDateTitle")
              )
              .map(([key, value], i) => (
                <LocalizationProvider dateAdapter={AdapterLuxon} key={i}>
                  <DesktopDatePicker
                    disableMaskedInput
                    label={
                      optionalFields[`optionalDateValue${i + 1}`] ? "" : value
                    }
                    defaultValue={optionalFields[`optionalDateValue${i + 1}`]}
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
            marginTop: "3%",
          }}
        >
          {collection.optionalFields &&
            Object.entries(collection.optionalFields)
              .filter(
                ([key, value]) =>
                  value !== null && key.startsWith("optionalCheckboxTitle")
              )
              .map(([key, value], i) => (
                <Box key={i}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            optionalFields[`optionalCheckboxValue${i + 1}`]
                          }
                          onChange={(e) =>
                            setOptionalFields({
                              ...optionalFields,
                              [`optionalCheckboxValue${i + 1}`]:
                                e.target.checked,
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
          disabled={(name && description && tags) == ""}
          onClick={handleUpdateItem}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
