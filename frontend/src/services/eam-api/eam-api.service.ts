import { ApiPath, EAMApiPath, HttpMethod } from 'common/enums/enums';
import {
  EAMGroupGetByTenantRequestParamsDto,
  EAMGroupGetByTenantResponseDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';
import { getQueryString } from './helpers/helpers';

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
  ): Promise<EAMGroupGetByTenantResponseDto[]> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.EAM,
        EAMApiPath.GROUPS,
        getQueryString(params),
      ),
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { EAMApi };
