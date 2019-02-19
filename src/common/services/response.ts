'use strict';

import logger from './logger';
import * as errorMessages from '../../config/errorCodes.json';
import { BaseContext } from 'koa';

export default class Response {

  _res: any;
  _status: number;
  _template: any;

  constructor(ctx: BaseContext) {
    this._res = ctx;
    this._status = 200;
    this._template = {
      isSuccess: true,
      result: null,
      error: {
        code: null,
        message: null
      }
    };
  }

  status(status: number) {
    this._status = status;
    return this._status;
  }

  errorCode(code: number) {
    this._template.isSuccess = false;
    const errorMessage = errorMessages[code] || '';
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
    return this._res.body = this._template;
  }
}