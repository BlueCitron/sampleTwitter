import { Router } from 'express';
import { User, Twit, Hashtag } from '../models';
import { authenticateByToken } from './middleware';

const twitRouter = Router();

twitRouter.get('/', authenticateByToken, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        id: req.user.id
      },
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
    const followingIds = exUser.Followings.map(following => following.id)
    followingIds.push(req.user.id)
    const twits = await Twit.findAll({
      where: {
        userId: followingIds,
      },
      include: [
        {
          model: User,
          //as: 'Writer',
          attributes: ['id', 'nick'],
        },
        {
          model: Hashtag,
          attributes: ['id', 'hash', 'content' ],
        },
        {
          model: User,
          as: 'LikeFrom',
          attributes: ['id', 'nick'],
        },
      ],
      order: [ [ 'createdAt', 'DESC' ] ]
    });

    return res.json({
      success: true,
      data: twits,
    });
  } catch (error) {
    console.log('Error from [GET]/twit/', error);
    next(error);
  }
});


twitRouter.post('/', authenticateByToken, async (req, res, next) => {
  const { content } = req.body;
  try {
    // 트윗 생성
    const { id } = req.user;
    const twit = await Twit.create({
      content,
      userId: id,
    });
    // 트윗 - 유저 관계 설정
    const exUser = await User.findOne({ where: { id }});
    await exUser.addTwit(twit);

    const hashtags = content.match(/#[^\s]*/g);
    if (hashtags) {
      // 해시태그 생성
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate(
        { where: { hash: tag.slice(1).toLowerCase() }, defaults: { content: tag } },
      )));
      // 트윗 - 해시태그 관계 설정
      await twit.setHashtags(result.map(r => r[0]));
    }
    return res.json({
      success: true,
    })
  } catch (error) {
    console.log('Error from [POST]/twit/', error);
    next(error);
  }
});

twitRouter.post('/:id/like', authenticateByToken, async (req, res, next) => {

  const { id } = req.params;

  try {
    const exUser = await User.findOne({ where: { id: req.user.id } });
    const twit = await Twit.findOne({ where: { id } });

    await twit.addLikeFrom(exUser);

    res.json({ success: true })
  } catch (error) {
    console.log('Error from twitRouter [POST]/twit/:id/like', error);
    next(error);
  }
});

twitRouter.post('/:id/unlike', authenticateByToken, async (req, res, next) => {

  const { id } = req.params;

  try {
    const exUser = await User.findOne({ where: { id: req.user.id } });
    const twit = await Twit.findOne({ where: { id } });

    await twit.removeLikeFrom(exUser);

    res.json({ success: true })
  } catch (error) {
    console.log('Error from twitRouter [POST]/twit/:id/like', error);
    next(error);
  }
});

export default twitRouter;
