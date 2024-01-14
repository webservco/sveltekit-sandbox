import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '$env/static/private';
import mysql from 'mysql2/promise';
import type { DatabaseError } from '../../../app';

// Create the connection pool. The pool-specific settings are the defaults
export const databaseConnectionPool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export function getDatabaseError(object: unknown): DatabaseError {
  const result: DatabaseError = {
    code: null,
    errno: null,
    fatal: null,
    message: 'Database error',
    sql: null,
    sqlMessage: null,
    sqlState: null,
  };

  if (typeof object !== 'object') {
    return result;
  }
  if (object === null) {
    return result;
  }

  if ('code' in object && typeof object.code === 'string') {
    result.code = object.code;
  }

  if ('errno' in object && typeof object.errno === 'string') {
    result.errno = object.errno;
  }

  if ('fatal' in object && typeof object.fatal === 'boolean') {
    result.fatal = object.fatal;
  }

  if ('sql' in object && typeof object.sql === 'string') {
    result.sql = object.sql;
  }
  if ('sqlMessage' in object && typeof object.sqlMessage === 'string') {
    result.sqlMessage = object.sqlMessage;
  }

  if ('sqlState' in object && typeof object.sqlState === 'string') {
    result.sqlState = object.sqlState;
  }

  return result;
}
