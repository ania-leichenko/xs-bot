import { HttpError } from 'exceptions/exceptions';
import {
  ContentType,
  HttpHeader,
  HttpMethod,
  StorageKey,
} from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { Storage } from '../storage/storage.service';
import { getQueryString } from 'helpers/helpers';

type Constructor = {
  storage: Storage;
};

class Http {
  #storage: Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      params,
    } = options;
    const headers = this.getHeaders(contentType, hasAuth);

    return fetch(this.getUrl(url, params), {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  downloadBlob(url: string, options: Partial<HttpOptions> = {}): Promise<Blob> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      params,
    } = options;
    const headers = this.getHeaders(contentType, hasAuth);

    return fetch(this.getUrl(url, params), {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => res.blob())
      .catch(this.throwError);
  }

  private getHeaders(contentType?: ContentType, hasAuth?: boolean): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }
    if (hasAuth) {
      const token = this.#storage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }
    return response;
  }

  private getUrl(url: string, query?: Record<string, unknown>): string {
    return `${url}${query ? getQueryString(query) : ''}`;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
