require('dotenv').config();
const fs = require('fs');

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

function saveJSON(filePath, jsonData) {
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('JSON file has been saved!');
    });
}

module.exports = { fetchDataFromAPI, sendDataToAPI, saveJSON };
