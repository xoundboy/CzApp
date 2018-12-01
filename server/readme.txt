START MYSQL SERVER
/usr/local/opt/mysql@5.5/bin/mysql.server start

DEV SERVER
$ nodemon server.js //auto-restart server after code change - but this isn't required for development if using debug configuration / breakpoints

DUMP DB
mysqldump -uczapp -p czapp > czapp.sql

DEBUG (Node debug mode in Jetbrains)
Don't forget to point to server.js and set environment variables in the debug configuration:
e.g.
CZAPP_DB_HOST=localhost;CZAPP_DB_NAME=czapp;CZAPP_DB_USER=czapp;CZAPP_DB_PASS=czapp;CZAPP_SERVER_PORT=3002
