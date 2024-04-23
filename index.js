const createEntities = require("./scripts/createEntities");

async function main() {
    await createEntities.createUsers();
}

main().then(() => console.log("Finished loading input_data!"));
