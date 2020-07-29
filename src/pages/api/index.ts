import { createApp } from '../../app';
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTPMethods } from 'fastify';
import contentType from 'content-type';
import getRawBody from 'raw-body';

const app = createApp();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await app.ready();
  const response = await app.inject({
    method: req.method as HTTPMethods,
    url: req.url,
    payload: await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(req).parameters.charset,
    }),
    headers: req.headers,
  });
  Object.entries(response.headers).forEach(([key, value]) => res.setHeader(key, value));
  res.status(response.statusCode).send(response.rawPayload);
};
