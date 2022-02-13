import { FC } from 'react';
import { Button, Input } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import { eamMasterSignUp as validationSchema } from 'validation-schemas/validation-schemas';
import { EAMMasterSignUpRequestDto } from 'common/types/types';
import { ButtonType } from '../../../../common/enums/ui/button-type.enum';
import styles from './create-group-form.module.scss';
import { ButtonStyle } from 'common/enums/ui/button-style.enum';
import { getNameOf } from 'helpers/helpers';

type Props = {
  isOpen: boolean;
  openHandler: () => void;
};

const CreateGroupForm: FC<Props> = ({ isOpen, openHandler }) => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMMasterSignUpRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
      validationSchema: validationSchema,
    });

  const handleCreateGroup = (): void => {
    /* eslint no-console: "off" */
    console.log('g');
  };

  return (
    <div className={isOpen ? styles.formWrapper : styles.formWrapperHidden}>
      <form onSubmit={handleSubmit(handleCreateGroup)}>
        <div>
          <Input
            label={'name group'}
            name={getNameOf<EAMMasterSignUpRequestDto>('name')}
            control={control}
            errors={errors}
          />
        </div>
        <div className={styles.btnWrapper}>
          <Button type={ButtonType.SUBMIT} label={'Create'} />
          <Button
            onClick={openHandler}
            type={ButtonType.BUTTON}
            label={'Cancel'}
            btnStyle={ButtonStyle.OUTLINED}
          />
        </div>
      </form>
    </div>
  );
};

export { CreateGroupForm };
