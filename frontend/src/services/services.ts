import { createBrowserHistory } from 'history';
import { Navigation } from './navigation/navigation.service';

const navigation = new Navigation({
  history: createBrowserHistory(),
});

export {
  navigation,
};
