'use strict';

import models from '../../common/models';
import Response from '../../common/services/response';
import { BaseContext } from 'koa';
import jwt from 'jsonwebtoken';
const Account = models.get('Account');



const generateToken = (data) => {
  return jwt.sign({sub: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default class Create  {
  public static async create(ctx: BaseContext) {
    const { email, password } = ctx.request.body;
    const createField = { email, password };
    const user = await Account.findOne({email: email}, {}).lean();

    if (user) {
      return new Response(ctx)
        .errorCode(450)
        .send();
    } else {
      const createAccount = await Account.create(createField);
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

    if (!email && !password) {
      return new Response(ctx)
        .errorCode(822)
        .send();
    }

    const user = await Account.findOne({email});
    const token = await generateToken.call(this, user);

    return new Response(ctx)
      .data({auth: true, token})
      .send();
  }


}