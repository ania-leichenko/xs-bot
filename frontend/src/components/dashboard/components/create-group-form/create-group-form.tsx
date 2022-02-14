import React, { FC } from 'react';
import { Button, Input } from 'components/common/common';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { ButtonStyle, ButtonType, InputType } from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { groups as groupsAction } from 'store/actions';
import styles from './create-group-form.module.scss';
import { EAMGroupCreateRequestDto } from 'common/types/types';

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type={InputType.TEXT}
            placeholder={'Enter name group'}
            label={'name group'}
            name={getNameOf<EAMGroupCreateRequestDto>('name')}
            control={control}
            errors={errors}
          />
        </div>
        <div className={styles.btnWrapper}>
          <Button
            type={ButtonType.BUTTON}
            label={'Cancel'}
            btnStyle={ButtonStyle.OUTLINED}
          />
        </div>

        <Button type={ButtonType.SUBMIT} label={'Create'} />
      </form>
    </div>
  );
};

export { CreateGroupForm };
