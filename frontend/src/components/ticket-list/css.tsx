import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(
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
  }),
);

export { useStyles };
