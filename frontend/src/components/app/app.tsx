import { FC, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { useStyles } from './css';
import { UserListTable } from '../user-list/user-list';
import { TicketTable } from '../ticket-list/ticket-list';
import { AppRoute } from 'common/enums/enums';
import { Routes, Route, Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const App: FC = () => {
  const classes = useStyles();
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
            <Link
              to={
                text === 'User List' ? AppRoute.ROOT : AppRoute.PAID_LIST_TABLE
              }
              className={classes.link}
            >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
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
                element={<TicketTable />}
              />
            </Routes>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
};

export { App };
