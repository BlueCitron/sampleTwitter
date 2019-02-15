import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Twit } from '../models';
import { authenticateByToken } from './middleware';

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
    if (authError) {
      console.log('Error from authRouter [POST]/auth/login', authError)
      return next(authError);
    } else if (authResult) {
      const { id, email, nick, Followers, Followings, Twits, accessToken } = authResult;
      res.json({
        success: true,
        user: {
          id,
          email,
          nick,
          Followers,
          Followings,
          Twits,
        },
        accessToken,
      });
    } else {
      return res.json({
        success: false,
        message: '이메일 또는 비밀먼호를 확인해주세요.',
      });
    }
  })(req, res, next);
});

// deprecated
authRouter.post('/verify', authenticateByToken, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { id: req.user.id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }, {
        model: Twit,
        attributes: [ 'id' ],
        as: 'Twits',
      }],
    });
    const { id, email, nick, Followers, Followings, Twits } = exUser;
    const { TOKEN_SECRET, TOKEN_ISSUER, TOKEN_AUDIENCE } = process.env;
    const accessToken = await jwt.sign({ user: exUser }, TOKEN_SECRET, { issuer: TOKEN_ISSUER, audience: TOKEN_AUDIENCE });
    res.json({
      success: true,
      user: {
        id,
        email,
        nick,
        Followers,
        Followings,
        Twits,
      },
      accessToken,
    });
  } catch (error) {
    console.log('Error from authRouter [POST]/auth/verify', error);
    next(error);
  }
});

// authenticateByToken


export default authRouter;
