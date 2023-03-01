/** Import statements */
// const Joi = require("joi");
const DbService = require("../dbService");

class Dividends extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "dividends");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }

  async getIssuerDividends(issuerId) {
    return await super.getOne(issuerId, "issuerId");
  }
}

module.exports = Dividends;
