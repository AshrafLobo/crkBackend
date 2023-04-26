/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Dividend = sequelize.define("Dividend", {
  issuerId: {
    type: DataTypes.NUMBER,
  },
  bookClosureDate: {
    type: DataTypes.DATEONLY,
  },
  disbursmentDate: {
    type: DataTypes.DATEONLY,
  },
  dividendType: {
    type: DataTypes.STRING,
    validate: {
      max: 50,
    },
  },
  dividendRate: {
    type: DataTypes.STRING,
    validate: {
      max: 50,
    },
  },
  status: {
    type: DataTypes.STRING,
    validate: {
      max: 50,
    },
  },
});

module.exports = Dividend;
