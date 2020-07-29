import { FastifySchema } from 'fastify';
import { Db } from '../../db';
import type { BodySchema } from './body.schema';
import bodySchema from './body.schema.json';

export type Schema = { Body: BodySchema }
export const schema: FastifySchema = { body: bodySchema };

export const createAuthHandler = ({ getDb }: { getDb: () => Promise<Db> }) => async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<boolean> => {
  const db = await getDb();
  const user = await db.findUser(email);
  return user.length === password.length;
};
