/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/**Contact us form model */
class ContactUsForm extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "contactusforms");
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
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.ContactUsForm = ContactUsForm;
exports.validate = validate;
