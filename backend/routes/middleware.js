import jwt from 'jsonwebtoken';

export async function authenticateByToken (req, res, next) {
  const accessToken = req.body.accessToken || req.query.accessToken;
  if (accessToken) {
    try {
      const user = jwt.verify(accessToken, process.env.TOKEN_SECRET)
      req.user = user.user;
      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        message: 'Invalid accessToken',
      });
    }
  } else {
    res.status(403).json({
      success: false,
      message: 'Require an accessToken',
    });
  }
}
