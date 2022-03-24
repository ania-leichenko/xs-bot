import {
  ApiPath,
  BSApiPath,
  ContentType,
  HttpMethod,
  SpacesApiPath,
} from 'common/enums/enums';
import {
  BSObjectGetRequestParamsDto,
  BSObjectGetResponseDto,
  BSSpaceCreateRequestDto,
  BSSpaceCreateResponseDto,
  BSSpaceGetRequestParamsDto,
  BSSpaceGetResponseDto,
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

  public loadSpaces(
    params: BSSpaceGetRequestParamsDto,
  ): Promise<BSSpaceGetResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.BS, BSApiPath.SPACES),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public deleteSpace(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
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

  public loadObjects(
    filter: BSObjectGetRequestParamsDto,
    params: { id: string },
  ): Promise<BSObjectGetResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.BS,
        BSApiPath.SPACES,
        SpacesApiPath.ROOT,
        params.id,
        SpacesApiPath.OBJECTS,
      ),
      {
        method: HttpMethod.GET,
        params: filter,
      },
    );
  }
}

export { BSApi };
