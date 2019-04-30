'use strict';
module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define('Burger', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,30]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  Burger.associate = function(models) {
    // associations can be defined here
  };
  return Burger;
};