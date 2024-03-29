import pg from 'pg'
import { client } from '../services/dbClient.js'
import { CoreDataMapper } from './coreDatamapper.js'
import { UUID } from '../type/user.js'

class UserDataMapper extends CoreDataMapper {
  tableName = 'user'
  columns = `"id","email","lastname","firstname", address, phone, role, newsletter_optin`

  createFunctionName = 'create_user'
  updateFunctionName = 'update_user'
  deleteFunctionName = 'delete_user'

  view = {
    getAllUsersView: 'getAllUsers',
  }

  //& Find user by email
  async findUserIdentity(email: string) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE email = ($1);`,
        values: [email],
      }

      const result = await this.client.query(preparedQuery)
      if (!result.rows[0]) return null
      return result.rows[0]
    }
  }

  //& Create reset token for password forgotten
  async createResetToken(token: string, expirationTime: Date, email: string) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `UPDATE "${this.tableName}"
                SET token = $1, expiration_time = $2
                WHERE email = $3;`,
        values: [token, expirationTime, email],
      }

      const result = await this.client.query(preparedQuery)
      if (!result.rowCount) return null
      return result.rowCount
    }
  }
  //& Find token for reset password
  async findResetToken(token: string | undefined) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}"
                WHERE token = $1;`,
        values: [token],
      }

      const result = await this.client.query(preparedQuery)
      if (!result.rows[0]) return null
      return result.rows[0]
    }
  }

  async getAllUsers() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM ${this.view.getAllUsersView}`,
      }

      const result = await this.client.query(preparedQuery)
      if (!result.rows) return null
      return result.rows
    }
  }

  async updateNewsletterOptin(email: string) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `UPDATE public.${this.tableName}
        SET newsletter_optin = false
        WHERE email = $1`,
        values: [email],
      }
      const result = await this.client.query(preparedQuery)
      if (!result.rows[0]) return null
      return result.rows[0]
    }
  }

  async deleteUser(userId: number | UUID) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT ${this.deleteFunctionName}($1)`,
        values: [userId],
      }

      const result = await this.client.query(preparedQuery)
      consolelog('result:', result.rows)
      return result.rowCount
    }
  }
}

const User = new UserDataMapper(client)
export { User }
