import { FC } from 'react';
import { Button, Input } from 'components/common/common';
import { InputType, ButtonType } from 'common/enums/enums';
import {
  useAppForm,
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
} from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import {
  EAMTenantUpdateRequestDto,
  EAMTenantFormDto,
  EAMTenantByIdResponseDto,
} from 'common/types/types';
import { eamTenantUpdate as EAMTenantValidationSchema } from 'validation-schemas/validation-schemas';
import { eam as EAMTenantConfigurateActions } from 'store/actions';
import { mapTenantDefaultValues } from './helpers/helpers';
import styles from './styles.module.scss';

const Tenant: FC = () => {
  const dispatch = useAppDispatch();
  const { tenant } = useAppSelector(({ app }) => ({
    tenant: app.tenant,
  }));

  const defaultValues = useMemo(() => mapTenantDefaultValues(tenant), [tenant]);

  const { control, errors, handleReset, handleSubmit } =
    useAppForm<EAMTenantUpdateRequestDto>({
      defaultValues,
      validationSchema: EAMTenantValidationSchema,
    });

  useEffect(() => {
    handleReset(defaultValues);
  }, [tenant]);

  const handleFormSubmit = (payload: EAMTenantFormDto): void => {
    dispatch(
      EAMTenantConfigurateActions.updateTenant({
        ...payload,
        id: (tenant as EAMTenantByIdResponseDto).id,
      }),
    );
  };

  return (
    <div>
      <form
        className={styles.wrapper}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={styles.wrapperInput}>
          <h3 className={styles.title}>Change Tenant Name</h3>
          <Input
            type={InputType.TEXT}
            label=""
            placeholder=""
            name={getNameOf<EAMTenantFormDto>('name')}
            control={control}
            errors={errors}
          />
        </div>
        <Button
          type={ButtonType.SUBMIT}
          label="Save"
          className={styles.button}
        />
      </form>
    </div>
  );
};

export { Tenant };
