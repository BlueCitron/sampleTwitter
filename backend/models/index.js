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

db.User.hasMany(db.Twit);
db.Twit.belongsTo(db.User);

// 유저 - 트윗
db.User.belongsToMany(db.Twit, { through: 'PostHashtag' });
db.Twit.belongsToMany(db.User, { through: 'PostHashtag' });

// 팔로잉
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });

// 좋아요
db.User.belongsToMany(db.Twit, { through: 'Like' });
db.Twit.belongsToMany(db.User, { through: 'Like' });

module.exports = db;
