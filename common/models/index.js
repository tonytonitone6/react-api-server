'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../../config/config');
const path = require('path');
const logger = require('../services/logger');
const dir = path.join(__dirname, 'schemas');

mongoose.Promise = global.Promise;

module.exports = {
  init: function() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.mongo.host, err => {
        if (err) {
          logger.error(err);
          mongoose.disconnect();
          process.exit(1);
        }
      });
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
                return path.extname(file) === '.js';
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