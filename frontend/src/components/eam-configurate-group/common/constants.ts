import { EAMGroupConfigurateRequestDto } from 'common/types/types';

const DEFAULT_GROUP_PAYLOAD = (name: string): EAMGroupConfigurateRequestDto => {
  return {
    id: '',
    name: name,
    workersIds: [],
    permissionsIds: [],
  };
};

export { DEFAULT_GROUP_PAYLOAD };
