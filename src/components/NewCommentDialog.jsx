import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createReviewForItem } from '../requests/reviewRequests';
import { Context } from '..';

export default function FormDialog({ item, commentDialogOpen, setCommentDialogOpen }) {
  const { user } = useContext(Context);
  const [comment, setComment] = useState('');

  const handleClose = () => {
    setCommentDialogOpen(false);
  };

  const handleCreateNewComment = async () => {
    await createReviewForItem(item._id, user.user.id, comment);
    handleClose();
  };

  return (
    <div>
      <Dialog open={commentDialogOpen} onClose={handleClose}>
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Here you can write a comment about the item</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            fullWidth
            multiline
            variant="standard"
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateNewComment}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
