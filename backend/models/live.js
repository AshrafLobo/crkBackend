/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/** Proxy model */
class Live extends DbService {
  /** Set database and table name */
  constructor(database) {
    super(database, "live_video_details");
    super.connect();
  }

  async getAll() {
    return await super.getAll();
  }
}

exports.Live = Live;
