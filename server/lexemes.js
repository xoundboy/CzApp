var express = require('express'),
	util = require('./util.js'),
	router = express.Router();

/**
 * POST /lexemes
 */
router.post('/', function(req, res){

	function isValid(req) {
		// todo
		return true;
	}

	function formatEnum(str) {
		if (str !== null && str !== undefined) {
			return str.toUpperCase();
		} else {
			return "";
		}
	}

	function getQuery() {
		var word = (req.body.type === "word") ? req.body.text : "";
		var phrase = (req.body.type === "phrase") ? req.body.text : "";
		var wordType = formatEnum(req.body.wordType);
		var phraseType = formatEnum(req.body.phraseType);
		var type = formatEnum(req.body.type);
		var gender = formatEnum(req.body.czGender);
		var verbAspect = formatEnum(req.body.czVerbAspect);
		var notes = req.body.notes || "";
		return `CALL insertCzLexeme('${word}','${phrase}','${wordType}','${phraseType}','${type}','${gender}','` +
				`${verbAspect}','${notes}', @insert_id); SELECT @insert_id;`;
	}

	if (isValid(req)){
		util.runQueryAndResponse(getQuery(), res);
	} else {
		res.status(400).send("invalid params");
	}
});

module.exports = router;