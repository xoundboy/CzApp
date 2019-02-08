'use strict';

const fs = require('fs');
const gulp = require('gulp');
const exec = require('child_process').exec;
const GulpSSH = require('gulp-ssh');
const os = require('os');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const del = require('del');

const config = {
	host: process.env.CZAPP_PROD_HOST,
	port: 22,
	username: process.env.CZAPP_PROD_USER,
	privateKey: fs.readFileSync(os.homedir() + "/.ssh/id_rsa")
};

const gulpSSH = new GulpSSH({
	ignoreErrors: false,
	sshConfig: config
});


/*
 Client related tasks
  */

gulp.task('buildProdClient', function(cb) {
	exec('cd ./client && REACT_APP_CZAPP_BACKEND_BASE_URL=https://czapp.xoundesign.com/api npm run build',
		function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	})
});

gulp.task('cleanRemoteWww', function() {
	return gulpSSH
		.shell([`rm -rf ${process.env.CZAPP_PROD_PATH_TO_DOCUMENT_ROOT}/*`], {filePath: 'cleanRemoteWww.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('deployWww', function() {
	return gulp
		.src('client/build/**/*')
		.pipe(gulpSSH.dest(process.env.CZAPP_PROD_PATH_TO_DOCUMENT_ROOT), {filePath: 'deployWww.log'});
});

gulp.task('deployProdClient', gulp.series(
	'buildProdClient',
	'cleanRemoteWww',
	'deployWww'));


/*
 Server related tasks
  */

gulp.task('cleanBuildDir', function () {
	return del([
		'server/build/**/*'
	]);
});

gulp.task('compileTs', function() {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest("server/build"));
});

gulp.task('cleanRemoteApi', function() {
	return gulpSSH
		.shell([`rm -rf ${process.env.CZAPP_PROD_PATH_TO_API_ROOT}/*`], {filePath: 'cleanRemoteApi.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('dumpNoData', function(cb) {
	return exec('./database/sh/db.sh dumpnodata', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('deployApi', function() {
	return gulp
		.src([
			'server/build/**/*',
			'server/package.json'
		])
		.pipe(gulpSSH.dest(process.env.CZAPP_PROD_PATH_TO_API_ROOT), {filePath: 'deployApi.log'});
});

gulp.task('installDeps', function() {
	return gulpSSH
		.shell([`cd ${process.env.CZAPP_PROD_PATH_TO_API_ROOT} && npm install --only=prod`],
			{filePath: 'installDeps.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('restartNodeServer', function(){
	return 	gulpSSH
		.shell(['pm2 startOrReload ecosystem.config.js'],
		{filePath: 'installDeps.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('buildAndDeployProd', gulp.series([
	'cleanBuildDir',
	'compileTs',
	'cleanRemoteApi',
	'deployApi',
	'installDeps',
	'restartNodeServer'
]));



/*
Database related tasks
 */
gulp.task('dumpNoData', function(cb) {
	return exec('./database/sh/db.sh dumpnodata', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('backupProdDatabase', function(){
	return gulpSSH
		.shell([
			`mysqldump -u${process.env.CZAPP_PROD_DB_USER} -p${process.env.CZAPP_PROD_DB_PASS} ${process.env.CZAPP_DB_NAME} --host=${process.env.CZAPP_PROD_DB_HOST} --routines > ${process.env.CZAPP_PROD_PATH_TO_API_ROOT}/../dbBackup/czapp.sql.bak`],
			{filePath: 'backupOldDatabase.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('loadProdNewSchema', function(){
	return gulpSSH
		.shell([
			`mysql -u${process.env.CZAPP_PROD_DB_USER} -p${process.env.CZAPP_PROD_DB_PASS} --host=${process.env.CZAPP_PROD_DB_HOST} ${process.env.CZAPP_DB_NAME} < ${process.env.CZAPP_PROD_PATH_TO_API_ROOT}/czapp_no_data.sql`],
			{filePath: 'loadNewSchema.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('replaceDatabase', gulp.series([
	'backupProdDatabase',
	'loadProdNewSchema'
]));


// Migrate db
gulp.task('uploadMigrationsFileToProd', function(){
	return gulp
		.src(['database/migrations.sql'])
		.pipe(gulpSSH.dest(process.env.CZAPP_PROD_PATH_TO_API_ROOT), {filePath: 'uploadMigrationsFileToProd.log'});
});

gulp.task('applyMigrations', function(){
	return gulpSSH
		.shell([`mysql -u${process.env.CZAPP_PROD_DB_USER} -p${process.env.CZAPP_PROD_DB_PASS} --host=${process.env.CZAPP_PROD_DB_HOST} ${process.env.CZAPP_DB_NAME} < ${process.env.CZAPP_PROD_PATH_TO_API_ROOT}/migrations.sql`],
			{filePath: 'migrations.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('cleanMigrations', function(cb){
	const backupFileName = 'migration_' + Date.now() + '.sql';
	return exec(`mv ./database/migrations.sql ./database/oldMigrations/${backupFileName}`, function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('createEmptyMigrationsFile', function(cb){
	return exec(`touch ./database/migrations.sql`, function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('commitSqlFilesToGit', function(cb){
	return exec(`git commit -am "Committing migrations file backup and schema dump after upgrade of production"`, function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('migrateProdDb', gulp.series([
	'uploadMigrationsFileToProd',
	'applyMigrations',
	'cleanMigrations',
	'createEmptyMigrationsFile',
	'dumpNoData'

]));


/*
Upgrade Production
 */

gulp.task('upgradeProd', gulp.series([
	'deployProdClient',
	'buildAndDeployProd',
	'migrateProdDb'
]));