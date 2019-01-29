Dev Env Setup Guide
==============

This repo contains three projects, all of which you need to set up in order to develop the full stack.

1) Database - MySQL
2) Server - Node/Express/Typescript
3) Client - React/Typescript web client


Database - MySQL
----------------

Install Mysql server on your local dev machine:
```
$ sudo brew install mysql
$ mysql.server start
```

For DEVELOPMENT, add the following environment variables to ~/.bash_profile:
```
# env vars for local development server (TODO - fix so mysql root user can be regular mysql user)
export MYSQL_USER=<mysql root password>
export CZAPP_DB_HOST=localhost
export CZAPP_DB_NAME=<czapp_db_name>
export CZAPP_DB_USER=<czapp_db_user>
export CZAPP_DB_PASS=<czapp_db_password>
export CZAPP_SERVER_PORT=3002
export REACT_APP_CZAPP_BACKEND_BASE_URL=http://localhost:3002
```

Reload Bash profile:
```
$ . ~/.bash_profile
```

For PRODUCTION, create a file called `ecosystem.config.js` in the home folder of the user on the production server used
by the gulp deploy task and add the following contents (for use with pm2 node manager)
```
module.exports = {
  apps : [{
		name: 'api.czapp',
		script: '<absolute path to app.js on server>',
		watch: true,
		env: {
			NODE_ENV: 'production',
			CZAPP_DB_HOST:'localhost',
			CZAPP_DB_NAME:'<czapp db name>',
			CZAPP_DB_PASS:'<czapp db pass>',
			CZAPP_DB_USER:'<czapp db user>'
		}
	}]
}
```

Create a new mysql database and grant privileges:
```
$ mysql -uroot -p
mysql> create database <czapp_db_name>;
mysql> grant all privileges on <czapp_db_name>.* to <czapp_db_user>@localhost identified by '<czapp_db_password>';
```

Install the database schema:
```
$ cd ./database
$ sh/db loadnodata
```


Server - Node/Express/Typescript
--------------------------------
The following instructions assume you are running node version 6.12.3

Install dependencies:
```
$ cd ./server
$ npm install
```

To run the DEVELOPMENT server and watch for changes in .ts files:
```
npm run dev
```

To step-debug .ts in Webstorm, create a new run/debug configuration, choose Node.js and
add the following fields:

Field | Value
--- | ---
Node interpreter | <point to the node binary version 6.12.3>
Node parameters | --inspect --require ts-node/register
Working directory | path to /server
Javascript file | app/app.ts

Ensure that any previous `npm run dev` process is killed, then use the `Run` or `Debug` buttons with this new Run/Debug
configuration to launch the dev server.


Client
------
install dependencies:
```
cd client
npm install
```

to compile and watch typescript
```npm run start```

If working on SCSS then to auto-compile css from scss, open another terminal:
```npm run watch-css```


Deploy to Production
--------------------

In the root of the czapp project..

- to see all gulp tasks
```
gulp --tasks
```

- to build FE client, BE Express server, export db schema, upload everything and restart the node service...
```
gulp upgradeProd
```