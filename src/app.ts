import fastify from 'fastify';
import * as authHandlerModule from './handlers/auth/handler';
import { getDb } from './db';

export const createApp = () => {
  const app = fastify({
    logger: true,
  });

  app.get('/api/ping', async () => {
    return 'pong\n';
  });

  const authHandler = authHandlerModule.createAuthHandler({ getDb });

  app.post<authHandlerModule.Schema>(
    '/api/auth',
    {
      schema: authHandlerModule.schema,
    },
    async (req) => {
      return authHandler({ email: req.body.email, password: req.body.password });
    },
  );

  return app;
};
