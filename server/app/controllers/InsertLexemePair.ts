import { Request, Response } from 'express';
import { Controller } from './Controller';
import Mysql from '../util/Mysql';
import { StringUtils } from '../util/StringUtils';

export default class InsertLexemePair extends Controller {

	constructor() {
		super();
		this.executeQuery = this.executeQuery.bind(this);
		this.getQuery = this.getQuery.bind(this);
		this.onQueryExecuted = this.onQueryExecuted.bind(this);
		this.execute = this.execute.bind(this);
	}

	public execute(req: Request, res: Response, next: Function): void {
		this.req = req;
		this.res = res;
		this.validateToken(this.executeQuery);
	}

	executeQuery() {
		Mysql.createConnection().query(this.getQuery(this.req), this.onQueryExecuted);
	}

	onQueryExecuted(err: Error, rows: any) {
		if (err) {
			this.res.header('Access-Control-Allow-Origin', '*');
			this.res.status(500).send({ error: err });
			return;
		}
		this.res.header('Access-Control-Allow-Origin', '*');
		this.res.json(rows);
	}

	getQuery(req: Request): string {
		const wordType = StringUtils.formatEnum(req.body.wordType);
		const phraseType = StringUtils.formatEnum(req.body.phraseType);
		const type = StringUtils.formatEnum(req.body.type);
		const gender = StringUtils.formatEnum(req.body.czGender);
		const verbAspect = StringUtils.formatEnum(req.body.czVerbAspect);
		const notes = req.body.notes || '';
		const czNotes = req.body.czNotes || '';
		const enNotes = req.body.enNotes || '';

		let czWord = '';
		let czPhrase = '';
		let enWord = '';
		let enPhrase = '';

		if (type === 'WORD') {
			czWord = req.body.czText;
			enWord = req.body.enText;
		} else {
			czPhrase = req.body.czText;
			enPhrase = req.body.enText;
		}

		return `CALL insertLexemePair('${czWord}','${enWord}','${czPhrase}','${enPhrase}','${wordType}','${phraseType}
		','${type}','${gender}','${verbAspect}','${notes}','${enNotes}','${czNotes}', @insert_id);`;
	}

}