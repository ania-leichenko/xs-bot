import { StrictMode } from 'react';
import { render } from 'react-dom';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { App } from 'components/app/app';
import { navigation } from 'services/services';
import 'assets/css/styles.scss';

render(
  <StrictMode>
    <Router history={navigation.instance}>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
