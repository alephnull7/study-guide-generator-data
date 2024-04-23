const { sendDataToAPI, saveJSON } = require("./helpers");

async function createEntitiesWithAPI(srcData, route, method) {
    const bodies = require(srcData);
    const entities = [];
    for (const body of bodies) {
        const response = await sendDataToAPI(route, method, body);
        entities.push(response);
    }
    saveJSON(srcData.replace('input_data', 'entities'), entities);
}

async function createUsers() {
    await createEntitiesWithAPI('../input_data/users.json', 'auth/create', 'POST');
}

module.exports = { createUsers };
