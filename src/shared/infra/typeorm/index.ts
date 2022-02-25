import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  switch (process.env.NODE_ENV) {
    case 'docker':
      host = 'database';
      break;
    case 'test':
      host;
      break;
    case 'production':
      host;
    default:
      break;
  }
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  );
};
