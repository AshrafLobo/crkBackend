/** Import statements */
const DbService = require("../dbService");

class FeaturedDownloads extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "featureddownloads");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }
  
  async getPostsResources(postId) {
    return await super.getOne(postId, "postId");
  }
}

module.exports = FeaturedDownloads;
