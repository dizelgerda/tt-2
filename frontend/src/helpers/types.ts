export type PlainObject<T = string> = { [key: string]: T };

export type User = {
  _id: string;
  name: string;
  email: string;
};
