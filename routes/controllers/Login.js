const appRoot = require('app-root-path');

const models = require(`${appRoot}/common/models`);
const Response = require(`${appRoot}/common/services/response`);
const Account = models.get('Account');

module.exports = {
  create: async (ctx) => {
    const { email, password, name } = ctx.request.body;
    console.log(ctx.request.body);
    
    const createField = {
      name, 
      email, 
      password 
    };
    
    const user = await Account.findOne({email: email}, {}).lean();
    
    if (user) {
      return new Response(ctx)
        .errorCode(450)
        .send();
    } else {
      const createAccount = await Account.create(createField);
      return new Response(ctx)
        .data(createAccount)
        .send();
    }
  }
}