import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ListIcon from '@material-ui/icons/List';
import { useStyles } from './css';
import { Edit } from '../edit/edit';

type Ticket = {
  chatId: number;
  ticket: number;
  firstName: string;
  username: string;
  subscriptionTime: string;
  plan: string;
  paymentMethod: string;
  status: string;
};

type Props = {
  ticket: Ticket;
  setTickets: (data: any) => void;
};

export const Actions: FC<Props> = ({ ticket, setTickets }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDeleteTicket = (): void => {
    fetch(`http://localhost:3001/tickets/${ticket.ticket}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        chatId: ticket.chatId,
        messageForUser:
          'Your subscription has been rejected by our system. For all questions, please contact the administrator @bestsignalsadmin',
      }),
    })
      .then((response) => response.json())
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
        className={classes.text}
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
          <Edit setTickets={setTickets} ticket={ticket} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div onClick={handleDeleteTicket} className={classes.button}>
            <DeleteOutlinedIcon className={classes.icons} />
            Delete
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};
