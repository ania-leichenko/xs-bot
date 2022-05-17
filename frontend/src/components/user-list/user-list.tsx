import { FC, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Actions } from './components/actions/actions';
import { formateDate } from '../formateDate/formateDate';

type Users = {
  chatId: number;
  firstName: string;
  username?: string;
  admin: number;
  joined: string;
  lastAction: string;
};

export const UserListTable: FC = () => {
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
      <Table aria-label="simple table">
        <TableHead>
          <TableCell align="center">
            User
          </TableCell>
          <TableCell align="center">
            Admin
          </TableCell>
          <TableCell align="center">
            Joined
          </TableCell>
          <TableCell align="center">
            Last Action
          </TableCell>
          <TableCell align="center">
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
                >
                  {user.firstName}
                  <div>{`@${user.username}`}</div>
                </TableCell>
                <TableCell align="center">
                  {user.admin}
                </TableCell>
                <TableCell align="center">
                  {formateDate(user.joined)}
                </TableCell>
                <TableCell align="center">
                  {formateDate(user.lastAction)}
                </TableCell>
                <TableCell align="center">
                  <Actions user={user} setUsers={setUsers} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
