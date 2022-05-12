import { StrictMode } from 'react';
import { render } from 'react-dom';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { App } from 'components/app/app';
import { navigation } from 'services/services';
import 'assets/css/styles.scss';
console.log('test1'); // eslint-disable-line
render(
  <StrictMode>
    <Router history={navigation.instance}>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
