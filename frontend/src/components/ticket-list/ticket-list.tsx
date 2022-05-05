import { FC, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Actions } from './components/actions/actions';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './css';
import { formateDate } from '../formateDate/formateDate';

type Ticket = {
  ticket: number;
  firstName: string;
  username: string;
  subscriptionTime: string;
  plan: string;
  paymentMethod: string;
  status: string;
};

export const TicketTable: FC = () => {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tickets', {
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
        setTickets(data);
      });
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <TableHead className={classes.tableHead}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </TableHead>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Subscription time</TableCell>
            <TableCell align="center">Plan</TableCell>
            <TableCell align="center">Payment method</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets &&
            tickets.map((ticket: Ticket) => (
              <TableRow key={ticket.ticket}>
                <TableCell component="th" scope="row" align="center">
                  {ticket.firstName}
                </TableCell>
                <TableCell align="center">
                  {formateDate(ticket.subscriptionTime)}
                </TableCell>
                <TableCell align="center">{ticket.plan}</TableCell>
                <TableCell align="center">{ticket.paymentMethod}</TableCell>
                <TableCell align="center">{ticket.status}</TableCell>
                <TableCell align="center">
                  <Actions ticket={ticket} setTickets={setTickets} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
