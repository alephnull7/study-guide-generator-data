const createEntities = require("./scripts/createEntities");

async function main() {
    await createEntities();
}

main().then(() => console.log("Finished loading input_data!"));
