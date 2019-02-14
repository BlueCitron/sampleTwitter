import { Strategy, ExtractJwt } from 'passport-jwt'

module.exports = (passport) => {
  const { TOKEN_SECRET, TOKEN_ISSUER, TOKEN_AUDIENCE } = process.env
  const opts = {
    jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
    secretOrKey: TOKEN_SECRET,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  }
  passport.use(new Strategy(opts, function(jwt_payload, done) {
    // 쓸일이 없네..?
    console.log('passportStrategy : ', jwt_payload, opts)
    if (jwt_payload) done(null, jwt_payload)
    else {
      done(false)
    }
  }));
}
