export default {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: [
    'src/modules/cars/infra/typeorm/entities/*.ts',
    'src/modules/account/infra/typeorm/entities/*.ts',
    'src/modules/rentals/infra/typeorm/entities/*.ts',
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
