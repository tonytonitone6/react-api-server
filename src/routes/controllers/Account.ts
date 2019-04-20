'use strict';

import { BaseContext } from 'koa';

import models from '../../common/models';
import Response from '../../common/services/response';

const Account = models.get('Account');


export default class AccountController {

  public static async get(ctx: BaseContext) {
    try {
      const user = await Account.find({}).lean();
      const userData = [
        ...user
      ];
      return new Response(ctx)
        .data(userData)
        .send();
    } catch (error) {
    }
  }
}