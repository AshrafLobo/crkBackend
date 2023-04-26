/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const News = sequelize.define("News", {
  issuerId: {
    type: DataTypes.NUMBER,
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  article: {
    type: DataTypes.TEXT,
  },
  originalSrc: {
    type: DataTypes.STRING,
    validate: {
      max: 500,
    },
  },
  originalPostDate: {
    type: DataTypes.DATE,
  },
});

module.exports = News;
