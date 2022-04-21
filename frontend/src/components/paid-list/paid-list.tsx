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
import Button from '@material-ui/core/Button';
import { Edit } from './components/edit-and-add/edit-and-add';

function createData(
  user_name: string,
  admin: number,
  joined: number,
  last_action: number,
) {
  return { user_name, admin, joined, last_action };
}

const rows = [createData('Frozen yoghurt', 159, 60, 40)];

export function PaidListTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
        <div>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Add
          </Button>
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
          {rows.map((row) => (
            <TableRow key={row.user_name}>
              <TableCell component="th" scope="row" align="center">
                {row.user_name}
              </TableCell>
              <TableCell align="center">{row.admin}</TableCell>
              <TableCell align="center">{row.joined}</TableCell>
              <TableCell align="center">{row.last_action}</TableCell>
              <TableCell align="center">{row.last_action}</TableCell>
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
