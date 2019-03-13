import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as koaLogger from "koa-logger";
import * as http from 'http';
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as xml2js from 'xml2js';
import models from "./common/models";
import logger from "./common/services/logger";

const gunzipStram = zlib.createGunzip();

const app: Koa = new Koa();
const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(koaLogger());

// let download = function() {
//   const file = fs.createWriteStream('test.xml');
//   const request = http.get('http://tisvcloud.freeway.gov.tw/roadlevel_value5.xml.gz', function(res) {
//     res.pipe(gunzipStram).pipe(file);
//   })
// }
// download();

(function() {
  let path = __dirname + '/../test.xml';
  fs.readFile(path, "utf8", function(err, text) {
    const parseString = xml2js.parseString;
    parseString(text, (err, result) => {
      console.log(result.XML_Head.Infos[0].Info);
    })
  })

})()



// models.init()
//   .then(() => {
//     import('./routes')
//       .then(({router}) => {
//         app.use(router.routes()).use(router.allowedMethods());
//       })
//   });

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (error) {
//     logger.error(error);
//     ctx.body = error.message;
//     ctx.status = error.status || 500;
//   }
// });

app.listen(PORT, () => console.log(`server start,  port is ${PORT}`));
