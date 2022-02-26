module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  migrations: [process.env.DB_MIGRATIONS],
  entities: [process.env.DB_ENTITIES],
  cli: {
    migrationsDir: process.env.DB_MIGRATIONSDIR,
  },
};
