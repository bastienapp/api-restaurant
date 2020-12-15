const mysql = require('mysql');
require('dotenv').config();

let connection;

function getConnection() {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
  if (connection && connection.state === 'disconnected') {
    connection.connect(function (err) {
      if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
      }

      console.log(`connected as id ${connection.threadId}`);
    });
  }

  return connection;
}

module.exports = getConnection();
