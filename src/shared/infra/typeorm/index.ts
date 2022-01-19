/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  process.env.NODE_ENV === 'development' ? (host = 'localhost') : host;
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
