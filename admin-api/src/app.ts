import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import {json} from 'body-parser';
import {errorHandler, NotFoundError} from '@kazuku-cms/common';

import routes from '#server/routes/routes';
import {Db} from 'mongodb';

const app = express();

function setupExpress(db: Db) {
  app.use(json());
  app.use(cookieParser());
  routes(app, db); // routes calls every controller to map its own routes

  app.all('*', async (req, res) => {
    throw new NotFoundError();
  });
  app.use(errorHandler);
}

export { app, setupExpress };
