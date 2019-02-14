import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { User } from '../models';
const authRouter = Router();

authRouter.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email }});
    if (exUser) {
      return res.json({
        success: false,
        message: '이미 존재하는 이메일입니다.',
      });
    }
    const hash = await bcrypt.hash(password, process.env.ENCRYPT_COUNT / 1);
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
  passport.authenticate('token', (authError, authResult, info) => {
    const { authenticated } = authResult;

    if (authenticated) {
      const { id, email, nick, accessToken } = authResult;
      res.json({
        success: true,
        id,
        email,
        nick,
        accessToken,
      });
    } else {
      res.json({
        success: false,
        message: '이메일 또는 비밀먼호를 확인해주세요.',
      });
    }
  })(req, res, next);
});

// deprecated
authRouter.get('/logout', (req, res, next) => {
  req.logout();
  res.json({
    success: true,
  })
});

export default authRouter;
