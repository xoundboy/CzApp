import * as mysql from 'mysql';

const config = {
	DB_HOST: process.env.CZAPP_DB_HOST,
	DB_NAME: process.env.CZAPP_DB_NAME,
	DB_USER: process.env.CZAPP_DB_USER,
	DB_PASS: process.env.CZAPP_DB_PASS
};

export default class Mysql {

	public static createConnection() {
		return mysql.createConnection({
			host     : config.DB_HOST,
			user     : config.DB_USER,
			password : config.DB_PASS,
			database : config.DB_NAME,
			multipleStatements: true
		});
	}
}