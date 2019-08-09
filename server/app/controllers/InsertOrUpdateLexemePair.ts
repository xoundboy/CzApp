import { DbQueryController } from './DbQueryController';

export default class InsertOrUpdateLexemePair extends DbQueryController {

	public constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	getQuery(): string {
		const body = this.req.body;

		console.log(this.sanitise(body.enText));

		return (this.req.body.czId) ?

			`CALL updateLexemePair(${body.czId}, '${this.sanitise(body.czText)}','${this.sanitise(body.czNotes)}','${this.sanitise(body.czType)}',`
				+ `'${this.sanitise(body.czWordType)}','${this.sanitise(body.czPhraseType)}','${this.sanitise(body.czGender)}','${this.sanitise(body.czVerbAspect)}',${body.enId},`
				+ `'${this.sanitise(body.enText)}','${this.sanitise(body.enNotes)}','${this.sanitise(body.enType)}','${this.sanitise(body.enWordType)}','${this.sanitise(body.enPhraseType)}', `
				+ `'${this.sanitise(body.pairingNotes)}', '${this.sanitise(body.ip)}', '${this.sanitise(this.userId)}');` :

			`CALL insertLexemePair('${this.sanitise(body.czText)}','${this.sanitise(body.czNotes)}','${this.sanitise(body.czType)}','${this.sanitise(body.czWordType)}',`
				+ `'${this.sanitise(body.czPhraseType)}','${this.sanitise(body.czGender)}','${this.sanitise(body.czVerbAspect)}','${this.sanitise(body.enText)}',`
				+ `'${this.sanitise(body.enNotes)}','${this.sanitise(body.enType)}','${this.sanitise(body.enWordType)}','${this.sanitise(body.enPhraseType)}', `
				+ `'${this.sanitise(body.pairingNotes)}', '${this.sanitise(body.ip)}', '${this.sanitise(this.userId)}', @insert_id);`;
	}
}
