import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers } from '../requests/userRequests';
import { Button, Box } from '@mui/material';
import { changeUsersStatus, deleteUsers, changeUsersRole } from '../requests/userRequests';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: '_id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 260 },
  { field: 'role', headerName: 'Role', width: 80 },
  {
    field: 'isBlocked',
    headerName: 'Blocked',
    type: 'string',
    width: 90,
  },
  {
    field: 'registeredAt',
    headerName: 'Registration Date',
    width: 200,
  },
];

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();

  const handleChangeUserStatus = async (isBlock) => {
    await changeUsersStatus(selectionModel, isBlock);
    const updatedUsers = users.map((u) => {
      if (selectionModel.includes(u._id)) {
        u.isBlocked = isBlock;
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const handleDelete = async () => {
    await deleteUsers(selectionModel);
    setUsers(users.filter((u) => !selectionModel.includes(u._id)));
  };

  const handleOpenUser = (value) => {
    navigate(`/users/${value.id}`);
  };

  const handleToggleRole = async (role) => {
    await changeUsersRole(selectionModel, role);
    const updatedUsers = users.map((u) => {
      if (selectionModel.includes(u._id)) {
        u.role = role;
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: '2%' }}>
        <Button
          color="secondary"
          variant="contained"
          sx={{ marginRight: '1%' }}
          disabled={!selectionModel.length}
          onClick={() => handleChangeUserStatus(true)}
        >
          Block
        </Button>
        <Button
          color="success"
          variant="contained"
          sx={{ marginRight: '1%' }}
          disabled={!selectionModel.length}
          onClick={() => handleChangeUserStatus(false)}
        >
          Unblock
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ marginRight: '1%' }}
          disabled={!selectionModel.length}
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: '1%' }}
          disabled={!selectionModel.length || selectionModel.length > 1}
          onClick={() => handleToggleRole('admin')}
        >
          Make Admin
        </Button>
      </Box>
      <Box sx={{ height: 600, width: '100%', marginBottom: '2%' }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={users}
          columns={columns}
          pageSize={9}
          onRowClick={handleOpenUser}
          onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
          selectionModel={selectionModel}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </Box>
    </>
  );
}
