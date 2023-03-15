/* eslint-disable @typescript-eslint/no-non-null-assertion */
// ~ Environment
import 'dotenv/config';

// ~ Debug

import debug from 'debug';
const logger = debug('Entrypoint');

// ~ Express
import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import { Request, Response } from 'express';
//~ Cors
app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});
//If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
// app.set('trust proxy', 1);

//~ Session
import session from 'express-session';
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SECRET_SESSION!,
  cookie: {
    secure: true,
    maxAge: 1 * 60 * 60 * 1000, //1 hours
    httpOnly: true,
    sameSite: 'none' //'lax', // or 'strict'
    //expires : new Date(Date.now() + 60 * 60 * 1000) //1 hour
  }
}));

import { router } from './app/router/index.js';
// import { _404 } from './app/service/errorHandling.js';

// ~ Launch router

app.use('/api/v1', router);
// app.use(_404)

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  logger(` \x1b[1;33m⚡⚡ http://localhost:${PORT} ⚡⚡ \x1b[0m`)
});