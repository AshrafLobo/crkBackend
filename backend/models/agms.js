/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Agm = sequelize.define("agm", {
  issuerId: {
    type: DataTypes.NUMBER,
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 500,
    },
  },
  agmDate: {
    type: DataTypes.DATE,
  },
  venue: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      max: 50,
    },
  },
});

module.exports = Agm;
