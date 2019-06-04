import { BaseContext } from 'koa';

const authToken = async (ctx: BaseContext, next: () => Promise<any>) => {
  const { authorization } = ctx.request.headers;
  console.log(authorization);
  await next();
}

export default authToken;