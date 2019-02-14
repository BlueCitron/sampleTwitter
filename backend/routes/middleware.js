export function isLoggedIn (req, res, next) {
  console.log('req.isAuthenticated() : ', req.isAuthenticated())
  console.log('User : ', req.user)
  console.log('Session : ', req.session)
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: '로그인 필요' });
  }
}

export function isNotLoggedIn (req, res, next) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: '비로그인 사용자 전용' });
  }
}
