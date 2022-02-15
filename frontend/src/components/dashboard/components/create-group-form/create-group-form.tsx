import React, { FC, useMemo } from 'react';
import { Button, Input, SectionLine, Table } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useAppSelector,
} from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { ButtonStyle, ButtonType, InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import {
  groups as groupsAction,
  EAMWorkerConfigurate as workerAction,
} from 'store/actions';
import styles from './create-group-form.module.scss';
import { EAMGroupCreateRequestDto } from 'common/types/types';
import eam from 'assets/img/eam.svg';
import { getRows, getColumns } from './helpers/helpers';

const CreateGroupForm: FC = () => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupCreateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
    });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(workerAction.getWorkers());
  }, []);

  const onSubmit = (payload: EAMGroupCreateRequestDto): void => {
    dispatch(groupsAction.create(payload));
  };

  const { workers } = useAppSelector(
    ({ EAMWorkerConfigurate }) => EAMWorkerConfigurate,
  );

  const columns = useMemo(() => getColumns(), []);

  const data = useMemo(() => getRows(workers), [workers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.eamLogo}>
        <div className={styles.imgWrapper}>
          <img src={eam} alt={'eam'} />
        </div>
        <h2 className={styles.logoText}>
          EAM - <br /> Entity Access Management
        </h2>
      </div>

      <div className={styles.container}>
        <h5 className={styles.title}>Create user group</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className={styles.titleTwo}>Name the group</h6>

          <SectionLine />

          <div className={styles.inputContainer}>
            <Input
              type={InputType.TEXT}
              placeholder="Enter a meaningful name to identify this group"
              label="User group name"
              name={getNameOf<EAMGroupCreateRequestDto>('name')}
              control={control}
              errors={errors}
            />
          </div>

          <SectionLine />

          <div className={styles.workerListWrapper}>
            <h6 className={styles.titleThree}>
              Add users to the group - Optional
            </h6>
            <Table title={''} columns={columns} data={data} />
          </div>

          <SectionLine />

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

export { CreateGroupForm };
