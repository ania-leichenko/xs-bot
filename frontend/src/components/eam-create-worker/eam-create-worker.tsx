import { InputType, ButtonType } from 'common/enums/enums';
import { useAppForm, useAppDispatch } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Input, Button } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { EamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './eam-create-worker.module.scss';
import { worker as workerActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';

const EamWorkerCreate: React.FC = () => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<EAMWorkerCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateWorkerValidationSchema,
    });

  const hanldeFormSubmit = (payload: EAMWorkerCreateRequestDto): void => {
    dispatch(workerActions.EamWorkerCreate(payload));
  };

  return (
    <div className={styles.backFon}>
      <div className={styles.container}>
        <h2>EAM - Entity Access Management</h2>
        <div className={styles.addUserHeader}>Add User</div>
        <form onSubmit={handleSubmit(hanldeFormSubmit)}>
          <div className={styles.title}>Set user details</div>
          <Input
            type={InputType.TEXT}
            label="User Name*"
            placeholder=""
            name={getNameOf<EAMWorkerCreateRequestDto>('name')}
            control={control}
            errors={errors}
          />

          <div className={styles.title}>Add user to group </div>

          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button type={ButtonType.SUBMIT} label="Cancel" />
            </div>
            <div className={styles.button}>
              <Button type={ButtonType.SUBMIT} label="Create" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EamWorkerCreate };
