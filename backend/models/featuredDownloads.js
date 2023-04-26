/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const FeaturedDownload = sequelize.define("FeaturedDownload", {
  postId: {
    type: DataTypes.NUMBER,
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 500,
    },
  },
  downloadSrc: {
    type: DataTypes.STRING,
    validate: {
      max: 500,
    },
  },
});

module.exports = FeaturedDownload;
