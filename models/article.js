'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    headerimg: {
      type: DataTypes.STRING,
    },
    headerimgsource: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    }
  }, {});
  Article.associate = function(models){
  };
  return Article;
};




