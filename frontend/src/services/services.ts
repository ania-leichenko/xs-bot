import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Notifications } from './notifications/notifications';

const http = new Http();

const notifications = new Notifications();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export { authApi, notifications };
