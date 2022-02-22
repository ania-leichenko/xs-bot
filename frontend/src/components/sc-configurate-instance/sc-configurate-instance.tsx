import { FC } from 'react';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { SCInstanceCreateRequestDto } from 'common/types/types';
import { Button, Input, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useAppForm,
  useEffect,
} from 'hooks/hooks';
import { sc as scActions } from 'store/actions';
import { scInstanceCreate as CreateInstanceValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PAYLOAD } from './common/constants';
import { getOperationSystemOptions } from './helpers/helpers';
import styles from './styles.module.scss';

const SCConfigurateInstance: FC = () => {
  const dispatch = useAppDispatch();
  const { operationSystems } = useAppSelector(({ sc }) => ({
    operationSystems: sc.operationSystems,
  }));

  const { control, errors, handleSubmit } =
    useAppForm<SCInstanceCreateRequestDto>({
      defaultValues: DEFAULT_PAYLOAD,
      validationSchema: CreateInstanceValidationSchema,
    });

  useEffect(() => {
    dispatch(scActions.loadOperationSystems());
  }, []);

  const handleFormSubmit = (payload: SCInstanceCreateRequestDto): void => {
    dispatch(scActions.createInstance(payload));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        SC - <br />
        Server Computing
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Instance</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputTitle}>Instance name</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  label=""
                  placeholder=""
                  name={getNameOf<SCInstanceCreateRequestDto>('name')}
                  control={control}
                  errors={errors}
                />
              </div>
              <h3 className={styles.inputTitle}>Operation system</h3>
              <div className={styles.inputWrapper}>
                <Select
                  label=""
                  options={getOperationSystemOptions(operationSystems)}
                  name={getNameOf<SCInstanceCreateRequestDto>(
                    'operationSystemId',
                  )}
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
                to={AppRoute.SC}
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

export { SCConfigurateInstance };
