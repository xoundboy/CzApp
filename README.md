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
Working directory | <path to root of server-ts>
Javascript file | src/index.ts

Click the run or debug buttons to launch the server - debugging should work because of:
> --inspect --require ts-node/register

Warning - even though the IDE intellisense works, the compiler does not generate the build files in the dist folder
To do this you will need to open yet another terminal and type `tsc -p src` to rebuild the dist folder.
Note that you will have to re-run this command each time you change the files in order to debug.