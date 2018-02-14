var config = require('./config.js'),
	mysql = require('mysql');

var _getMonthFormatted = function (dateObj) {
	var month = dateObj.getMonth() + 1;
	return month < 10 ? '0' + month : '' + month;
};
var _getDayFormatted = function (dateObj) {
	var day = dateObj.getDate() + 1;
	return day < 10 ? '0' + day : '' + day;
};

var _secondsToHoursMinsSeconds = function(durationInSeconds){
	var sec_num = parseInt(durationInSeconds, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	var time = "";

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10 && hours !== "00") {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}

	if (hours !== "00") {
		time += hours + ':';
	}
	time += minutes + ':' + seconds;
	return time;

};

var util = {

	dbConn: function() {
		var connection = mysql.createConnection({
			host     : config.DB_HOST,
			user     : config.DB_USER,
			password : config.DB_PASS,
			database : config.DB_NAME,
			multipleStatements: true
		});
		return connection;
	},

	runQueryAndResponse: function(query, res){
		this.dbConn().query(query, function(err, rows) {
			if (err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.status(500).send({ error: err });
				return;
			}
			res.header("Access-Control-Allow-Origin", "*");
			res.json(rows);
		})
	},

	getLastId: function(res, callback){

		this.dbConn().query('SELECT last_insert_id() AS id;', function (err, rows) {
			if (err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.status(400).send("can't get the latest insert ID from the database");
			} else {
				callback(rows[0].id);
			}
		});
	},

	getInsertId: function(result){
		return result[1][0]["@insert_id"];
	},

	handleError: function(err, res) {

		if (err) {
			console.log(err);
			res.header("Access-Control-Allow-Origin", "*");
			res.status(400).send(err.msg);
			return true;
		}
		return false;
	},

	formattedDate: function (date) {
		var dateObj = new Date(date);
		return _getMonthFormatted(dateObj) + "/" + _getDayFormatted(dateObj) + '/' + dateObj.getFullYear();
	},

	formattedDuration: function(duration){
		if (duration === 0){
			return '';
		} else {
			return _secondsToHoursMinsSeconds(duration);
		}
	},

	mysqlFormatDate: function (unformattedDate){

		// converts from 'MM/DD/YYYY' to 'YYYY-MM-DD 00:00:00'
		var MM = unformattedDate.substring(0,2);
		var DD = unformattedDate.substring(3,5);
		var YYYY = unformattedDate.substring(6,10);

		return YYYY + '-' + MM + '-' + DD + ' 00:00:00';
	},

	htmlEscape: function (str) {
		return String(str)
			.replace(/&/g, '&amp;')
			.replace(/\\/g, '')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	},

	isArray: function(obj){
		return !!obj && Array === obj.constructor;
	},

	parseJSON: function(str) {
		var output;
		try {
			output = JSON.parse(str);
		} catch (e) {
			return null;
		}
		return output;
	},


	getHistoricDateIsoString: function(daysBack){
		var d = new Date();
		daysBack = daysBack || 0;
		d.setDate(d.getDate() - daysBack);
		return d.toISOString();
	}
};

module.exports = util;