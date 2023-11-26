import { ParsedUrlQuery } from 'querystring';

export interface Request extends ParsedUrlQuery {
  search?: string;
  page?: string;
  count?: string;
}
