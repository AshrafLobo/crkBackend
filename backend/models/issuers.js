/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Issuer = sequelize.define("issuer", {
  name: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  src: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  srcSmall: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
});

module.exports = Issuer;
