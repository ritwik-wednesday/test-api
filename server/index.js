import express from 'express';
import dotenv from 'dotenv';
import rTracer from 'cls-rtracer';
import { isTestEnv, logger } from '@utils/index';
import cluster from 'cluster';
import os from 'os';
import 'source-map-support/register';

const totalCPUs = os.cpus().length;

let app;
export const init = () => {
  // configure environment variables
  dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });

  if (!app) {
    app = express();
  }

  app.use(express.json());
  app.use(rTracer.expressMiddleware());

  app.get('/', (req, res) => {
    const message = 'Service up and running!';
    logger().info(message);
    res.json(message);
  });
  /* istanbul ignore next */
  if (!isTestEnv()) {
    app.listen(9000);
  }
};

logger().info({ ENV: process.env.NODE_ENV });

if (!isTestEnv() && cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  init();
}

export { app };
