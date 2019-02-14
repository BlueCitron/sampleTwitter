import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../models';
const authRouter = Router();

authRouter.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.find({ where: { email }});
    if (exUser) {
      return res.json({
        success: false,
        message: '이미 존재하는 이메일입니다.',
      });
    }
    const hash = await bcrypt.hash(password, 9);
    User.create({
      email,
      nick,
      password: hash,
    });

    return res.json({ success: true });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.log('authError from authRouter/login');
      return next(authError);
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'Login Fail.',
      });
    }
    return req.login({ accessToken }, (loginError) => {
      console.log('LoginRouter : ', user)
      if (loginError) {
        console.log('LoginError from authRouter/login');
        return next(loginError);
      }
      const { email, nick } = user;
      req.session.test = 'HELLO WORLD'
      console.log('authRouter Login : ', req.session)
      return res.json({
        success: true,
        accessToken,
      });
    });

  })(req, res, next);
});

authRouter.get('/logout', (req, res, next) => {
  console.log('authRouter Logout : ', req.session)
  req.logout();
  res.json({
    success: true,
  })
});

export default authRouter;
