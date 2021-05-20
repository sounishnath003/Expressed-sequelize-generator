import { join } from "path";
import { Sequelize } from "sequelize";

class Database {
    private dir = join(__dirname, "");
    public schema: Sequelize;
    constructor() {
        this.schema = new Sequelize({
            dialect: "sqlite",
            storage: `${this.dir}/db-store.sqlite`,
            database: "projectDB",
        });
    }

    /**
     * authenticate
     */
    public async authenticate() {
        try {
            await this.schema.authenticate();
            console.log("### Database Synced!!");
            console.log("Connection has been established successfully.");
            /*
                ** Add this line by replacing 25;
                * if Your Database is not syncing with SchemaChanges.
                await this.schema.sync({force: true});
             */
            await this.schema.sync();
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
}

export const db = new Database();
