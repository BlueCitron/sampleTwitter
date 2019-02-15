import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User, Twit } from '../models';
import jwt from 'jsonwebtoken';
import moment from 'moment';

module.exports = (passport) => {
  passport.use('token', new Strategy({
    usernameField: 'email',     // req.body.email
    passwordField: 'password',  // req.body.password
  }, async (sendedEmail, sendedPassword, done) => {
    try {
      const { TOKEN_SECRET, TOKEN_ISSUER, TOKEN_AUDIENCE } = process.env;
      const exUser = await User.findOne({
        where: { email: sendedEmail },
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
      console.log('localStrategy..', exUser)

      if (exUser) {
        // 비밀번호 검사
        const { id, email, nick, password, Followers, Followings, Twits } = exUser;
        const result = await bcrypt.compare(sendedPassword, password);
        if (result) {
          // 인증 성공 - 토큰 발행
          const accessToken = await jwt.sign({
            user: exUser
          }, TOKEN_SECRET, {
            issuer: TOKEN_ISSUER,
            audience: TOKEN_AUDIENCE,
          });

          done(null, {
            authenticated: true,
            id,
            email,
            nick,
            Followers,
            Followings,
            Twits,
            accessToken,
          });

        } else {
          // 비밀번호 일치하지 않음
          done(null, { authenticated: false });
        }
      } else {
        // 이메일 존재하지 않음
        done(null, { authenticated: false });
      }
    } catch (error) {
      done(error)
    }
  }));
};
