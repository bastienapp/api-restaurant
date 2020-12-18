const connection = require('../database');

class CrudDao {
  static table;

  static findAll(success, failure) {
    connection.query(`SELECT * FROM ${this.table}`, (error, result) => {
      if (error) {
        failure(error);
      } else {
        success(result);
      }
    });
  }

  static findOne(id, success, failure) {
    connection.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id],
      (error, result) => {
        if (error) {
          failure(error);
        } else {
          success(result);
        }
      }
    );
  }

  static create(object, success, failure) {
    const keys = Object.keys(object);
    connection.query(
      `INSERT INTO restaurant(${keys}) VALUES (?, ?)`,
      [...Object.values(object)],
      (error, result) => {
        if (error) {
          failure(error);
        } else {
          success(result.insertId);
        }
      }
    );
  }

  static update(id, object, success, failure) {
    const keys = Object.keys(object);
    const set = keys
      .map((key) => {
        return `${key} = ?`;
      })
      .join(', ');
    connection.query(
      `UPDATE restaurant SET ${set} WHERE id = ?`,
      [...Object.values(object), id],
      (error, result) => {
        if (error) {
          failure(error);
        } else {
          success(result.affectedRows);
        }
      }
    );
  }

  static delete(id, success, failure) {
    connection.query(
      `DELETE FROM restaurant WHERE id = ?`,
      [id],
      (error, result) => {
        if (error) {
          failure(error);
        } else {
          success(result.affectedRows);
        }
      }
    );
  }
}

module.exports = CrudDao;
