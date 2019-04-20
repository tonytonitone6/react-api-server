import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import { Document } from 'mongoose';
import models from '../../common/models';

const Account = models.get('Account');
const LocalStrategy = passportLocal.Strategy;


const loginAuth = new LocalStrategy({
  usernameField: 'email'
}, ((email, password, done) => {
  Account.findOne({email}, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      console.log(isMatch, 'match');
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
}));

passport.use('signinAuth', loginAuth);

export default passport;