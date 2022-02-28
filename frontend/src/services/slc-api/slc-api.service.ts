import {
  ApiPath,
  SLCApiPath,
  SLCFunctionApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  SLCFunctionCreateRequestDto,
  SLCFunctionCreateResponseDto,
  SLCFunctionGetRequestParamsDto,
  SLCFunctionGetResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class SLCApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public createFunction(
    payload: SLCFunctionCreateRequestDto,
  ): Promise<SLCFunctionCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.SLC, SLCApiPath.SLC_FUNCTIONS),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public loadFunctions(
    params: SLCFunctionGetRequestParamsDto,
  ): Promise<SLCFunctionGetResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.SLC, SLCApiPath.SLC_FUNCTIONS),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public deleteFunction(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SLC,
        SLCApiPath.SLC_FUNCTIONS,
        SLCFunctionApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
  }
}

export { SLCApi };
