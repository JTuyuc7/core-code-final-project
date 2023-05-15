# Front end Core Code UpSkill

This is the front end project, here will be described step by step how the frontend will be build, using technologies like, <strong>Styled components MUI, yup, axios... </strong> will be used to build the project

* The front end part of the application <strong>Budget app</strong> is structured with the following files

    * <strong>Public</strong>
    * <strong>Src</strong>
        The Src folder contains the following subfolders and files.

        * <strong>Store</strong>
        Folder where the redux toolkit configuration is set, and the reducres are combined to have all data centrelized.

        * <strong>Components</strong>
        This is the folder where logic about pages, UI, assest and constants are placed.

        * <strong>Cofig</strong>
        Folder where the axios config to have the base URL of the API is stored.

        * <strong>features</strong>
        Folder where all the slices of redux are stored.

        * <strong>Utils</strong>
        Folder where the logit of protecting routes based on the autheticity of the user.

        ##### Each folder where we have a page screen has it's own file style

    * On the root of the project
        * <strong>App.js</strong>
        File where the stack routes are placed
        * <strong>Idex.js</strong>
        Roote of the project

#### Dependencies used on the project

```javascript
    "@emotion/react",
    "@emotion/styled",
    "@mui/material",
    "@reduxjs/toolkit":,
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "axios",
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "react-scripts",
    "react-spinners",
    "react-toastify",
    "styled-components",
    "web-vitals"
```

#### Want to run the project?
    * Navigate to the root of the project
    * Create a file .env at the root level of the project and plae
        - REACT_APP_BACKEND_URL = // Your URL backend
    * Run npm install
    * Run npm start

    - This will serve the app on http://localhost:3000/
    
### Want to run the docker container on dev mode?
```shell
    docker run \
    -e REACT_APP_BACKEND_URL=<Your Front end URL> \
    -e REACT_APP_API_CURRENCY=<Your Key of ExchangeRate-API > \
    -v <path of your code>:/code \
    -w /code \
    -p 3000:3000 --rm -it \
    node:16-buster "/bin/bash"
```

### Want to build the container 
```shell
    docker build -t frontend:0.0.1-alpine . 

    // Where the Docker file is located
```

### Want to run the container
```shell
    docker run -d -p 3000:80 frontend:0.0.1-alpine
```
    
* Project progress
  - Create new account
  
### Video
https://user-images.githubusercontent.com/50525507/194188912-d64afa20-6582-4114-b966-7f84ade476de.mp4


### Want to build the docker image
On the root of the project insert on the docker file the env variables
REACT_APP_BACKEND_URL=<your variable of localhost> \
REACT_APP_API_CURRENCY=<your currenci app key> 
  

##
update some dependencies