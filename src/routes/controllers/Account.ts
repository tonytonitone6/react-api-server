import models from 'models/index';
import jwt from 'jsonwebtoken';
const Account = models.get('Account');

const generateToken = (data) => {
  return jwt.sign({sub: data._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export default {
  get: async (ctx) => {
    const account = await Account.find({});
    ctx.body = { account }
  }
}