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

		const wordType = formatEnum(req.body.wordType);
		const phraseType = formatEnum(req.body.phraseType);
		const type = formatEnum(req.body.type);
		const gender = formatEnum(req.body.czGender);
		const verbAspect = formatEnum(req.body.czVerbAspect);
		const notes = req.body.notes || "";
		const czNotes = req.body.czNotes || "";
		const enNotes = req.body.enNotes || "";

		let czWord = '';
		let czPhrase = '';
		let enWord = '';
		let enPhrase = '';

		if (type === "WORD"){
			czWord = req.body.czText;
			enWord = req.body.enText;
		} else {
			czPhrase = req.body.czText;
			enPhrase = req.body.enText;
		}

		return `CALL insertLexemePair('${czWord}','${enWord}','${czPhrase}','${enPhrase}','${wordType}','${phraseType}
			','${type}','${gender}','${verbAspect}','${notes}','${enNotes}','${czNotes}', @insert_id);`;
	}

	if (isValid(req)){
		util.runQueryAndResponse(getQuery(), res);
	} else {
		res.status(400).send("invalid params");
	}
});

module.exports = router;