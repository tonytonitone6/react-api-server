const appRoot = require('app-root-path');
const models = require(`${appRoot}/common/models`);
const jwt = require('jsonwebtoken');
const Account = models.get('Account');

const generateToken = (data) => {
  return jwt.sign({sub: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
  get: async (ctx) => {
    const account = await Account.find({});
    ctx.body = { account }
  }
}