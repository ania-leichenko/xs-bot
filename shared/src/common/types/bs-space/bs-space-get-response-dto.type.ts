import { BSSpaceGetResponseItemDto } from './bs-space-get-responce-item-dto.type';

type BSSpaceGetResponseDto = {
  items: BSSpaceGetResponseItemDto[];
  countItems: number;
};

export { type BSSpaceGetResponseDto };
