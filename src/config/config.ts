import * as Joi from 'joi';
import * as dotenv from "dotenv";

dotenv.config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: Joi.number()
      .default(3000),
  JWT_SECRET: Joi.string().required()
    .description('Need jwt to auth'),
  MONGO_HOST: Joi.string().required()
    .description('mongo uri'),
  MONGO_PORT: Joi.number()
    .default(27017),
  REDIS_HOST: Joi.string().required()
    .description('redis uri')
}).unknown()
  .required();

const { error, value:envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
};

export default config;