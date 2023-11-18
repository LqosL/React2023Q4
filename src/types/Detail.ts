export type Detail = {
  title: string;
  description?: {
    value: string;
  };
  subjects?: Array<string>;
  key: string;
  authors: { author: { key: string } }[];
};
