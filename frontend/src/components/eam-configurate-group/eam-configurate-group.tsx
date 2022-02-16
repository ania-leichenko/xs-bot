import React, { FC, useMemo } from 'react';
import { Button, Input, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { ButtonStyle, ButtonType, InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { EAMGroupConfigurate as groupsAction } from 'store/actions';

import styles from './eam-configurate-group.module.scss';
import { EAMGroupConfigurateRequestDto } from 'common/types/types';
import { getRows, getColumns } from './helpers/helpers';

const EAMConfigurateGroup: FC = () => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupConfigurateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
    });
  const { id: tenantId } = useAppSelector(({ app }) => ({
    id: app.tenant?.id,
  }));
  const { workers } = useAppSelector(
    ({ EAMGroupConfigurate }) => EAMGroupConfigurate,
  );

  const dispatch = useAppDispatch();

  const [selectedWorkers, setSelectedWorkers] = useState(new Set<string>([]));

  const addWorkerId = (id: string): void => {
    setSelectedWorkers((_previousState) => new Set([...selectedWorkers, id]));
  };

  const removeWorkersId = (id: string): void => {
    setSelectedWorkers((prev) => new Set([...prev].filter((x) => x !== id)));
  };

  useEffect(() => {
    dispatch(
      groupsAction.getWorkers({
        from: 0,
        count: 10,
        tenantId: tenantId as string,
      }),
    );
  }, [dispatch, tenantId]);

  const handleFormSubmit = (payload: EAMGroupConfigurateRequestDto): void => {
    const newPayload: EAMGroupConfigurateRequestDto = {
      name: payload.name,
      workersIds: Array.from(selectedWorkers),
    };
    dispatch(groupsAction.create(newPayload));
  };

  const columns = useMemo(() => getColumns(addWorkerId, removeWorkersId), []);

  const data = useMemo(() => getRows(workers), [workers]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>

      <div className={styles.container}>
        <h5 className={styles.form_title}>Create user group</h5>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h6 className={styles.titleTwo}>Name the group</h6>

          <div className={styles.inputContainer}>
            <Input
              type={InputType.TEXT}
              placeholder="Enter a meaningful name to identify this group"
              label="User group name"
              name={getNameOf<EAMGroupConfigurateRequestDto>('name')}
              control={control}
              errors={errors}
            />
          </div>

          <div className={styles.workerListWrapper}>
            <h6 className={styles.titleThree}>
              Add users to the group - Optional
            </h6>
            <Table title="Workers" columns={columns} data={data} />
          </div>

          <div className={styles.btnWrapper}>
            <Button
              type={ButtonType.BUTTON}
              label="Cancel"
              btnStyle={ButtonStyle.OUTLINED}
            />
            <Button type={ButtonType.SUBMIT} label="Create" />
          </div>
        </form>
      </div>
    </div>
  );
};

export { EAMConfigurateGroup };
