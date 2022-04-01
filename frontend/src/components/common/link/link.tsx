import { FC } from 'react';
import { NavLink as AppLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  className?: string;
  title?: string;
};

const Link: FC<Props> = ({ children, to, className, title }) => (
  <AppLink to={to} className={className} title={title}>
    {children}
  </AppLink>
);

export { Link };
