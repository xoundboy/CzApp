import { Controller } from './Controller';
import { StringUtils } from '../util/StringUtils';

export default class InsertLexemePair extends Controller {

	getQuery(): string {
		const wordType = StringUtils.formatEnum(this.req.body.wordType);
		const phraseType = StringUtils.formatEnum(this.req.body.phraseType);
		const type = StringUtils.formatEnum(this.req.body.type);
		const gender = StringUtils.formatEnum(this.req.body.czGender);
		const verbAspect = StringUtils.formatEnum(this.req.body.czVerbAspect);
		const notes = this.req.body.notes || '';
		const czNotes = this.req.body.czNotes || '';
		const enNotes = this.req.body.enNotes || '';
		const ip = this.req.ip;

		let czWord = '';
		let czPhrase = '';
		let enWord = '';
		let enPhrase = '';

		if (type === 'WORD') {
			czWord = this.req.body.czText;
			enWord = this.req.body.enText;
		} else {
			czPhrase = this.req.body.czText;
			enPhrase = this.req.body.enText;
		}

		return `CALL insertLexemePair('${czWord}','${enWord}','${czPhrase}','${enPhrase}','${wordType}','${phraseType}
			','${type}','${gender}','${verbAspect}','${notes}','${enNotes}','${czNotes}', '${ip}', '${this.userId}
			', @insert_id);`;
	}

}