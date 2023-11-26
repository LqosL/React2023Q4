import { Result } from './Result';
import { DetailedInfo } from './DetailedInfo';

export type PageState = {
  search: string;
  page: string;
  count: string;
  json: { docs: Array<Result> };
  details?: DetailedInfo;
};
