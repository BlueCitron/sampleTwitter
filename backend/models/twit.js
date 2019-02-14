module.exports = (sequelize, DataTypes) => (
  sequelize.define('twit', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
);
