# Study Guide Generator Data

This project consists of the database and data creation necessary for the [study-guide-generator](https://github.com/alephnull7/study-guide-generator) project.
A proper execution of the scripts including in the project requires the credentials for a SQL database
and of an API instance corresponding to [study-guide-generator-api](https://github.com/alephnull7/study-guide-generator-api).

## Table of Contents

* Project Structure
* Dependencies
* Execution
* Contributing
* License

## Project Structure

```
study-guide-generator-data/
├── config/
│   ├── db.js
├── input_data/
│   ├── templateStarters
│   ├── data-insertion.sql
│   ├── data-creation.sql
│   └── users.json
├── scripts/
│   ├── createDatabase.js
│   ├── createEntities.js
│   ├── createTemplates.js
│   └── helpers.js
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── index.json
```

* `index.json`: Contains the `main` function that is executed with `npm start`
* `config/db.js`: Connection to the database, with configuration thereof by environment variables
* `input_data`: Contains SQL scripts and JSON for creating the needed data
* `scripts`: Contains scripts for transforming and submitting creation requests for the files in `input_data`

## Dependencies

* `dotenv`
* `pg`

## Execution

1. Clone the repository:
```bash
git clone https://github.com/alephnull7/study-guide-generator-data
```

2. Navigate to the root of the project:
```bash
cd study-guide-generator-data
```

3. Install dependencies:
```bash
npm install
```

4. Access database and API credentials necessary to properly create the needed connections.

6. Execute all the functions corresponding to entity creation.
```bash
npm start
```

## Contributing

The maintainer of this project is Greg Smith who can be contacted at <gregorymichaelsmith@protonmail.com>
if you have interest in contributing to this project.

## License

### MPL-2.0 license

An open-source software license that permits the use, modification, and distribution of covered software under certain conditions, including making modifications available under the MPL, while also incorporating a patent grant clause and compatibility with other open-source licenses.
