/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC } from 'react';
import { useStyles } from './css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { formateDate } from '../../../formateDate/formateDate';

const statuses = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Inactive',
    label: 'Inactive',
  },
];

type Anchor = 'right';

type Ticket = {
  ticket: number;
  chatId: number;
  firstName: string;
  username?: string;
  subscriptionTime: string;
  plan: string;
  paymentMethod: string;
  status: string;
};

type Props = {
  ticket: Ticket;
  setTickets: (data: any) => void;
};

export const Edit: FC<Props> = ({ ticket, setTickets }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [userSubcriptionTime, setUserSubcriptionTime] = React.useState(
    formateDate(String(new Date(ticket.subscriptionTime))),
  );
  const [userStatus, setUserStatus] = React.useState(ticket.status);

  const onChangeSubscriptionTime = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setUserSubcriptionTime(event.target.value);
  };

  const onChangeStatus = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserStatus(event.target.value);
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

  const handleSaveTicket = (): void => {
    fetch(`http://localhost:3001/tickets/${ticket.ticket}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ticket: ticket.ticket,
        subscriptionTime: new Date(userSubcriptionTime),
        status: userStatus,
        chatId: ticket.chatId,
        messageForUser: `Your payment for ${ticket.plan} has been approved! Thanks for the payment. All signals will be in the feed of the same bot`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      });
  };

  return (
    <div>
      {(['right'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <EditIcon className={classes.icons} />
            Edit
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className={classes.text}>Add paid user</div>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-textarea"
                  label="Subscription Time"
                  placeholder=""
                  multiline
                  variant="outlined"
                  onChange={onChangeSubscriptionTime}
                  value={userSubcriptionTime}
                />
              </div>
              <div>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Status"
                  value={userStatus}
                  onChange={onChangeStatus}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  {statuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
            </form>
            <div>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
                onClick={handleSaveTicket}
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};
