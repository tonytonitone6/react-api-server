import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import models from '../../common/models';

const Account = models.get('Account')
const LocalStrategy = passportLocal.Strategy;


const loginAuth = new LocalStrategy({
  usernameField: 'email'
}, (async(email, password, done) => {
  const user = await Account.findOne({email});

  if (!user) {
    return done(null, false, {message: 'Account not exist'});
  }

  user.schema.methods.comparePassword(password, user.password)

}));

passport.use('signinAuth', loginAuth);

export default passport;