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
		var language = req.body.language;

		var czWord = '';
		var czPhrase = '';
		var enWord = '';
		var enPhrase = '';

		if (language === "cz"){
			if (type === "WORD"){
				czWord = req.body.text;
				enWord = req.body.translation;
			} else {
				czPhrase = req.body.text;
				enPhrase = req.body.translation;
			}
		} else {
			if (type === "WORD"){
				enWord = req.body.text;
				czWord = req.body.translation;
			} else {
				enPhrase = req.body.text;
				czPhrase = req.body.translation;
			}
		}

		return `CALL insertLexemePair('${czWord}','${enWord}','${czPhrase}','${enPhrase}','${wordType}','${phraseType}','${type}','${gender}','` +
				`${verbAspect}','${notes}', @insert_id);`;
	}


	if (isValid(req)){
		util.runQueryAndResponse(getQuery(), res);
	} else {
		res.status(400).send("invalid params");
	}
});

module.exports = router;