import {
  ApiPath,
  BSApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  BSSpaceCreateRequestDto,
  BSSpaceCreateResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class BSApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public createSpace(
    payload: BSSpaceCreateRequestDto,
  ): Promise<BSSpaceCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.BS, BSApiPath.SPACES),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { BSApi };
