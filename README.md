# API SERVER
NodeJS API Server is located in directory 'server'.

# Server Prerequisite
1. Rename ".env.example" to ".env" and replace mongoDB configs and Github token.
2. Generate github "Personal access token" from any github account and replace the same in .env file, against key "GIT_TOKEN". Github doc link to generate personal access token: 
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
3. If server port is updated in .env file, than please update the same in frontend environment config.
4. Make sure mongoDB is installed and running in your system, before starting server.

# How to run API server
1. cd server
2. npm install
3. npm run start

# -------------------------------------------------------

# ANGULAR FRONTEND
Angular frontend is located in directory 'frontend'.

# Frontend Prerequisite
1. Start API server first,than run angular project.
2. If server port is updated in api, please update the same in environment config file.

# How to run angular project
1. cd frontend
2. npm install
3. ng serve
4. open project url in browser

