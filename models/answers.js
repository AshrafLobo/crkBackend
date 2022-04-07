/** Import statements */
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const DbService = require("../dbService");

/** Downloads model */
class Answers extends DbService {
  #database = null;
  #table = null;

  /** Set database and table name */
  constructor(database) {
    super();
    super.connect();

    this.#database = database;
    this.#table = "downloads";
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, this.#table);
  }

  async getAll() {
    return await super.getAll(this.#database, this.#table);
  }
}

module.exports = Answers;
