import { Router } from 'express';
import { User, Twit } from '../models';
import { isLoggedIn } from './middleware';

const twitRouter = Router();

twitRouter.get('/', async (req, res, next) => {
  try {
    //const { id } = req.query;
    const twits = await Twit.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      }
    });

    return res.json({
      success: true,
      data: twits,
    });
  } catch (error) {
    console.log('Error from [GET]/twit/');
    next(error);
  }
});

// isLoggedIn
twitRouter.post('/', async (req, res, next) => {
  const { content } = req.body;
  //const userId = req.user.id;
  console.log('twitRouter : ', req.session)

  try {
    const twits = await Twit.create({
      content,
      userId,
    });

    const hashtags = content.match(/#[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() }
      })));
      console.log('Hashtag Promise result : ', result);
      await twits.addHashtags(result.map(r => r[0]));
    }
    return res.json({
      success: true,
    })
  } catch (error) {
    console.log('Error from [POST]/twit/');
    next(error);
  }
});

export default twitRouter;
