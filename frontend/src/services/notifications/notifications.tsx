import { toastr } from 'react-redux-toastr';
import styles from './notifications.module.scss';

class Notifications {
  error = (title: string, message: string): void => {
    const options = {
      className: styles.wrapper,
      icon: <div className={styles.attention} />,
    };
    toastr.error(title, message, options);
  };
}

export { Notifications };
