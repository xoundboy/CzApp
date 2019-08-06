import { DbQueryController } from './DbQueryController';

export default class InsertOrUpdateLexemePair extends DbQueryController {

	public constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	getQuery(): string {
		const body = this.req.body;

		return (this.req.body.czId) ?

			`CALL updateLexemePair(${body.czId}, '${body.czText}','${body.czNotes}','${body.czType}',`
				+ `'${body.czWordType}','${body.czPhraseType}','${body.czGender}','${body.czVerbAspect}',${body.enId},`
				+ `'${body.enText}','${body.enNotes}','${body.enType}','${body.enWordType}','${body.enPhraseType}', `
				+ `'${body.pairingNotes}', '${body.ip}', '${this.userId}');` :

			`CALL insertLexemePair('${body.czText}','${body.czNotes}','${body.czType}','${body.czWordType}',`
				+ `'${body.czPhraseType}','${body.czGender}','${body.czVerbAspect}','${body.enText}',`
				+ `'${body.enNotes}','${body.enType}','${body.enWordType}','${body.enPhraseType}', `
				+ `'${body.pairingNotes}', '${body.ip}', '${this.userId}', @insert_id);`;
	}
}
