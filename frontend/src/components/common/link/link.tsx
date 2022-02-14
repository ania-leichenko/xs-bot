import { FC } from 'react';
import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';
import styles from './link.module.scss';

type Props = {
  to: AppRoute;
  className?: string;
};

const Link: FC<Props> = ({ children, to, className }) =>
  className ? (
    <AppLink to={to} className={className}>
      {children}
    </AppLink>
  ) : (
    <AppLink to={to} className={styles.link}>
      {children}
    </AppLink>
  );

export { Link };
