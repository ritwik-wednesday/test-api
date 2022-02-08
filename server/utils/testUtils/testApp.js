import express from 'express';
import dotenv from 'dotenv';

import { client } from '@database';

const connect = async () => {
  await client.authenticate();
};

connect();

// configure environment variables
dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });

const testApp = express();

testApp.use('/', (_, response) => {
  response
    .status(200)
    .json({ message: 'OK' })
    .send();
});

export { testApp };
