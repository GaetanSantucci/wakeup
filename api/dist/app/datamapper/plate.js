import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
import pg from 'pg';
// import debug from 'debug';
// const logger = debug('Datamapper');
class PlateDatamapper extends CoreDataMapper {
    tableName = 'product';
    columns = `"id", "name", "subtitle", "description", "price", "image", "slug", "is_new", "dimension", "category"`;
    createFunctionName = 'create_plate';
    updateFunctionName = 'update_plate';
    //& If need to create specific method for LocationDataMapper
    async findByPlateId(plateId) {
        if (this.client instanceof pg.Pool) {
            // todo change associated_sale to addon_sale when new DB
            const preparedQuery = {
                text: `SELECT plate.*, json_agg(addon_sales) AS addon_sales
               FROM plate
               LEFT JOIN plate_has_addon_sales ON plate.id = plate_has_addon_sales.plate_id
               LEFT JOIN addon_sales ON plate_has_addon_sales.addon_sales_id = addon_sales.id
               WHERE plate.id = $1
               GROUP BY plate.id`,
                values: [plateId]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
}
const Plate = new PlateDatamapper(client);
export { Plate };
