import { Router } from 'express';
import { User, Twit, Hashtag } from '../models';
import { authenticateByToken } from './middleware';

const twitRouter = Router();

twitRouter.get('/', authenticateByToken, async (req, res, next) => {
  try {
    //const { id } = req.query;
    const twits = await Twit.findAll({
      include: [
      {
        model: User,
        attributes: ['id', 'nick'],
      },
      {
        model: Hashtag,
        attributes: ['id', 'hash', 'content' ],
      }
    ]
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

// isLoggedIn
twitRouter.post('/', authenticateByToken, async (req, res, next) => {
  const { content } = req.body;
  try {
    const twits = await Twit.create({
      content,
      userId: req.user.id,
    });

    const hashtags = content.match(/#[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate(
        { where: { hash: tag.slice(1).toLowerCase() }, defaults: { content: tag } },
      )));
      await twits.setHashtags(result.map(r => r[0]));
    }
    return res.json({
      success: true,
    })
  } catch (error) {
    console.log('Error from [POST]/twit/', error);
    next(error);
  }
});

export default twitRouter;
