/** Import statements */
// const Joi = require("joi");
const DbService = require("../dbService");

class Egms extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "egms");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }

  async getIssuerEgms(issuerId) {
    return await super.getOne(issuerId, "issuerId");
  }
}

module.exports = Egms;
