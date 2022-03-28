import { SLCFunctionGetResponseItemDto } from './slc-function-get-response-item-dto.type';

type SLCFunctionGetResponseDto = {
  items: SLCFunctionGetResponseItemDto[];
  countItems: number;
};

export { type SLCFunctionGetResponseDto };
