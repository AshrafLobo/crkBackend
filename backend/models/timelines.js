/** Import statements */
const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");

const Timeline = sequelize.define("timeline", {
  title: {
    type: DataTypes.STRING,
    validate: {
      max: 255,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  timelineDate: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Timeline;
