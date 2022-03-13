import { FC } from 'react';
import { Button, Input } from 'components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useEffect,
  useSelectedItems,
} from 'hooks/hooks';
import { DEFAULT_GROUP_PAYLOAD } from '../../common/constants';
import {
  AppRoute,
  ButtonStyle,
  ButtonType,
  InputType,
} from 'common/enums/enums';
import { getNameOf } from 'helpers/helpers';
import { EAMGroupConfigurate as EAMGroupConfigurateActions } from 'store/actions';
import styles from './styles.module.scss';
import {
  EAMGroupConfigurateRequestDto,
  EamGroupGetByIdResponseDto,
} from 'common/types/types';
import { eamGroupConfigurate as eamGroupConfigurateValidationSchema } from 'validation-schemas/validation-schemas';
import { WorkersTable, PermissionsTable } from '../components';
type Props = {
  group: EamGroupGetByIdResponseDto;
};
const UpdateGroup: FC<Props> = ({ group }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    group;
  }, [group]);

  const { control, errors, handleSubmit } =
    useAppForm<EAMGroupConfigurateRequestDto>({
      defaultValues: DEFAULT_GROUP_PAYLOAD(group!.name),
      validationSchema: eamGroupConfigurateValidationSchema,
    });

  const selectedWorkers = useSelectedItems<string>(group!.workersIds);
  const selectedPermissions = useSelectedItems<string>(group!.permissionsIds);

  const handleFormSubmit = (payload: EAMGroupConfigurateRequestDto): void => {
    const newPayload: EAMGroupConfigurateRequestDto = {
      id: '',
      name: payload.name,
      workersIds: selectedWorkers.selectedItems,
      permissionsIds: selectedPermissions.selectedItems,
    };
    dispatch(EAMGroupConfigurateActions.update(newPayload));
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
                selectedWorkers={selectedWorkers.selectedItems}
                handleIsCheckedId={selectedWorkers.handleCheck}
                handleRemoveWorkerId={selectedWorkers.handleRemove}
                handleAddWorkerId={selectedWorkers.handleAdd}
              />
            </li>
            <li>
              <PermissionsTable
                selectedPermissions={selectedPermissions.selectedItems}
                handleIsCheckedPermissionId={selectedPermissions.handleCheck}
                handleRemovePermissionId={selectedPermissions.handleRemove}
                handleAddPermissionId={selectedPermissions.handleAdd}
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
                label="Save"
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { UpdateGroup };
