# Quickstart
```
npm install
npm run dev
```
## Detailed 
## Project setup
```
npm install express
npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/cli @babel/plugin-transform-runtime
npm install @babel/runtime
```
## Project run
```
npx babel-node src/server.js
```

## Nodemon
```
npm install --save-dev nodemon
```
## Run server w/ nodemon
```
npx nodemon --exec npx babel-node src/server.js
``` 

## Add nodemon shortcut (package.json "scripts" object)
```
"dev": "npx nodemon --exec npx babel-node src/server.js"
```

## For mongodb
```
npm install mongodb
npm install mongoose
```

## dotenv package to include .env.local in process
```
npm install dotenv
```