/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Typography, Box, Button } from '@mui/material';
import MyCollectionCard from '../components/MyCollectionCard';
import MyTable from '../components/MyTable';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { getCollectionsByUser } from '../requests/collectionRequests';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import NewCollectionDialog from '../components/NewCollectionDialog';

const User = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const [collections, setCollections] = useState([]);
  const [newCollectionModalOpen, setNewCollectionModalOpen] = useState(false);
  const userOnPageId = location.pathname.split('/')[2];

  const handleClickOpen = () => {
    setNewCollectionModalOpen(true);
  };

  useEffect(() => {
    getCollectionsByUser(userOnPageId).then((data) => setCollections(data));
  }, []);

  return (
    <Container sx={{ marginTop: '2%', marginBottom: '2%' }}>
      <NewCollectionDialog
        newCollectionModalOpen={newCollectionModalOpen}
        setNewCollectionModalOpen={setNewCollectionModalOpen}
      />
      <Typography variant="h3" fontWeight="bold" sx={{ marginBottom: '3%' }}>
        {collections[0]?.owner.name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '1%' }}>
          Collections
        </Typography>
        {(user.user.id === userOnPageId || user.user.role === 'admin') && (
          <Button
            variant="outlined"
            sx={{ marginBottom: '1%', marginLeft: '1%' }}
            onClick={handleClickOpen}
          >
            Create new
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: collections.length ? 'start' : 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {collections.length > 0 ? (
          collections.map((el) => <MyCollectionCard key={el._id} collection={el} />)
        ) : (
          <Typography variant="h6">User has no collections yet</Typography>
        )}
      </Box>
      <Typography variant="h5" fontWeight="bold" sx={{ marginTop: '3%', marginBottom: '1%' }}>
        Items
      </Typography>
      <MyTable user={userOnPageId} />
    </Container>
  );
});

export default User;
