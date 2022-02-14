import { stringify } from 'query-string';

const getQueryString = (params: Record<string, unknown>): string =>
  `?${stringify(params)}`;

export { getQueryString };
