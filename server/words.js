var express = require('express'),
	util = require('./util.js'),
	router = express.Router();

/**
 * GET /words?start=start&stop=stop
 */
router.get('/', function(req, res){

	var start = req.query.start || null;
	var stop = req.query.stop || null;

	var query = "SELECT * from words";
	if (start)
		query += " WHERE (ts BETWEEN '" + util.getHistoricDateIsoString(start) + "' AND '"
			+ util.getHistoricDateIsoString(stop) + "')";

	util.runQueryAndResponse(query, res);
});

/**
 * POST /words
 */
router.post('/', function(req, res){
	var note = req.body.note || null;
	var english = req.body.english || null;
	var czech = req.body.czech || null;
	if (english && czech){
		var query = "INSERT INTO words (ts, english, czech, note) VALUES (utc_timestamp(),'"
			+ english + "','" + czech + "','" + note + "')";
		util.runQueryAndResponse(query, res);
	} else {
		res.status(400).send("missing params");
	}
});

module.exports = router;