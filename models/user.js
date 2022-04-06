const DbService = require("../dbService");

class User extends DbService {
  #database = null;
  #table = null;

  constructor(database, table) {
    super();
    super.connect();

    this.#database = database;
    this.#table = table;
  }

  async getAll() {
    return await super.getAll(this.#database, this.#table);
  }

  async getOne(id) {
    return await super.getOne(id, this.#database, this.#table);
  }
}

module.exports = User;
