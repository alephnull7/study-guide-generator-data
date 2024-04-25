const { sendDataToAPI, saveJSON, jsonWithCWD, pathWithCWD, srcDestWithCWD, fetchDataFromAPI} = require("./helpers");

async function createEntitiesWithAPI(source, destination, route, method) {
    let bodies;
    if (typeof source === 'string') {
        bodies = require(source);
    } else {
        bodies = source;
    }

    const entities = [];
    for (const body of bodies) {
        const response = await sendDataToAPI(route, method, body);
        entities.push(response);
    }
    saveJSON(destination, entities);
}

async function createUsers() {
    const { source, destination } = srcDestWithCWD('input_data/users.json')
    await createEntitiesWithAPI(source, destination, 'auth/create', 'POST');
}

async function createClassrooms() {
    const users = jsonWithCWD('entities/users.json');
    const instructors = users.filter(user => user.account_type === 1);
    const students = users.filter(user => user.account_type === 0);
    const studentUIDs = students.reduce((acc, student) => {
        acc.push(student.uid);
        return acc;
    }, []);
    const bodies = instructors.map(({ uid }) => ({
        uid,
        course_id: 1,
        name: "Example Classroom",
        students: studentUIDs
    }))
    const destination = pathWithCWD('entities/classrooms.json');
    await createEntitiesWithAPI(bodies, destination,'classrooms', 'POST');
}

async function createEntities() {
    await createUsers();
    await createClassrooms();
}

module.exports = createEntities;
