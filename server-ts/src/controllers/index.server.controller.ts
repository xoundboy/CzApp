import { Request, Response } from 'express';

const { OAuth2Client } = require('google-auth-library');
import * as mysql from 'mysql';

const config = {
	SERVER_PORT: process.env.CZAPP_SERVER_PORT, // 3002 works on my Mac
	DB_HOST: process.env.CZAPP_DB_HOST,
	DB_NAME: process.env.CZAPP_DB_NAME,
	DB_USER: process.env.CZAPP_DB_USER,
	DB_PASS: process.env.CZAPP_DB_PASS
};

const CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// const wget = require('node-wget');
//
// wget({ url: "http://czapp.xoundesign.com"}, function (error, response, body) {
// 	console.log(error);
// 	console.log(response);
// 	console.log(body);
// });

function formatEnum(str) {
	if (str !== null && str !== undefined) {
		return str.toUpperCase();
	} else {
		return "";
	}
}

export default class IndexController {

	constructor() {
		this.lexemes = this.lexemes.bind(this);
	}

	public lexemes(req: Request, res: Response, next: Function): void {

		function isValid() {

			client.verifyIdToken({
				idToken: req.body.idToken,
				audience: CLIENT_ID,
			}, function(err, login) {

				const sub = login.getPayload().sub;
				if (sub) {

				} else {
					res.header("Access-Control-Allow-Origin","*").status(403).send("invalid token");
				}
			});
			return true;
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

		if (isValid()){

			mysql.createConnection({
				host     : config.DB_HOST,
				user     : config.DB_USER,
				password : config.DB_PASS,
				database : config.DB_NAME,
				multipleStatements: true
			}).query(getQuery(), function(err, rows) {
				if (err) {
					res.header("Access-Control-Allow-Origin", "*");
					res.status(500).send({ error: err });
					return;
				}
				res.header("Access-Control-Allow-Origin", "*");
				res.json(rows);
			})

		} else {
			res.header("Access-Control-Allow-Origin","*").status(400).send("invalid params");
		}
	}

    public index(req: Request, res: Response, next: Function): void {
        res.render('index', { title: 'Express' });
    }

    public msg(req: Request, res: Response): void {
        res.json({ msg: 'Hello!' });
    }
}

export const indexController = new IndexController();