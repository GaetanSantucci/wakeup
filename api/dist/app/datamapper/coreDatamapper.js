import pg from 'pg';
class CoreDataMapper {
    constructor(client) {
        this.client = client;
    }
    //& Create
    async create(inputData) {
        console.log('this.createFunctionName: ', this.createFunctionName);
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT ${this.createFunctionName}($1);`,
                values: [inputData]
            };
            const result = await this.client.query(preparedQuery);
            console.log('result: ', result);
            return result.rowCount;
        }
    }
    //& FindAll
    async findAll() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `
                    SELECT ${this.columns}
                    FROM "${this.tableName}"
                    ORDER BY "id";`
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    //& FindOne
    async findOne(id) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `
                    SELECT ${this.columns} 
                    FROM "${this.tableName}"
                    WHERE "id" = $1;
                    `,
                values: [id]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
    //& Update
    async update(inputData) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.updateFunctionName}($1);`,
                values: [inputData]
            };
            const result = await this.client.query(preparedQuery);
            return result.rowCount;
        }
    }
    //& Delete
    async delete(id) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `DELETE FROM "${this.tableName}"
               WHERE "id" = $1;`,
                values: [id]
            };
            const result = await this.client.query(preparedQuery);
            return result.rowCount;
        }
    }
}
export { CoreDataMapper };
