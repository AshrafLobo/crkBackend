/** Import statements */
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

/** Get environment variables */
const { WEBSITE_DB, DB_USER, DB_PASSWORD, HOST } = process.env;

const sequelize = new Sequelize(WEBSITE_DB, DB_USER, DB_PASSWORD, {
  host: HOST,
  dialect: "mysql",
  logging: false,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to database.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequelize, connect };
