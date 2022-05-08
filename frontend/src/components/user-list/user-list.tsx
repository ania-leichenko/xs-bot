import { FC, useState, useEffect } from 'react';
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
  joined: string;
  lastAction: string;
};

export const UserListTable: FC = () => {
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
          <TableCell align="center" className={classes.text}>
            User
          </TableCell>
          <TableCell align="center" className={classes.text}>
            Admin
          </TableCell>
          <TableCell align="center" className={classes.text}>
            Joined
          </TableCell>
          <TableCell align="center" className={classes.text}>
            Last Action
          </TableCell>
          <TableCell align="center" className={classes.text}>
            Actions
          </TableCell>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user: Users) => (
              <TableRow key={user.chatId}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  className={classes.text}
                >
                  {user.firstName}
                  {`@${user.username}`}
                </TableCell>
                <TableCell align="center" className={classes.text}>
                  {user.admin}
                </TableCell>
                <TableCell align="center" className={classes.text}>
                  {formateDate(user.joined)}
                </TableCell>
                <TableCell align="center" className={classes.text}>
                  {formateDate(user.lastAction)}
                </TableCell>
                <TableCell align="center" className={classes.text}>
                  <Actions user={user} setUsers={setUsers} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
