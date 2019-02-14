import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import redis from 'redis';
import connectRedis from 'connect-redis';

import router from './routes';
import { sequelize } from './models';
import passportConfig from './passport';

passportConfig(passport);
sequelize.sync({ force: false });
dotenv.config();

const app = express();
const { COOKIE_SECRET, SESSION_SECRET, PORT, NODE_ENV } = process.env;
const RedisStore = connectRedis(session);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//     maxAge: (4 * 60 * 60 * 1000),
//    },
//    store: new RedisStore({ url: 'http://localhost:6379', logErrors: true }),
// }));

app.use(passport.initialize());
//app.use(passport.session());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`)
});

import moment from 'moment';
console.log(moment().add(2, 'hours').toString())
