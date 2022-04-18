import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Actions } from './components/actions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  user_name  : string,
  admin: number,
  joined: number,
  last_action: number,
) {
  return { user_name, admin, joined, last_action };
}

const rows = [createData('Frozen yoghurt', 159, 60, 40)];

export default function UserListTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Joined</TableCell>
            <TableCell align="right">Last Action</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.user_name}>
              <TableCell component="th" scope="row">
                {row.user_name}
              </TableCell>
              <TableCell align="right">{row.admin}</TableCell>
              <TableCell align="right">{row.joined}</TableCell>
              <TableCell align="right">{row.last_action}</TableCell>
              <TableCell align="right">
                <Actions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
