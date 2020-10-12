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
# Application Configuration
APP_BASE_PATH=<App Base Path Here>
API_PATH=<API Url Here>

# AWS Amplify Configuration
REGION=<region here>
USER_POOL_ID=<pool if here>
CLIENT_ID=<client id here>

# Mapbox Access Token
MAPBOX_API_KEY=<Mapbox Access Token Here>

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
* Once the build is successful, the final deployable codes will be available in `/dist/` directory.
