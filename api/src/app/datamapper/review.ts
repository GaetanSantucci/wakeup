import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

// import debug from 'debug';
// const logger = debug('Datamapper');

class ReviewDatamapper extends CoreDataMapper {

  tableName = 'review';
  columns = `"id", "description", "author", "date", "star"`

  // createFunctionName = 'create_blog';
  // updateFunctionName = 'update_blog';

  //& If need to create specific method for LocationDataMapper
  //& Find user by email
  async findRandomReviews() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM review ORDER BY RANDOM() LIMIT 3;`
      };

      const result = await this.client.query(preparedQuery);
      if (result.rowCount === 0) return null;
      return result.rows;
    }
  }

}

const Review = new ReviewDatamapper(client);
export { Review }