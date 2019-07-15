"use strict";

import logger from "./logger";
import * as errorMessages from "../../config/errorCodes.json";
import { BaseContext } from "koa";

interface Template {
  isSuccess: boolean;
  result: any | undefined;
  error: {
    code: number | undefined;
    message: string | undefined;
  };
}

export default class Response {
  _res: BaseContext;
  _status: number;
  _template: any;

  constructor(public ctx: BaseContext) {
    this._res = ctx;
    this._status = 200;
    this._template = {
      isSuccess: true,
      result: undefined,
      error: {
        code: undefined,
        message: undefined
      }
    } as Template;
  }

  status(status: number) {
    this._status = status;
    return this;
  }

  errorCode(code: number) {
    this._template.isSuccess = false;
    const errorMessage = errorMessages[code] || "";
    this._template.error.code = code;
    this._template.error.message = this._template.error.message || errorMessage;
    return this;
  }

  data(data: any) {
    this._template.result = data;
    return this;
  }

  throw(code: number, message: string) {
    this._template.error.code = code;
    this._template.error.message = message;
    return this._res.throw(this._template);
  }

  send() {
    if (!this._template.isSuccess) {
      logger.warn(this._template.error.message);
    }
    return (this._res.body = this._template);
  }
}
