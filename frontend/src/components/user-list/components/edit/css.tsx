import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '250px',
      },
    },
    icons: {
      margin: '8px',
    },
    edit: {
      color: '#c0c3c8',
      '&:hover': {
        backgroundColor: '#7367f0',
      },
    },
    drawer: {
      backgroundColor: '#283046',
    },
  }),
);

export { useStyles };
