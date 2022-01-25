import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

describe('Create Category Controller', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'admin', 'admin@admin.com', '${password}', 'XXXX-XXXX-XXXX' ,true, 'now()')
  `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able create a new category', async () => {
    const responseSession = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    const { token } = responseSession.body;

    const resposne = await request(app)
      .post(`/categories`)
      .send({
        name: 'Onix supertest',
        description: 'Description Onix Supertest',
      })
      .set({ Authorization: 'Bearer ' + token });
    expect(resposne.status).toBe(201);
  });
});
