import local from './localStrategy';
//import kakao from './kakaoStrategy';
import jwt from './jwtStrategy';
import { User } from '../models';

module.exports = (passport) => {
  // passport.serializeUser(({ accessToken }, done) => {
  //   console.log('Passport Serialize');
  //   done(null, { accessToken });
  // });
  //
  // passport.deserializeUser((id, done) => {
  //   console.log('Passport Deserialize', id)
  //   User.find({
  //     where: { id },
  //     include: [{
  //       model: User,
  //       attributes: ['id', 'nick'],
  //       as: 'Followers',
  //     }, {
  //       model: User,
  //       attributes: ['id', 'nick'],
  //       as: 'Followings',
  //     }]
  //   })
  //   .then(user => done(null, user))
  //   .catch(err => done(err));
  // });
  local(passport);
  jwt(passport);
  // kakao(passport);
}
