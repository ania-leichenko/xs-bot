import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    tableContainer: {
      backgroundColor: '#283046',
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
      color: '#4f5668',
      border: '1px solid #4f5668',
      borderRadius: '5px',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    text: {
      color: '#c0c3c8',
    },
  }),
);

export { useStyles };
