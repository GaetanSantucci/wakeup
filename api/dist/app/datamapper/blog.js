import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class BlogDatamapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'blog';
        this.columns = `"id", "title", "description", "image", "interaction", "slug"`;
        this.createFunctionName = 'create_blog';
        this.updateFunctionName = 'update_blog';
        //& If need to create specific method for LocationDataMapper
    }
}
const Blog = new BlogDatamapper(client);
export { Blog };
