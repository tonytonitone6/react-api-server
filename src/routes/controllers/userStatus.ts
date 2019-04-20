'use strict';
import { verify, VerifyOptions } from 'jsonwebtoken';
import * as util from 'util';
import { BaseContext } from 'koa';
import models from '../../common/models';
import Response from '../../common/services/response';

const jwtVerify = util.promisify(verify) as (
  token: string,
  secretOrPublicKey: string | Buffer,
  option?: VerifyOptions
) => Promise<any>;


export default class AccountController {
  public static async get(ctx: BaseContext) {
    const { authorization } = ctx.request.headers;
    try {
      const res = await jwtVerify(authorization , process.env.JWT_SECRET);
      return new Response(ctx)
        .data(res)
        .send();
    } catch (error) {
      return new Response(ctx)
        .errorCode(501)
        .data(error)
        .send();
    }
  }
}
