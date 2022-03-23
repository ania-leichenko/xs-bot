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
  SLCFunctionLoadParamsDto,
  SLCFunctionLoadResponseDto,
  SLCFunctionUpdateParamsDto,
  SLCFunctionUpdateRequestDto,
  SLCFunctionUpdateResponseDto,
  SLCFunctionRunParamsDto,
  SLCFunctionRunRequestDto,
  SLCFunctionRunResponseDto,
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

  public loadFunction({
    id,
  }: SLCFunctionLoadParamsDto): Promise<SLCFunctionLoadResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SLC,
        SLCApiPath.SLC_FUNCTIONS,
        SLCFunctionApiPath.ROOT,
        id,
      ),
    );
  }

  public updateFunction(
    { id }: SLCFunctionUpdateParamsDto,
    payload: SLCFunctionUpdateRequestDto,
  ): Promise<SLCFunctionUpdateResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SLC,
        SLCApiPath.SLC_FUNCTIONS,
        SLCFunctionApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public runFunction({
    params,
    payload,
  }: {
    params: SLCFunctionRunParamsDto;
    payload: SLCFunctionRunRequestDto;
  }): Promise<SLCFunctionRunResponseDto> {
    const { id } = params;

    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SLC,
        SLCApiPath.SLC_FUNCTIONS,
        SLCFunctionApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload.payload),
      },
    );
  }
}

export { SLCApi };
