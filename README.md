How to develop
==============

There are two projects in one here:

1) Client - React/Typescript FE client
2) Server - Node/Express/Typescript REST server with MySql database

Clone the project and then run `npm install` in the client directory and then again in the server directory.


Client development
------------------
To start the Client development it's easy, just open a terminal and type `npm run start` to compile and watch typescript
If working on SCSS then open another terminal and type `npm run watch-css` to auto-compile css from scss

Server development
------------------

### MySql setup

1. Add the following environment variables to enable the Express server to connect to the mysql server:
```
CZAPP_DB_HOST=localhost;
CZAPP_DB_NAME=<czapp_db_name>;
CZAPP_DB_USER=<czapp_db_user>;
CZAPP_DB_PASS=<czapp_db_password>;
CZAPP_SERVER_PORT=3002
```

2. Create a new mysql database and grant privileges then populate it
> npm run loadnodata

### Run/debug

In Webstorm (Intelli-j), to enable step debugging in the IDE, create a new run/debug configuration, choose Node.js and
add the following fields:

Field | Value
--- | ---
Node interpreter | <point to the node binary version 7.6.0+>
Node parameters | --inspect --require ts-node/register
Working directory | path to /server
Javascript file | src/index.ts

Click the + below the "Before launch" panel and select the "Compile Typescript" option, then in the dialog enter
`/server/src/tsconfig.json` as the config file. This will ensure that typescript compilation happens before each time
the server is relaunched.

Use the `Run` or `Debug` buttons with this new Run/Debug configuration to launch the dev server.

### Other stuff

1. Start the Mysql server (Mac)
```
/usr/local/opt/mysql@5.5/bin/mysql.server start
```

2. execute scripts for loading and dumping the database (including stored procedures)

```
npm run loadnodata // no data
npm run load // with data
npm run dumpnodata // no data
npm run dump // with data
```