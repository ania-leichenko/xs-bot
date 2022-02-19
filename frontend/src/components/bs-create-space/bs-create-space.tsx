import { FC } from 'react';
import styles from './bs-create-space.module.scss';
import { Button } from '../common/button/button';
import { AppRoute } from '../../common/enums/app/app-route.enum';
import { ButtonStyle } from '../../common/enums/ui/button-style.enum';
import { ButtonType } from '../../common/enums/ui/button-type.enum';
import { bsSpaceCreate as CreateSpaceValidationSchema } from 'validation-schemas/validation-schemas';
import { Input } from '../common/input/input';
import { InputType } from '../../common/enums/ui/input-type.enum';
import { BSSpace as BSSpaceActions } from 'store/actions';
import { getNameOf } from '../../helpers/helpers';
import { BSSpaceCreateRequestDto } from 'common/types/types';
import { useAppForm } from '../../hooks/use-app-form/use-app-form.hook';
import { DEFAULT_PAYLOAD } from './common/constants';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch.hook';

const BSCreateSpace: FC = () => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } = useAppForm<BSSpaceCreateRequestDto>(
    {
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateSpaceValidationSchema,
    },
  );

  const handleFormSubmit = (payload: BSSpaceCreateRequestDto): void => {
    dispatch(
      BSSpaceActions.createSpace({
        ...payload,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        BS - <br />
        Binary Storage
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Space</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputTitle}>Space name</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label=""
                  placeholder=""
                  name={getNameOf<BSSpaceCreateRequestDto>('name')}
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
                to={AppRoute.BS}
              />
            </div>
            <div className={styles.button}>
              <Button type={ButtonType.SUBMIT} label="Create" />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { BSCreateSpace };
