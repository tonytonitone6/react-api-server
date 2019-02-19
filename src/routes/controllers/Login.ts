'use strict';

import models from '../../common/models';
import Response from '../../common/services/response';
import { BaseContext } from 'koa';
const Account = models.get('Account');

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
}