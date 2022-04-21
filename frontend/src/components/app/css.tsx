
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: blueGrey[900],
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: blueGrey[700],
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export { useStyles };
