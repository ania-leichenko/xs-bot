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
    button: {
      margin: '16px',
    },
  }),
);

export { useStyles };
