import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { app } from '@shared/infra/http/app';

describe('Send Forgot Password Controller', () => {
  let connection: Connection;
  jest.useRealTimers();
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('1234', 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'DDX-DDXS', true, 'NOW()')
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able send e-mail', async () => {
    jest.setTimeout(10 * 1000);
    const responseMail = await request(app).post('/password/forgot').send({
      email: 'admin@rentx.com.br',
    });
    expect(responseMail.statusCode).toBe(200);
  }, 10000);
});
