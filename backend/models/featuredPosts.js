/** Import statements */
const DbService = require("../dbService");

class FeaturedPosts extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "featuredposts");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }
}

module.exports = FeaturedPosts;
