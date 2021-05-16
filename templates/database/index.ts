import {join} from "path";
import {Sequelize} from "sequelize";

const dir = join (__dirname , "");

export const db = new Sequelize ({
    dialect :"sqlite" ,
    storage :`${dir}/db-store.sqlite` ,
    database :"ecommerceX" ,
});

async function connectToDatabase() {
    try {
        await db.authenticate ();
        await db.sync ();
        console.log (`## database successfully connected!!`);
    } catch (error) {
        throw new Error (JSON.stringify (error , null , 3));
    }
}

export {connectToDatabase};
