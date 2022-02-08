import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { createBrowserHistory } from 'history';
import { Navigation } from './navigation/navigation.service';
const http = new Http();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});
const navigation = new Navigation({
  history: createBrowserHistory(),
});

export { authApi, navigation };
