require('dotenv').config();
const fs = require('fs');
const path = require("path");

const base_url = `${process.env.API_KEY}/api`;

async function fetchDataFromAPI(route) {
    try {
        const url = `${base_url}/${route}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to fetch input_data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching input_data:', error.message);
        return [];
    }
}

async function sendDataToAPI(route, method, data) {
    try {
        const url = `${base_url}/${route}`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Failed to send input_data');
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error sending input_data:', error.message);
        return null;
    }
}

function saveJSON(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    const directoryPath = path.dirname(filePath);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return;
        }
        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log(`${filePath} saved.`);
        });
    });
}

module.exports = { fetchDataFromAPI, sendDataToAPI, saveJSON };
