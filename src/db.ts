export type Db = {
  findUser: (email: string) => Promise<string>;
};

export const getDb = (): Promise<Db> => Promise.resolve({ findUser: <T>(str: T): Promise<T> => Promise.resolve(str) });
