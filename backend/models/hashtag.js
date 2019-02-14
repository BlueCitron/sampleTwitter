module.exports = (sequelize, DataTypes) => (
  sequelize.define('hashtag', {
    hash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
  })
);
