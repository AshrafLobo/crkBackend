const DbService = require("../dbService");

class Users extends DbService {
  #database = null;

  constructor(database) {
    this.#database = database;

    super();
    super.connect();
  }

  async getAll() {
    return await super.getAll(this.#database, "company");
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, "company");
  }
}

module.exports = Users;
