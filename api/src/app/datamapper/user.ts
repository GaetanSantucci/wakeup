import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

class UserDataMapper extends CoreDataMapper {
  tableName = 'user';
  columns = `"id","email","lastname","firstname", address, phone, role, newsletter_optin`

  createFunctionName = 'create_user';
  updateFunctionName = 'update_user';
  deleteFunctionName = 'delete_user';
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

  // async deleteUser(user_id: string) {
  //   console.log('user_id:', user_id);
  //   if (this.client instanceof pg.Pool) {
  //     const preparedQuery = {
  //       text: `SELECT * FROM "${this.deleteFunctionName}" WHERE id = ($1);`,
  //       values: [user_id]
  //     };

  //     const result = await this.client.query(preparedQuery);
  //     console.log('result:', result);
  //     // if (!result.rows[0]) return null;
  //     return result;
  //   }
  // }
}

const User = new UserDataMapper(client);
export { User }