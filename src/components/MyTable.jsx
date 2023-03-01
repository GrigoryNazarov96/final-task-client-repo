import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchItems, fetchItemsByCollection, fetchItemsByUser } from '../requests/itemRequests';
import { useLocation } from 'react-router-dom';
import Row from './Row';

export default function CollapsibleTable({ collection, user }) {
  const location = useLocation();
  const [items, setItems] = useState([]);

  const makeUpOptionalFields = (item) => {
    const collection = item.collectionId;
    const optionalFields = Object.entries(item.optionalFields)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => ({
        value,
        key: collection.optionalFields[key.replace('Value', 'Title')],
      }));
    return {
      ...item,
      optionalFields,
    };
  };

  useEffect(() => {
    if (location.pathname.startsWith('/users')) {
      fetchItemsByUser(user).then((data) => setItems(data));
    }
    if (location.pathname.startsWith('/collections')) {
      const collectionOnPageId = location.pathname.split('/')[2];
      fetchItemsByCollection(collectionOnPageId).then((data) => setItems(data));
    }
    if (location.pathname === '/') {
      fetchItems().then((data) => setItems(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Item name</TableCell>
            <TableCell align="left">Item Id</TableCell>
            <TableCell align="left">Item Owner</TableCell>
            <TableCell align="left">Collection</TableCell>
            <TableCell align="right">Likes Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <Row key={item._id} item={makeUpOptionalFields(item)} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
