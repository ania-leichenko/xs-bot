import React from 'react';
import { useStyles } from './css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

const plan = [
  {
    value: 'Forex',
    label: 'Forex',
  },
  {
    value: 'Crypto',
    label: 'Crypto',
  },
];

const paymentMethod = [
  {
    value: 'Crypto',
    label: 'Crypto',
  },
  {
    value: 'Scrill',
    label: 'Scrill',
  },
  {
    value: 'SWIFT',
    label: 'SWIFT',
  },
  {
    value: 'Bank Card',
    label: 'Bank Card',
  },
];

const status = [
  {
    value: 'Active',
    label: 'Active',
  },
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Inactve',
    label: 'Inactve',
  },
];

type Anchor = 'right';

export function Edit() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const [currency, setCurrency] = React.useState('0');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrency(event.target.value);
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
            <form className={classes.root} noValidate autoComplete="off">
              <div>Add paid user</div>
              <div>
                <TextField
                  id="outlined-textarea"
                  label="Subcription Time"
                  placeholder=""
                  multiline
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Plan"
                  value={plan}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  {plan.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Payment method"
                  value={paymentMethod}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  {paymentMethod.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Status"
                  value={status}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  {status.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>
            </form>
            <div className={classes.buttons}>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  href="#contained-buttons"
                >
                  Save
                </Button>
              </div>
              <div>
                <Button variant="outlined" href="#outlined-buttons">
                  Cancel
                </Button>
              </div>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
