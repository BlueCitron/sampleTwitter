import { Router } from 'express';

import authRouter from './auth';
import twitRouter from './twit';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/twit', twitRouter);
router.use('/user', userRouter);

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  })
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Server Error',
  });
};

router.get('/', (req, res) => {
  res.json('Hello World')
});

router.use(notFoundHandler);
router.use(errorHandler);

export default router;
