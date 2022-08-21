/** Import statements */
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

/** Get environment variables */
const { DB_USER, DB_PASSWORD, DB_PORT, HOST } = process.env;

class DbService {
  #database;
  #table;

  constructor(database, table) {
    this.#database = database;
    this.#table = table;
  }

  get connection() {
    return this._connection;
  }

  /** Connect to mysql database */
  connect() {
    this._connection = mysql.createConnection({
      host: HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: this.#database,
      port: DB_PORT,
    });

    this._connection.connect((err) => {
      if (err) console.log(err.message);
      console.log(`DB ${this.#database} status: ` + this._connection.state);
    });
  }

  /** Close database connection */
  close() {
    if (this._connection)
      this._connection.end(() => {
        console.log(`Connection to ${this.#database} closed...`);
      });
  }

  /** Get all records */
  async getAll() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${this.#table}`;
        this.connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  /** Get one record */
  async getOne(queryMetric, queryField = "id") {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${this.#table} WHERE ${queryField} = ?`;
        this.connection.query(query, [queryMetric], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  /** Create a new record */
  async createRecord(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO ${this.#table} (??) VALUES (?)`;
        this.connection.query(query, [keys, values], (err, result) => {
          /** Query error */
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return response;
    } catch (err) {
      /** Error if query is ok */
      console.log(err);
    }
  }

  /** Update a record */
  async updateRecord(data, queryMetric, queryField = "id") {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `UPDATE ${this.#table} SET ? WHERE ${queryField} = ?`;
        this.connection.query(query, [data, queryMetric], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.message);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DbService;
