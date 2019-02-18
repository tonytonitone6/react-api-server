"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = require("koa");
const koa_body_parser_1 = require("koa-body-parser");
const koa_logger_1 = require("koa-logger");
const models_1 = require("./src/common/models");
const logger_1 = require("./src/common/services/logger");
// const router = require('./routes');
const routes_1 = require("./src/routes");
const app = new koa_1.default();
const PORT = process.env.PORT || 4000;
app.use(koa_body_parser_1.default());
app.use(koa_logger_1.default());
models_1.default.init()
    .then(() => {
    app.use(routes_1.default.routes()).use(routes_1.default.allowedMethods());
});
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (error) {
        logger_1.default.error(error);
        ctx.body = error.message;
        ctx.status = error.status || 500;
    }
}));
app.listen(PORT, () => console.log(`server start,  port is ${PORT}`));
