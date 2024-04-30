require('dotenv').config();
const fs = require('fs');
const path = require("path");

const base_url = `${process.env.API_KEY}/api`;

async function getCredentials () {
    const url = `${base_url}/auth/login`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
    });
    const data = await response.json();
    return data.token;
}

async function fetchDataFromAPI(route) {
    try {
        const url = `${base_url}/${route}`;
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
        const token = await getCredentials();
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

function retrieveFiles(directoryPath) {
    try {
        let fileList = [];
        const files = fs.readdirSync(directoryPath);

        // Iterate through the files in the directory
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isFile()) {
                fileList.push(filePath);
            } else if (fileStat.isDirectory()) {
                const subDirectoryFiles = retrieveFiles(filePath);
                // Concatenate the files found in the subdirectory to fileList
                fileList = fileList.concat(subDirectoryFiles);
            }
        });

        return fileList;
    } catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
}

function srcDestWithCWD(relativePath) {
    const source = pathWithCWD(relativePath);
    const destination = source.replace('input_data', 'entities');
    return { source, destination };
}

function pathWithCWD(relativePath) {
    return path.join(process.cwd(), relativePath);
}

function jsonWithCWD(relativePath) {
    return require(pathWithCWD(relativePath));
}

module.exports = { fetchDataFromAPI, sendDataToAPI, saveJSON, jsonWithCWD, pathWithCWD, srcDestWithCWD, retrieveFiles };
