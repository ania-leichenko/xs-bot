import { FC } from 'react';
import { useAppDispatch, useEffect, useAppSelector } from 'hooks/hooks';

import { EAMGroupConfigurate as EAMGroupConfigurateActions } from 'store/actions';

import { CreateGroup, UpdateGroup } from './components/components';

const EAMConfigurateGroup: FC = () => {
  const dispatch = useAppDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    if (id) {
      dispatch(EAMGroupConfigurateActions.getGroupById({ id }));
    }
  }, [id]);

  const { tenantId, group } = useAppSelector(
    ({ app, EAMGroupConfigurate }) => ({
      tenantId: app.tenant?.id,
      group: id ? EAMGroupConfigurate.group : null,
    }),
  );

  useEffect(() => {
    if (!tenantId) {
      return;
    }
    dispatch(
      EAMGroupConfigurateActions.getWorkers({
        from: 0,
        count: 5,
        tenantId: tenantId as string,
      }),
    );
    dispatch(EAMGroupConfigurateActions.getPermission());
  }, [dispatch, tenantId]);
  return <div>{group ? <UpdateGroup group={group} /> : <CreateGroup />}</div>;
};

export { EAMConfigurateGroup };
