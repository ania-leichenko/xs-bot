import { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './css';
import { UserListTable } from '../user-list/user-list';
import { PaidListTable } from '../paid-list/paid-list';
import { AppRoute } from 'common/enums/enums';
import { Routes, Route, Link } from 'react-router-dom';

const App: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['User List', 'Paid List'].map((text) => (
          <ListItem button key={text}>
            <Link to={text === 'User List' ? AppRoute.ROOT : AppRoute.PAID_LIST_TABLE}>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          ></Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <Routes>
            <Route path={AppRoute.ROOT} element={<UserListTable />} />
            <Route
              path={AppRoute.PAID_LIST_TABLE}
              element={<PaidListTable />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export { App };
