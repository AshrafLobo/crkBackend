/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const FeaturedPost = sequelize.define("FeaturedPost", {
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  featuredPostSrc: {
    type: DataTypes.STRING,
    validate: {
      max: 500,
    },
  },
});

module.exports = FeaturedPost;
