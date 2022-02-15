import {
  InputType,
  ButtonType,
  AppRoute,
  ButtonStyle,
} from 'common/enums/enums';
import { useAppForm, useAppDispatch } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Input, Button } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { EamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './eam-create-worker.module.scss';
import { workerConfigurate as workerConfigurateActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';

const EamWorkerCreate: React.FC = () => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<EAMWorkerCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateWorkerValidationSchema,
    });

  const handleFormSubmit = (payload: EAMWorkerCreateRequestDto): void => {
    dispatch(workerConfigurateActions.workerCreate(payload));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <section className={styles.formWrapper}>
        <h2 className={styles.addUserHeader}>Add Worker</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputGroupTitle}>Set user details</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label="User Name*"
                  placeholder=""
                  name={getNameOf<EAMWorkerCreateRequestDto>('name')}
                  control={control}
                  errors={errors}
                />
              </div>
            </li>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputGroupTitle}>Add user to group </h3>
            </li>
          </ul>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                btnStyle={ButtonStyle.OUTLINED}
                label="Cancel"
                to={AppRoute.EAM}
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

export { EamWorkerCreate };
