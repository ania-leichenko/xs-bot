import {
  NotificationTitle,
  NotificationMessage,
  NotificationType,
} from 'common/enums/enums';

type NotifyActionPayload = {
  title: NotificationTitle;
  message: NotificationMessage;
  type: NotificationType;
};

export { type NotifyActionPayload };
