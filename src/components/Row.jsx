import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  TableHead,
  Collapse,
  Box,
  Typography,
  Table,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Row({ item }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link onClick={() => navigate(`/items/${item._id}`)}>
            {item.name}
          </Link>
        </TableCell>
        <TableCell align="left">{item._id}</TableCell>
        <TableCell align="left">{item.owner.name}</TableCell>
        <TableCell align="left">{item.collectionId.name}</TableCell>
        <TableCell align="right">{item.likes}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Custom Fields
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Custom field title</TableCell>
                    <TableCell>Custom field value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.optionalFields.map(({ key, value }) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row">
                        {key}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {value.toString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     owner: PropTypes.string.isRequired,
//     collectionId: PropTypes.string.isRequired,
//     optionalFields: PropTypes.object(
//       PropTypes.shape({
//         optionalTextValue1: PropTypes.string.isRequired,
//         optionalTextValue2: PropTypes.string.isRequired,
//         optionalTextValue3: PropTypes.string.isRequired,
//         optionalNumberValue1: PropTypes.number.isRequired,
//         optionalNumberValue2: PropTypes.number.isRequired,
//         optionalNumberValue3: PropTypes.number.isRequired,
//         optionalDateValue1: PropTypes.string.isRequired,
//         optionalDateValue2: PropTypes.string.isRequired,
//         optionalDateValue3: PropTypes.string.isRequired,
//         optionalCheckboxValue1: PropTypes.bool.isRequired,
//         optionalCheckboxValue2: PropTypes.bool.isRequired,
//         optionalCheckboxValue3: PropTypes.bool.isRequired,
//       }),
//     ),
//     likesCount: PropTypes.number,
//   }).isRequired,
// };
