const { sendDataToAPI, saveJSON } = require("./helpers");
const path = require("path");

async function createEntitiesWithAPI(srcData, route, method) {
    const bodies = require(path.join(process.cwd(), srcData));
    const entities = [];
    for (const body of bodies) {
        const response = await sendDataToAPI(route, method, body);
        entities.push(response);
    }
    saveJSON(srcData.replace('input_data', 'entities'), entities);
}

async function createUsers() {
    await createEntitiesWithAPI('input_data/users.json', 'auth/create', 'POST');
}

async function createEntities() {
    await createUsers();
}

module.exports = createEntities;
