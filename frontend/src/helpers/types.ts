export type PlainObject<T = string> = { [key: string]: T };

export type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type File = {
  _id: string;
  name: string;
  newsID: string;
};

export type News = {
  _id: string;
  text: string;
  owner: string | User;
  published: boolean;
  publishedAt: string;
  files: string[] | File[];
};
