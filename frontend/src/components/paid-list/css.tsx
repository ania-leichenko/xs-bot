import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
      backgroundColor: blueGrey[700],
    },
    tableHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '12px',
    },
    search: {
      width: '100%',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

export { useStyles };
