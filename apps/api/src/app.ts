import 'isomorphic-fetch';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import koaPlayground from 'graphql-playground-middleware-koa';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';

import { schema } from './schema/schema';
import { getUser } from './services/auth';
import { getContext } from './services/getContext';
import { authMiddleware } from './middlewares/authentication';

const router = new Router();

const app = new Koa();

app.use(bodyParser());

app.on('error', (err) => {
  console.log('app error: ', err);
});

app.use(cors());

router.all(
  '/graphiql',
  koaPlayground({
    endpoint: '/graphql',
  })
);

router.all('/graphql', async (ctx) => {
  const { user } = await getUser(ctx.header.authorization);
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => {
        return getContext({
          ctx,
          user,
        });
      },
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
