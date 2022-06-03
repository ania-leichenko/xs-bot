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
import Chip from '@mui/material/Chip';

type Users = {
  chatId: number;
  firstName: string;
  username?: string;
  admin: number;
  joined: string;
  lastAction: string;
  countOfSubscription: number;
};

const colorChip: {
  [key: number]: 'None' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
} = {
  0: 'None',
  1: 'None',
  2: 'Bronze',
  3: 'Bronze',
  4: 'Silver',
  5: 'Silver',
  6: 'Gold',
  7: 'Gold',
  8: 'Gold',
  9: 'Gold',
  10: 'Gold',
  11: 'Gold',
  12: 'Platinum',
};

export const UserListTable: FC = () => {
  const [users, setUsers] = useState([]);
  const { REACT_APP_API_ORIGIN_URL } = process.env;

  useEffect(() => {
    fetch(`${REACT_APP_API_ORIGIN_URL}users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'null',
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
          <TableCell align="center">User</TableCell>
          <TableCell align="center">Admin</TableCell>
          <TableCell align="center">Bonus</TableCell>
          <TableCell align="center">Count</TableCell>
          <TableCell align="center">Joined</TableCell>
          <TableCell align="center">Last Action</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user: Users) => (
              <TableRow key={user.chatId}>
                <TableCell component="th" scope="row" align="center">
                  {user.firstName}
                  <div>{`@${user.username}`}</div>
                </TableCell>
                <TableCell align="center">{user.admin}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={colorChip[user.countOfSubscription]}
                    color="default"
                  ></Chip>
                </TableCell>
                <TableCell align="center">{user.countOfSubscription}</TableCell>
                <TableCell align="center">{formateDate(user.joined)}</TableCell>
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
