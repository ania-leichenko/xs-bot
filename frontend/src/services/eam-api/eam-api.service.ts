import {
  ApiPath,
  ContentType,
  EAMApiPath,
  GroupsApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMGroupCreateRequestDto,
  EAMGroupCreateResponseDto,
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
  public createGroup(
    payload: EAMGroupCreateRequestDto,
  ): Promise<EAMGroupCreateResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.EAM, EAMApiPath.GROUPS),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { EAMApi };
