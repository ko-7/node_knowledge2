'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validata: {
        // 未入力の禁止
        notEmpty: {
          // エラー文の内容
          msg: "名前は必ず入力してください。"
        }
      }
    },
    pass: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "パスワードは必ず入力してください。" }
      }
    },
  }, {});

  // 他モデルとの関係を記述（1対1,1対多,多対1,多対多など）
  User.associate = function(models){
  };
  return User;
}