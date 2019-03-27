import * as mongoose from 'mongoose';
import * as fs from 'fs';
import config from '../../config/config';
import * as path from 'path';
import logger from '../services/logger';
const dir = path.join(__dirname, 'schemas');

(<any>mongoose).Promise = global.Promise;


const option = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectInterval: 1000
};

export default {
  init: function() {
    return new Promise((resolve, reject) => {
      // mongoose.connect(config.mongo.host, (err) => {
      //   if (err) {
      //     logger.error(err);
      //     mongoose.disconnect();
      //     process.exit(1);
      //   }
      // });
      mongoose.connect(config.mongo.host, option);
      mongoose.connection
        .on('error', err => {
          logger.error(err);
        })
        .on('disconnected', () => {
          logger.error('Disconnected from DB')
        })
        .once('open', function() {
          logger.info('Connection to Mongoose was successful!');
          try {
            fs.readdirSync(dir)
              .filter(file => {
                return path.extname(file) === '.ts';
              })
              .forEach(file => {
                require(path.join(dir, file));
                logger.info(`Loading model ${file.split('.')[0]}`);
              });
              resolve();
          } catch (error) {
            logger.error(error);
            reject(error);
          }
        });
    });
  },
  get: function(name) {
    return mongoose.model(name);
  }
}