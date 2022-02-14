import { EAMApiPath } from 'bws-shared';
import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { EAMWorkerGetAllResponseDto } from 'common/types/types';
import { joinItems } from 'helpers/helpers';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class WorkerApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllWorkers(): Promise<EAMWorkerGetAllResponseDto> {
    return this.#http.load(
      joinItems(this.#apiPrefix, ApiPath.EAM, '/', EAMApiPath.WORKERS),
      {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
    );
  }
}

export { WorkerApi };
