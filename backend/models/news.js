/** Import statements */
// const Joi = require("joi");
const DbService = require("../dbService");

class News extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "news");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }

  async getIssuerNews(issuerId) {
    return await super.getOne(issuerId, "issuerId");
  }
}

module.exports = News;
