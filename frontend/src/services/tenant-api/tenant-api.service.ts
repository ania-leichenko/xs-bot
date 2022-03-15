import {
  TenantsApiPath,
  ApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  EAMTenantByIdRequestParamsDto,
  EAMTenantByIdResponseDto,
  EAMTenantUpdateRequestDto,
} from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};
class TenantApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getTenant(
    params: EAMTenantByIdRequestParamsDto,
  ): Promise<EAMTenantByIdResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.TENANTS, '/', params.id),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }

  public updateTenant(
    params: EAMTenantUpdateRequestDto,
  ): Promise<EAMTenantByIdResponseDto> {
    return this.#http.load(
      joinItems(
        this.#apiPrefix,
        ApiPath.TENANTS,
        TenantsApiPath.ROOT,
        params.id,
      ),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ name: params.name }),
      },
    );
  }
}

export { TenantApi };
