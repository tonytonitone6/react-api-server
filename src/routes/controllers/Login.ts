'use strict';

import { BaseContext } from 'koa';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-nodejs';

import models from '../../common/models';
import Response from '../../common/services/response';
const Account = models.get('Account');

const generateToken = data => {
  return jwt.sign({sub: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
};

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
    const {
      email,
      password
    } = ctx.request.body;
    

  }
}