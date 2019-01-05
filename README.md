How to develop
==============

There are two projects in one here:

1) Client - React/Typescript FE client
2) Server - Node/Express/Typescript REST server


Client development
------------------
To start the Client development it's easy, just open a terminal and type `npm run start` to compile and watch typescript
If working on SCSS then open another terminal and type `npm run watch-css` to auto-compile css from scss

Server development
------------------
in Webstorm (Intelli-j) create a new run/debug configuration, choose Node.js and add the following fields:

Field | Value
--- | ---
Node interpreter | <point to the node binary version 7.6.0+>
Node parameters | --inspect --require ts-node/register
Working directory | path to /server
Javascript file | src/index.ts

Click the run or debug buttons to launch the server - debugging should work because of:
> --inspect --require ts-node/register

add the environment variables to enable connection to the mysql server:
```
CZAPP_DB_HOST=localhost;
CZAPP_DB_NAME=czapp;
CZAPP_DB_USER=czapp;
CZAPP_DB_PASS=czapp;
CZAPP_SERVER_PORT=3002
```

Warning - even though the IDE intellisense works, the compiler does not generate the build files in the dist folder
To do this you will need to open yet another terminal and type `tsc -p src` to rebuild the dist folder.
Note that you will have to re-run this command each time you change the files in order to debug.

Other stuff
-----------

START MYSQL SERVER
```
/usr/local/opt/mysql@5.5/bin/mysql.server start
```

DUMP DB
```
npm run dumpnodata // no data
npm run dump // with data
```