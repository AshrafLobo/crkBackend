/** Import statements */
const DbService = require("../dbService");

/** Faq model */
class Faq extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "faq");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }
}

module.exports = Faq;
