/** Import statements */
const Joi = require("joi");

const DbService = require("../dbService");

/** Payroll form model */
class PayrollForm extends DbService {
  /** Set database and table name */
  constructor() {
    super(process.env.WEBSITE_DB, "payrollforms");
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
    company: Joi.string().allow(""),
    jobTitle: Joi.string().allow(""),
    noOfEmployees: Joi.string().allow(""),
    enquireAbout: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

exports.PayrollForm = PayrollForm;
exports.validate = validate;
