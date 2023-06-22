/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import debug from 'debug';
const logger = debug('Entrypoint');
import { ErrorApi } from './app/services/errorHandler.js';
// import paypal from 'paypal-rest-sdk';
// paypal.configure({
//   mode: 'sandbox', // Use 'live' for production
//   client_id: process.env.PAYPAL_CLIENT_ID!,
//   client_secret: process.env.PAYPAL_SECRET_KEY!,
// });
const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// import { Request, Response } from 'express';
// app.use((req: Request, res: Response, next) => {
//   res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000', 'https://wakeupbox.fr', 'https://wakeupclf.fr']);
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//   next();
// });
const corsOptions = {
    withCredentials: true,
    origin: ["https://www.wakeupbox.fr", "https://www.wakeupclf.fr", "http://localhost:3000", "http://153.92.223.190"],
    method: ["GET", "POST", "PATCH", "DELETE"],
    responseHeader: ["Content-Type", "Origin", "X-Requested-With", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
//If you have your node.js behind a proxy and are using secure: true, you need to set 'trust proxy' in express
app.set('trust proxy', 1);
//~ Session
import session from 'express-session';
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SECRET_SESSION,
    cookie: {
        secure: true,
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none' //'lax', // or 'strict'
    }
}));
import { router } from './app/router/index.js';
// import { _404 } from './app/service/errorHandling.js';
// ~ Launch router
app.use('/api/v1', router);
app.use((req, res) => {
    throw new ErrorApi(`Page not found !`, req, res, 404);
});
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    logger(` \x1b[1;33m⚡⚡ http://localhost:${PORT} ⚡⚡ \x1b[0m`);
});
