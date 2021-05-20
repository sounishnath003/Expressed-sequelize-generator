import { db } from "../database";
import { buildAssociationsBetweenSchemas } from "../database/schema";
import { kickStartTheServer } from "../server";

function main() {
    db.authenticate();
    buildAssociationsBetweenSchemas();
    kickStartTheServer();
}

main();
