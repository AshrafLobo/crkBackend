/** Import statements */
// const Joi = require("joi");
const DbService = require("../dbService");

class Timelines extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "timelines");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }
}

module.exports = Timelines;
