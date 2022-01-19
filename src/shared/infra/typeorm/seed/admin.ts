import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    VALUES('${id}', 'admin', 'admin@admin.com', '${password}', 'XXXX-XXXX-XXXX' ,true, 'now()')
  `);

  await connection.close();
}

create().then(() => {
  console.log('User admin was created with success!');
});
