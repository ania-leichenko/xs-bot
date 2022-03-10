import {
  ApiPath,
  SCApiPath,
  InstancesApiPath,
  HttpMethod,
  ContentType,
} from 'common/enums/enums';
import {
  SCOperationSystemGetAllResponseDto,
  SCInstanceCreateRequestDto,
  SCInstanceUpdateRequestDto,
  SCInstanceUpdateParamsDto,
  SCInstanceCreateResponseDto,
  SCInstanceUpdateResponseDto,
  SCInstanceGetByTenantRequestParamsDto,
  SCInstanceGetByTenantResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';
import { joinItems } from 'helpers/helpers';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class SCApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public async loadOperationSystems(): Promise<SCOperationSystemGetAllResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.SC, SCApiPath.OPERATION_SYSTEMS),
      {
        method: HttpMethod.GET,
      },
    );
  }

  public async loadInstances(
    params: SCInstanceGetByTenantRequestParamsDto,
  ): Promise<SCInstanceGetByTenantResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.SC, SCApiPath.ROOT),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public async createInstance(
    payload: SCInstanceCreateRequestDto,
  ): Promise<SCInstanceCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.SC, SCApiPath.ROOT),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public async updateInstance(
    payload: SCInstanceUpdateParamsDto & SCInstanceUpdateRequestDto,
  ): Promise<SCInstanceUpdateResponseDto> {
    const { id, ...data } = payload;
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SC,
        SCApiPath.INSTANCES,
        InstancesApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(data),
      },
    );
  }

  public deleteInstance(id: string): Promise<boolean> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.SC,
        SCApiPath.INSTANCES,
        InstancesApiPath.ROOT,
        id,
      ),
      {
        method: HttpMethod.DELETE,
      },
    );
  }
}

export { SCApi };
