import { InputType, ButtonType, AppRoute } from 'common/enums/enums';
import { useAppForm, useAppDispatch } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { Input, Button } from 'components/common/common';
import { EAMWorkerCreateRequestDto } from 'common/types/types';
import { EamWorkerCreate as CreateWorkerValidationSchema } from 'validation-schemas/validation-schemas';
import styles from './eam-create-worker.module.scss';
import { worker as workerActions } from 'store/actions';
import { DEFAULT_PAYLOAD } from './common/constants';
import eam from 'assets/img/eam.svg';
import { navigation } from 'services/services';

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

  const onCickCancel = (): void => {
    navigation.push(AppRoute.EAM);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rootTitle}>
        <div className={styles.circle}>
          <img src={eam} className={styles.img} />
        </div>
        <h2>EAM - Entity Access Management</h2>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.addUserHeader}>Add User</div>
        <form onSubmit={handleSubmit(hanldeFormSubmit)}>
          <div className={styles.titles}>Set user details</div>
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
          <div className={styles.titles}>Add user to group </div>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button label="Cancel" onClick={onCickCancel} />
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
