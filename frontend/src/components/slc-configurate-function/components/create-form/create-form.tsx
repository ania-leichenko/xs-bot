import { FC } from 'react';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { SLCFunctionCreateRequestDto } from 'common/types/types';
import { DEFAULT_PAYLOAD } from '../../common/constants';
import { slcFunctionCreate as CreateSLCFunctionValidationSchema } from 'validation-schemas/validation-schemas';
import { SLCFunctionConfigurate as SLCFunctionConfigurateActions } from 'store/actions';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import styles from './styles.module.scss';

const CreateForm: FC = () => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<SLCFunctionCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateSLCFunctionValidationSchema,
    });

  const handleFormSubmit = (payload: SLCFunctionCreateRequestDto): void => {
    dispatch(SLCFunctionConfigurateActions.createFunction(payload));
  };

  return (
    <>
      <h3 className={styles.formTitle}>Create Function</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ul className={styles.inputGroups}>
          <li className={styles.inputGroup}>
            <h3 className={styles.inputTitle}>Function name</h3>
            <div className={styles.inputWrapper}>
              <Input
                type={InputType.TEXT}
                label=""
                placeholder=""
                name={getNameOf<SLCFunctionCreateRequestDto>('name')}
                control={control}
                errors={errors}
              />
            </div>
          </li>
        </ul>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              btnStyle={ButtonStyle.OUTLINED}
              label="Cancel"
              to={AppRoute.SLC}
            />
          </div>
          <div className={styles.button}>
            <Button type={ButtonType.SUBMIT} label="Save" />
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateForm };
