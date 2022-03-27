import { EAMWorkerGetAllItemResponseDto } from './eam-worker-get-all-item-response-dto.type';

type EAMWorkerGetAllResponseDto = {
  items: EAMWorkerGetAllItemResponseDto[];
  countItems: number;
};

export { type EAMWorkerGetAllResponseDto };
