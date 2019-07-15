"use strict";

import { BaseContext } from "koa";

import models from "../../common/models";
import Response from "../../common/services/response";
const Account = models.get("Account");

interface UserQuery {
  userName?: string;
  email?: string;
}

interface OptionDelete {
  _id: string;
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
    const condition: UserQuery = ctx.query;
    const queryOption: UserQuery = Object
      .keys(condition)
      .filter(item => condition[item] !== "")
      .reduce((item, key) => {
        item[`${key === "userName" ? "name" : key}`] = condition[key];
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
    const { _id }: OptionDelete = ctx.query;
    const res = await Account.findOne({
      _id
    }).lean();

    // await res.updated({
    //   updatedBy: 
    // })

    console.log(res);

  }
}