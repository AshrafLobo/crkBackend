/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

/** Downloads model */
class Downloads extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "downloads");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }
}

module.exports = Downloads;
