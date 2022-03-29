import { NotificationType } from 'common/enums/enums';
import { toastr } from 'react-redux-toastr';
import styles from './notification.module.scss';

const DEFAULT_TITLE = 'Error';
const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
  public [NotificationType.ERROR](title?: string, message?: string): void {
    toastr.error(title ?? DEFAULT_TITLE, message ?? DEFAULT_MESSAGE, {
      className: styles.wrapper,
      icon: <div className={styles.attention} />,
    });
  }

  public [NotificationType.SUCCESS](title: string, message: string): void {
    toastr.success(title, message, {
      className: styles.successWrapper,
      icon: <div className={styles.check} />,
    });
  }
}

export { Notification };
