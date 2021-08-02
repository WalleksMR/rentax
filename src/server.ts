import express from 'express';

import { categoriesRouter } from './routes/categories.routes';

const port = 3333;
const app = express();

app.use(express.json());

app.use('/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server ir running`);
});
