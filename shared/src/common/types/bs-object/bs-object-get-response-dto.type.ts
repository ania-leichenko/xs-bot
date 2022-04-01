import { BSObjectGetResponseItemDto } from './bs-object-get-responce-item-dto.type';

type BSObjectGetResponseDto = {
  items: BSObjectGetResponseItemDto[];
  countItems: number;
};

export { type BSObjectGetResponseDto };
