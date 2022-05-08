import React, { FC } from 'react';
import { useStyles } from './css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

const currencies = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '1',
    label: '1',
  },
];

type Anchor = 'right';

type Users = {
  chatId: number;
  firstName: string;
  username: string;
  admin: number;
  joined: string;
  lastAction: string;
};

type Props = {
  user: Users;
  setUsers: (data: any) => void;
};

export const Edit: FC<Props> = ({ user, setUsers }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [admin, setAdmin] = React.useState(user.admin);

  const onChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAdmin(Number(event.target.value));
    fetch(`http://localhost:3001/user/${user.chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        chatId: user.chatId,
        admin: Number(event.target.value),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className={classes.edit}>
            <EditIcon className={classes.icons} />
            Edit
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Admin"
                  value={admin}
                  onChange={onChangeAdmin}
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
            </form>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
