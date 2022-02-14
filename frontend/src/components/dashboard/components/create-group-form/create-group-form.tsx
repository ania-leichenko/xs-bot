import { FC } from 'react';
import {
  Button,
  Input,
  SectionLine,
  SearchInput,
} from 'components/common/common';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { ButtonStyle, ButtonType, InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { groups as groupsAction } from 'store/actions';
import styles from './create-group-form.module.scss';
import { EAMGroupCreateRequestDto } from 'common/types/types';
import { WorkerList } from './components/workers-list/worker-list';
import { PermissionList } from './components/permission-list/permission-list';
import eam from 'assets/img/eam.svg';

const CreateGroupForm: FC = () => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupCreateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
    });

  const dispatch = useAppDispatch();

  const onSubmit = (payload: EAMGroupCreateRequestDto): void => {
    dispatch(groupsAction.create(payload));
  };

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
            <SearchInput
              placeholder={'Search'}
              control={control}
              errors={errors}
            />
            <WorkerList />
          </div>

          <SectionLine />

          <div className={styles.groupPermissionWrapper}>
            <h6 className={styles.titleThree}>Attach permission policies</h6>
            <SearchInput
              placeholder={
                'Filter policies by property or police name' + 'and press enter'
              }
              control={control}
              errors={errors}
            />
            <PermissionList />
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
