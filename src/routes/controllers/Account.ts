'use strict';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import { BaseContext } from 'koa';
import models from '../../common/models';

const verify = util.promisify(jwt.verify);
const Account = models.get('Account');


export default class AccountController {
  public static async get(ctx: BaseContext) {
    const { authorization } = ctx.request.headers;
    const res = await verify(authorization , process.env.JWT_SECRET);
    console.log(res);
  }
}
