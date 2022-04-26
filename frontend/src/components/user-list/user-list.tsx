import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Actions } from './components/actions/actions';
import { useStyles } from './css';
import { formateDate } from '../formateDate/formateDate';

type Users = {
  chatId: number;
  firstName: string;
  username: string;
  admin: number;
  joined: Date;
  lastAction: Date;
};

export function UserListTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Admin</TableCell>
            <TableCell align="center">Joined</TableCell>
            <TableCell align="center">Last Action</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user: Users) => (
              <TableRow>
                <TableCell component="th" scope="row" align="center">
                  {user.firstName}
                  {`@${user.username}`}
                </TableCell>
                <TableCell align="center">{user.admin}</TableCell>
                <TableCell align="center">{formateDate(user.joined)}</TableCell>
                <TableCell align="center">{formateDate(user.lastAction)}</TableCell>
                <TableCell align="center">
                  <Actions chatId={user.chatId} setUsers={setUsers}/>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
