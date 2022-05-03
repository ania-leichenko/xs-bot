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
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '8px',
    },
  }),
);

export { useStyles };
