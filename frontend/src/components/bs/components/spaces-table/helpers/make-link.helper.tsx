import { Link } from 'components/common/common';
import { AppRoute } from 'common/enums/app/app-route.enum';

const makeLink = (name: string, id: string): JSX.Element => {
  return (
    <Link to={`${AppRoute.BS_SPACE}/${id}` as unknown as AppRoute.BS_SPACE_$ID}>
      {name}
    </Link>
  );
};

export { makeLink };
