/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/**Share registration form model */
class ShareRegistrationForm extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "shareregistrationforms");
    super.connect();
  }

  async getOne(id) {
    return await super.getOne(id);
  }

  async getAll() {
    return await super.getAll();
  }

  async createRecord(data) {
    return await super.createRecord(data);
  }
}

function validate(data) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.string().required(),
    address: Joi.string().allow(""),
    idNumber: Joi.string().allow(""),
    company: Joi.string().required(),
    cdscNumber: Joi.string().allow(""),
    service: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.ShareRegistrationForm = ShareRegistrationForm;
exports.validate = validate;
