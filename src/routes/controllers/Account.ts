'use strict';

import { BaseContext } from 'koa';

import models from '../../common/models';
import Response from '../../common/services/response';
const Account = models.get('Account');

interface userQuery {
  userName?: string;
  email?: string;
}


export default class AccountController {

  public static async list(ctx: BaseContext) {
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

  public static async get(ctx: BaseContext) {
    const condition: userQuery = ctx.query;
    const queryOption: userQuery = Object
      .keys(condition)
      .filter(item => condition[item] !== '')
      .reduce((item, key) => {
        item[`${key === 'userName' ? 'name' : key}`] = condition[key];
        return item;
      }, {});
    try {
      const res = await Account.find(queryOption).lean();
      return new Response(ctx)
        .data(res)
        .send();
    } catch (error) {
      console.log(error);
    }
  }

  public static async delete(ctx: BaseContext) {
    
  }
}