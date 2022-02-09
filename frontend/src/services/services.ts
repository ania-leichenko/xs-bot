import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Notification } from './notifications/notification.service';

const http = new Http();

const notification = new Notification();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.API_PATH,
});

export { authApi, notification };
