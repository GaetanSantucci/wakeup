import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

// import debug from 'debug';
// const logger = debug('Datamapper');

class BlogDatamapper extends CoreDataMapper {

  tableName = 'blog';
  columns = `"id", "title", "description", "image", "interaction", "slug"`

  createFunctionName = 'create_blog';
  updateFunctionName = 'update_blog';

  //& If need to create specific method for LocationDataMapper

}

const Blog = new BlogDatamapper(client);
export { Blog }
