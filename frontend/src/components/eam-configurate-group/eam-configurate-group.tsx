import React, { FC } from 'react';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useAppSelector,
  useState,
} from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from './common/constants';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { EAMGroupConfigurate as EAMGroupConfigurateActions } from 'store/actions';
import styles from './eam-configurate-group.module.scss';
import { EAMGroupConfigurateRequestDto } from 'common/types/types';
import { eamGroupConfigurate as CreateGroupValidationSchema } from 'validation-schemas/validation-schemas';
import { WorkersTable, PermissionsTable } from './components/components';

const EAMConfigurateGroup: FC = () => {
  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupConfigurateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD,
      validationSchema: CreateGroupValidationSchema,
    });

  const { tenantId } = useAppSelector(({ app }) => ({
    tenantId: app.tenant?.id,
  }));
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tenantId) {
      return;
    }
    dispatch(
      EAMGroupConfigurateActions.getWorkers({
        from: 0,
        count: 5,
        tenantId: tenantId as string,
      }),
    );
    dispatch(EAMGroupConfigurateActions.getPermission());
  }, [dispatch, tenantId]);

  const handleFormSubmit = (payload: EAMGroupConfigurateRequestDto): void => {
    const newPayload: EAMGroupConfigurateRequestDto = {
      name: payload.name,
      workersIds: selectedWorkers,
      permissionsIds: selectedPermissions,
    };
    dispatch(EAMGroupConfigurateActions.create(newPayload));
  };

  const handleAddWorkerId = (id: string): void => {
    setSelectedWorkers((prevState) => prevState.concat(id));
  };
  const handleRemoveWorkerId = (id: string): void => {
    setSelectedWorkers((prevState) => prevState.filter((it) => it !== id));
  };
  const handleIsCheckedWorkerId = (id: string): boolean => {
    return selectedWorkers.some((it) => it === id);
  };

  const handleAddPermissionId = (id: string): void => {
    setSelectedPermissions((prevState) => prevState.concat(id));
  };
  const handleRemovePermissionId = (id: string): void => {
    setSelectedPermissions((prevState) => prevState.filter((it) => it !== id));
  };
  const handleIsCheckedPermissionId = (id: string): boolean => {
    return selectedPermissions.some((it) => it === id);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        EAM - <br />
        Entity Access Management
      </h2>
      <section className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Create Group</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ul className={styles.inputGroups}>
            <li className={styles.inputGroup}>
              <h3 className={styles.inputGroupTitle}>Name the group</h3>
              <div className={styles.inputWrapper}>
                <Input
                  type={InputType.TEXT}
                  placeholder="Enter a name to identify this group"
                  label=""
                  name={getNameOf<EAMGroupConfigurateRequestDto>('name')}
                  control={control}
                  errors={errors}
                />
              </div>
            </li>
            <li>
              <WorkersTable
                selectedWorkers={selectedWorkers}
                handleIsCheckedId={handleIsCheckedWorkerId}
                handleRemoveWorkerId={handleRemoveWorkerId}
                handleAddWorkerId={handleAddWorkerId}
              />
            </li>
            <li>
              <PermissionsTable
                selectedPermissions={selectedPermissions}
                handleIsCheckedPermissionId={handleIsCheckedPermissionId}
                handleRemovePermissionId={handleRemovePermissionId}
                handleAddPermissionId={handleAddPermissionId}
              />
            </li>
          </ul>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                to={AppRoute.EAM}
                label="Cancel"
                btnStyle={ButtonStyle.OUTLINED}
              />
            </div>
            <div className={styles.button}>
              <Button
                className={styles.button}
                type={ButtonType.SUBMIT}
                label="Create"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { EAMConfigurateGroup };
