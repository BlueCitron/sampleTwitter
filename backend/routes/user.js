import { Router } from 'express';

import { User } from '../models';
import { authenticateByToken } from './middleware';

const userRouter = Router();

userRouter.post('/:id/follow', authenticateByToken, async (req, res, next) => {
  // 팔로잉 하려는 사람
  const sourceId  = req.user.id;
  // 팔로우 받는 사람
  const targetId = req.params.id;
  try {
    if (sourceId === targetId) {
      return res.json({
        success: false,
        message: '자기 자신을 팔로우할 수 없습니다.',
      })
    }
    // 팔로잉 하려는 사람
    const sourceUser = await User.findOne({ where: { id: sourceId } });
    // 에게 팔로잉(팔로우하는 사람)을 추가
    sourceUser.addFollowing(parseInt(targetId, 10));
    res.json({
      success: true,
      info: {
        sourceId,
        targetId,
      }
    });
  } catch (error) {
    console.log('Error from userRouter [POST]/user/:id/follow', error);
    next(error);
  }
});

userRouter.post('/:id/unfollow', authenticateByToken, async (req, res, next) => {
  // 팔로잉 하려는 사람
  const sourceId  = req.user.id;
  // 팔로우 받는 사람
  const targetId = req.params.id;
  try {
    if (sourceId === targetId) {
      return res.json({
        success: false,
        message: '자기 자신을 언팔로우할 수 없습니다.',
      })
    }
    // 언팔 하려는 사람
    const sourceUser = await User.findOne({ where: { id: sourceId } });
    // 에게서 팔로잉(팔로우하는 사람)을 삭제
    sourceUser.removeFollowing(parseInt(targetId, 10));
    res.json({
      success: true,
      info: {
        sourceId,
        targetId,
      }
    });
  } catch (error) {
    console.log('Error from userRouter [POST]/user/:id/follow', error);
    next(error);
  }
});


export default userRouter;
