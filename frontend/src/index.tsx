import { StrictMode } from 'react';
import { render } from 'react-dom';
//import { Provider } from 'react-redux';
// import { unstable_HistoryRouter as Router } from 'react-router-dom';
//import { store } from 'store/store';
import { App } from 'components/app/app';
// import { navigation } from 'services/services';
import 'assets/css/styles.scss';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
