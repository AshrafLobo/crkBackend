/** Import statements */
// const Joi = require("joi");
const DbService = require("../dbService");

class Agms extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "agms");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }

  async getIssuerAgms(issuerId) {
    return await super.getOne(issuerId, "issuerId");
  }
}

module.exports = Agms;
