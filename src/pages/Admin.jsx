import React from 'react';
import { Typography, Container } from '@mui/material';
import AdminTable from '../components/AdminTable';

const Admin = () => {
  return (
    <Container sx={{ marginTop: '3%' }}>
      <Typography variant="h4" fontWeight="bold">
        Admin Page
      </Typography>
      <Typography variant="h5" sx={{ marginTop: '3%', marginBottom: '2%' }}>
        Users Table
      </Typography>
      <AdminTable />
    </Container>
  );
};

export default Admin;
