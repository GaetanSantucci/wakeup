// ~ PG CONNEXION DATABASE ~ //
import pg from 'pg';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Pool');
const client = new pg.Pool(
//   {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// }
);
client.connect()
    .then(() => logger('DB connection is live.'))
    .catch((err) => logger('DB connection failed.', err));
export { client };
