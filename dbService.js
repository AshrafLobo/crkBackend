/** Import statements */
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

/** Get environment variables */
const { USER, PASSWORD, DB_PORT, HOST } = process.env;

class DbService {
  get connection() {
    return this._connection;
  }

  /** Connect to mysql database */
  connect() {
    this._connection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: DB_PORT,
    });

    this._connection.connect((err) => {
      if (err) console.log(err.message);
      console.log(`DB Status: ` + this._connection.state);
    });
  }

  /** Close database connection */
  close() {
    if (this._connection)
      this._connection.end(() => console.log("Connection closed..."));
  }

  /** Get all records */
  async getAll(database, table) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${database}.${table}`;
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
  async getOne(queryMetric, database, table, queryField = "id") {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${database}.${table} WHERE ${queryField} = ?`;
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
  async createRecord(data, database, table) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    try {
      const response = await new Promise((resolve, reject) => {
        const query = `INSERT INTO ${database}.${table} (??) VALUES (??)`;
        this.connection.query(query, [keys, values], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return response;
    } catch (error) {
      console.log(err);
    }
  }
}

module.exports = DbService;
