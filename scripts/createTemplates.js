const path = require('path');
const { sendDataToAPI, saveJSON, retrieveFiles, pathWithCWD} = require("./helpers");

function createTemplate(templateStarter) {
    const firstMessages = templateStarter.firstMessages;
    const course = templateStarter.course;
    const lastMessages = templateStarter.lastMessages;

    for (let artifact of templateStarter.artifacts) {
        let messages = firstMessages;
        messages = messages.concat(artifact.messages);
        messages = messages.concat(lastMessages);

        const name = artifact.name;
        const type = artifact.type;
        const data = {
            messages,
            type,
            course,
            name
        };

        const file = path.join('input_data', 'templates', String(course), String(type), `${name.replaceAll(' ', '_')}.json`);
        saveJSON(file, data);
    }
}

function createTemplateFiles() {
    const templateStartersDir = pathWithCWD('input_data/templateStarters');
    const templateStarters = retrieveFiles(templateStartersDir);

    for (const templateStarter of templateStarters) {
        const data = require(templateStarter);
        createTemplate(data);
    }
}

async function postTemplates() {
    const templatesDir = pathWithCWD('input_data/templates');
    const templates = retrieveFiles(templatesDir);

    for (const template of templates) {
        const data = require(template);
        await sendDataToAPI('artifacts/templates', 'POST', data);
    }
}

async function createTemplates() {
    createTemplateFiles();
    await postTemplates();
}

module.exports = createTemplates;
