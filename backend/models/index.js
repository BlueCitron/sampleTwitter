'use strict';

import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Twit = require('./twit')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// 유저 - 트윗
db.User.hasMany(db.Twit, { as: 'Twits' });
db.Twit.belongsTo(db.User, );

// 트윗 - 해시태그
db.Twit.belongsToMany(db.Hashtag, { through: 'TwitHashtag' });
db.Hashtag.belongsToMany(db.Twit, { through: 'TwitHashtag' });

// 팔로잉
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });

// 좋아요
db.User.belongsToMany(db.Twit, { through: 'Like' });
db.Twit.belongsToMany(db.User, { through: 'Like', as: 'LikeFrom' });

/*
  정리
  belongsTo : 해당 테이블에 target의 key값에 해당하는 column 추가
            : user -> userId / as: 'Writer' -> writerId
            : twit.addUser() / twit.addWriter
  belongsToMany : through에 해당하는 테이블에 target과의 관계 추가





*/
module.exports = db;
