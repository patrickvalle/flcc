# flcc

## Running the app locally

### Prerequisites
 - Download and install [Node.js](https://nodejs.org/download/)
 - Download and install [MongoDB](https://www.mongodb.org/downloads)

### Instructions
1. Set an **FLCC_SERVER_PORT** environment variable to the port you'd like to run your node server at (i.e. 3000)
3. Start your MongoDB instance from within the **%MONGO_HOME%/bin** directory with the command ```mongod```
4. Run ```npm install``` from within your **%FLCC_HOME%** directory to install all required Node modules and Bower dependencies
5. Start the app with the command ```node server```
6. Access the app in your browser @ **http://localhost:%FLCC_SERVER_PORT%**
