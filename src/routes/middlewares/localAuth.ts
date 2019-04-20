import passport from './passport';
import Response from '../../common/services/response';

const userAuth = async (ctx, next) => {
  return passport.authenticate('signinAuth', { session: false }, async (err, user, info) => {
    try {
      if (!user) throw(info);
      ctx.request.user = user;
      await next();
    } catch (err) {
      return new Response(ctx)
        .errorCode(411)
        .data(err)
        .send();
    }
  })(ctx, next);
};

export {
  userAuth
};