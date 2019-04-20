'use strict';

import { BaseContext } from 'koa';
import { sign, SignOptions, Secret } from 'jsonwebtoken';
import * as util from 'util';

import models from '../../common/models';
import Response from '../../common/services/response';
const Account = models.get('Account');

const jwtSign = util.promisify(sign) as (
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options: SignOptions
  ) => Promise<string>;


export default class Create  {
  public static async create(ctx: BaseContext) {
    const { email, password, name } = ctx.request.body;
    const dataField = Object.values({
      email,
      password,
      name
    });

    if (dataField.includes('undefined')) {
      return new Response(ctx)
        .errorCode(421)
        .send();
    }

    const user = await Account.findOne({email: email}, {}).lean();

    if (user) {
      return new Response(ctx)
        .errorCode(450)
        .send();
    } else {
      const createAccount = await Account.create({
        email,
        password,
        name
      });
      return new Response(ctx)
        .data(createAccount)
        .send();
    }
  }

  public static async get(ctx: BaseContext) {
    const { user } = ctx.request;
    const token = await jwtSign({sub: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

    return new Response(ctx)
      .data(token)
      .send();
  }
}