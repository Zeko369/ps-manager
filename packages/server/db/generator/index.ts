import 'reflect-metadata';
import { createConnection } from 'typeorm';

import createUsers from './user.factory';
import createProducts from './products.factory';
import createSubscriptionTypes from './subscriptionTypes.factory';

(async () => {
  const connection = await createConnection();
  const [admin, user] = await createUsers();

  const products = await createProducts();
  const subscriptionTypes = await createSubscriptionTypes(products);

  await connection.close();
})();
