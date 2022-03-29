import { NotificationType } from 'common/enums/enums';
import { toastr } from 'react-redux-toastr';
import {
  DEFAULT_ERROR_TITLE,
  DEFAULT_ERROR_MESSAGE,
} from 'common/constants/constants';
import styles from './notification.module.scss';

class Notification {
  public [NotificationType.ERROR](title?: string, message?: string): void {
    toastr.error(
      title ?? DEFAULT_ERROR_TITLE,
      message ?? DEFAULT_ERROR_MESSAGE,
      {
        className: styles.wrapper,
        icon: <div className={styles.attention} />,
      },
    );
  }

  public [NotificationType.SUCCESS](title: string, message: string): void {
    toastr.success(title, message, {
      className: styles.successWrapper,
      icon: <div className={styles.check} />,
    });
  }
}

export { Notification };
