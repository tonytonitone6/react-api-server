'use strict';

import models from '../../common/models';
import * as jwt from 'jsonwebtoken';
import { BaseContext } from 'koa';

const Account = models.get('Account');

const generateToken = (data) => {
  return jwt.sign({sub: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default class AccountController {
  public static async get(ctx: BaseContext) {
    const account = await Account.find({});
    ctx.body = { account }
  }
}
