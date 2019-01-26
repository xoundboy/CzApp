'use strict';

const fs = require('fs');
const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const os = require('os');

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

gulp.task('cleanRemoteWww', function() {
	return gulpSSH
		.shell(['rm -rf ' + process.env.CZAPP_PROD_PATH_TO_DOCUMENT_ROOT + '/*'], {filePath: 'cleanRemoteWww.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('deployWww', function() {
	return gulp
		.src('client/build/**/*')
		.pipe(gulpSSH.dest(process.env.CZAPP_PROD_PATH_TO_DOCUMENT_ROOT), {filePath: 'deployWww.log'})
		.pipe(gulp.dest('logs'));
});

gulp.task('deployProd', gulp.series('cleanRemoteWww', 'deployWww'));
