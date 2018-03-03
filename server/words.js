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
	var text = req.body.text || null;
	var note = req.body.note || null;
	var language = req.body.language || null;
	var type = req.body.type || null;
	var czGender = req.body.czGender || null;
	var czVerbAspect = req.body.czVerbAspect || null;
	if (english && czech){
		var query = `INSERT INTO words (ts,text,note,language,type,czGender,czVerbAspect) VALUES
			(utc_timestamp(),'${text}','${note}','${language}',''${type}','${czGender}','${czVerbAspect}')`;
		util.runQueryAndResponse(query, res);
	} else {
		res.status(400).send("missing params");
	}
});

module.exports = router;