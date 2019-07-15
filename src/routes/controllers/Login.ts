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


interface ISigninStatus {
  user: {
    _id: () => string;
  };
}

interface ISigninData {
  email: string;
  password: string;
  name: string;
}


export default class LoginController  {
  public static async create(ctx: BaseContext): Promise<{Response}> {
    const { email, password, name }: ISigninData = ctx.request.body;
    const dataField = Object.values({
      email,
      password,
      name
    });

    if (dataField.includes("undefined")) {
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
      console.log(createAccount, "signin");
      return new Response(ctx)
        .data(createAccount)
        .send();
    }
  }

  public static async get(ctx: BaseContext) {
    const { user: { _id } }: ISigninStatus = ctx.request;
    const token = await jwtSign({sub: _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const res = {
      _id,
      token
    };

    return new Response(ctx)
      .data(res)
      .send();
  }
}