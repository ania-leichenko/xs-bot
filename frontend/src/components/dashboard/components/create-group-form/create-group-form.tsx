import { FC } from 'react';
import { Button, Input, SectionLine } from 'components/common/common';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { ButtonStyle, ButtonType, InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { groups as groupsAction } from 'store/actions';
import styles from './create-group-form.module.scss';
import { EAMGroupCreateRequestDto } from 'common/types/types';
import { WorkerList } from './components/workers-list/worker-list';

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
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Creation group form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <Input
            type={InputType.TEXT}
            placeholder={'Enter name group'}
            label={'Name group'}
            name={getNameOf<EAMGroupCreateRequestDto>('name')}
            control={control}
            errors={errors}
          />
          <span className={styles.warning}></span>
        </div>
        <SectionLine />
        <WorkerList />
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
  );
};

export { CreateGroupForm };
