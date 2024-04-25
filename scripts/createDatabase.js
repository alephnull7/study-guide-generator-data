const { readFileSync } = require("fs");
const pool = ("../config/db");

async function executeSQLScript(srcData) {
    const sqlScript = readFileSync(srcData).toString();
    await pool.query(sqlScript);
}

async function initDatabase() {
    await executeSQLScript('../input_data/database-creation.sql');
}

async function createFixedEntities() {
    await executeSQLScript('../input_data/data-insertion.sql');
}

async function createDatabase() {
    await initDatabase();
    await createFixedEntities();
}

module.exports = createDatabase;
