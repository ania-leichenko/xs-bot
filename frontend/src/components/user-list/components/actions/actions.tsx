import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ListIcon from '@material-ui/icons/List';
import { useStyles } from './css';
import { Edit } from '../edit/edit';

type Users = {
  chatId: number;
  firstName: string;
  username: string;
  admin: number;
  joined: Date;
  lastAction: Date;
};

type Props = {
  user: Users;
  setUsers: (data: any) => void;
};

export const Actions: FC<Props> = ({ user, setUsers }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDeleteUser = (): void => {
    fetch(`http://localhost:3001/user/${user.chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ListIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Edit user={user} setUsers={setUsers} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleDeleteUser} className={classes.button}>
            <DeleteOutlinedIcon className={classes.icons} />
            Delete
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};
