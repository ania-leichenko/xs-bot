import {
  ApiPath,
  EAMApiPath,
  GroupsApiPath,
  WorkersApiPath,
  HttpMethod,
  ContentType,
} from 'common/enums/enums';
import {
  EAMWorkerGetAllResponseDto,
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class EAMApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public loadGroups(
    params: EAMGroupGetByTenantRequestParamsDto,
  ): Promise<EAMGroupGetByTenantResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        GroupsApiPath.ROOT,
      ),
      {
        method: HttpMethod.GET,
        params,
      },
    );
  }

  public getAllWorkers(): Promise<EAMWorkerGetAllResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.WORKERS,
        WorkersApiPath.ROOT,
      ),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { EAMApi };
