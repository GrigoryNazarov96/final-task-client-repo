import { Container, Typography } from '@mui/material';
import React from 'react';

const Error = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h3" sx={{ marginTop: '20%' }}>
        Oops
      </Typography>
      <Typography variant="h5">Something went wrong</Typography>
      <Typography variant="h6">Error Message</Typography>
    </Container>
  );
};

export default Error;
