import { buildAssociationsBetweenSchemas } from "../database/schema";
import { kickStartTheServer } from "../server";

function main() {
    buildAssociationsBetweenSchemas();
    kickStartTheServer();
}

main();
