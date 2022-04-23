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

type Users = {
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

  function formateDate(date: Date): String {
    const allDate = new Date(date);
    let day = allDate.getDay();
    if (day < 10) {
      day = `0${day}`
    }
    let mouth = allDate.getMonth();
     if (mouth < 10) {
       mouth = `0${mouth}`;
     }
    const year = allDate.getFullYear();
    let hour = allDate.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    const minutes = allDate.getMinutes();
     if (minutes < 10) {
       minutes = `0${minutes}`;
     }
    return `${day} / ${mouth} / ${year}  ${hour}:${minutes}`;
  }

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
                <TableCell align="center">
                  {formateDate(user.lastAction)}
                </TableCell>
                <TableCell align="center">
                  <Actions />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
