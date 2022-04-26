import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import { useStyles } from './css';
import { Edit } from '../edit-and-add/edit-and-add';

export function Actions({
  ticket,
  setTickets,
}: {
  ticket: number;
  setTickets: (data: any) => void;
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDeleteTicket = (): void => {
    fetch(`http://localhost:3001/tickets/${ticket}`, {
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
        setTickets(data);
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
          <InfoIcon className={classes.icons} />
          Info
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Edit />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleDeleteTicket} className={classes.button}>
            <DeleteOutlinedIcon
              className={classes.icons}
            />
            Delete
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
