import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      height: '100%',
    },
    root: {
      display: 'flex',
      backgroundColor: '#141b2f',
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
      backgroundColor: '#283046',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
  }),
);

export { useStyles };
