# Backend for Core Code UpSkill Budget

Here will be described step by step how the server using <strong>Node js, express, express validator, jtw, bcript, pg, dotenv cors</strong>

# Backend for Core Code UpSkill Budget

Here will be described step by step how the server using <strong>Node js, express, express validator, jtw, bcript, pg, dotenv cors</strong>

* The backend project is structured:

- <strong>Src</strong>
  Here you will find all the folders with the following structure
    - <strong>Controllers</strong>
      Here you will find all the files that handler validation from the req, response object and interaction with the DB

    - <strong>database</strong>
      Here you will find the function that returns the connection with the DB
    - <strong>helpers</strong>
      Here you will find the following files
        - generateAccountNumber
        - generateToken
        - mainConfirmation
      these are the files that generates the user account number, the token that is stored on the DB to verify the user authenticity, and the mail               confirmation which will sent an email to the user.
    - <strong>middlewares</strong>
      Folder that handle the user verification any time it makes a request to a protected api

    - <strong>model</strong>
    
    - <strong>routes</strong>
    Folder that handles all the privates and protected routes for the different endpoints of the app.
        * auth
        * budgetRouter
        * confirmAccountRoutes
        * createAccountRoutes
        * incomeExpenseRoute
        * loginRoute
        * transfersDepositsRote

    - <strong>settings</strong>
    File that handle all the enviroments variables


### Want to run the backend server?

Create a file .env at the root level of the project, and replace with the following data.

```javascript
PORT = //Port number example 4000
FRONT_END_URL = // The url in which your frontend app is running
HOST = // host name of postgres, example localhost
USER_DB = // User of your postgres DB
DB_PORT = // Port where your DB is exposed
PASSWORD = // Your postgress password
DATABASE = // Name of your DB
SECRET_KEY_JWT = // Any secret key, this will be used to generated and sigh you JW
EMAIL_API_KEY = // your @sendgrid/mail email api key
```

once you have configurade this, at the root level of the project run <strong>npm install</strong> to install all the dependencies of the project, then run <strong>npm run dev</strong> to start the server on development mode.

* Dependencies used.

- Project dependencies
```javascript
    "@sendgrid/mail",
    "bcryptjs"",
    "body-parser",
    "cors",
    "dotenv",
    "express",
    "express-validator",
    "jsonwebtoken",
    "pg"
```
- Development dependencies
```javascript
    "@babel/cli",
    "@babel/core"
    "@babel/node",
    "@babel/preset-env",
    "nodemon"
```

### Want to run the Container on dev mode?
```shell
  docker run \
  -e PORT=<Your port> \
  -e FRONT_END_URL=<Your Frontend URL example: http://localhost:3000 > \
  -e HOST=<Your host of postgres> \
  -e USER_DB=<postgres user || postgres> \
  -e DB_PORT=<postgres port || 5432> \
  -e PASSWORD=<postgress password> \
  -e DATABASE=<postgres database> \
  -e SECRET_KEY_JWT=<Your JWT secret string>\
  -e EMAIL_API_KEY=<Your secret key of @sendgrid/mail>\
  -v <path where the files are located (root project)>:/code \
  -w /code \
  -p 4000:4000 --rm -it \
  node:18-buster "/bin/bash"
```

### Want to build the image?
```shell
  docker build -t backend:0.0.1 .

  // Where the docker file is located
```

### want to run the app?
```shell
  docker run -d -p 4000:4000 backend:0.0.1 
```