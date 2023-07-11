import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

class UserDataMapper extends CoreDataMapper {
  tableName = 'customer';
  columns = `"id","email","lastname","firstname", address, phone, role, newsletter_optin`

  createFunctionName = 'create_customer';
  updateFunctionName = 'update_customer';
  // userIdentity = 'user_identity';

  //& Find user by email
  async findUserIdentity(email: string) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE email = ($1);`,
        values: [email]
      };

      const result = await this.client.query(preparedQuery);
      if (!result.rows[0]) return null;
      return result.rows[0];
    }
  }
}

const User = new UserDataMapper(client);
export { User }