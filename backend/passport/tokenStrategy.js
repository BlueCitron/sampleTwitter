import { Strategy } from 'passport-auth-token';
import bcrypt from 'bcrypt';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import moment from 'moment';

module.exports = (passport) => {
  passport.use('authtoken', new Strategy({
    usernameField: 'email',     // req.body.email
    passwordField: 'password',  // req.body.password
  }, async (email, password, done) => {
    try {
      const exUser = await User.find({ where: { email }});
      if (exUser) {
        // 비밀번호 검사
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, { accessToken });
        } else {
          done(null, false, { message: '회원 정보 또는 비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '회원 정보 또는 비밀번호가 일치하지 않습니다.' });
      }

    } catch (error) {
      console.log('localStrategy Error');
      done(error);
    }
  }));
};
