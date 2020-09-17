[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# README #
This README.md file documents whatever steps that are necessary to get Starter Client Project up and running both backend and client.

## Guidlines for Developers
### Working On the Project

#### Prerequisists:
* Nodejs: v8.11.3 (LTS) (Install Nodejs)
* Prefered Dev Machine: MAC (OSX)

#### Installing the project: Client (Frontend)

##### Install the node packages
* Go to the client side project repo:
`cd rain`

##### Create a environment file `.env` in the root of the project. Ignore the API PATH if you have no api for now.
```
# App Configs
BASE_PATH=/
API_PATH=http://localhost:8080/api/
API_CALLBACK_DELAY=100
SESSION_TIMEOUT=1

```

##### Create a `app.config.js` in root of the project with following contents
```
const Config = {};

Config.basepath = process.env.BASE_PATH || '/';
Config.apiPath = process.env.API_PATH || 'http://HOST:PORT/api/';
Config.apiDelay = process.env.API_CALLBACK_DELAY || 100;
Config.sessionTimeout = process.env.SESSION_TIMEOUT || 1;

module.exports = Config;

```

* Then run command to install project dependencies
`npm install` Or `yarn install`

##### Run the client side project (development):
* Run the following command to run the project
`npm start` Or `yarn start`

##### Testing client side project
`npm test` 

##### Updating Test Snapshots client side project
`npm test -- -u`
(To update the previous component snapshots)

##### Linting `ESLint` for lint and hint the code
`npm run lint` 

##### Fixing linting `ESLint` with linting and hinting the code
`npm run lint:fix` 

##### Run the client side project production build:
* Run the following command to build the production build of the project
`npm run build`


