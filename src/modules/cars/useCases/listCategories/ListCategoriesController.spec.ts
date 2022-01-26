import { Connection } from 'typeorm';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { app } from '@shared/infra/http/app';

describe('List categories controller', () => {
  let connections: Connection;

  beforeAll(async () => {
    connections = await createConnection();

    await connections.runMigrations();
    const id = uuidV4();
    const password = await hash('admin', 8);
    await connections.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
        VALUES('${id}', 'admin', 'admin@admin.com', '${password}', 'XXXX-XXXX-XXXX' ,true, 'now()')`
    );
  });
  afterAll(async () => {
    await connections.dropDatabase();
    await connections.close();
  });

  it('should be able list all categories GET /categories', async () => {
    const responseSession = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    const { token } = responseSession.body;
    await request(app)
      .post(`/categories`)
      .send({
        name: 'Onix supertest',
        description: 'Description Onix Supertest',
      })
      .set({ Authorization: 'Bearer ' + token });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
  });
});
