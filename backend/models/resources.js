/** Import statements */
const DbService = require("../dbService");

/** Downloads model */
class Resources extends DbService {
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

  async getLiveLink() {
    return await super.getOne("live_link", "type");
  }
}

module.exports = Resources;
