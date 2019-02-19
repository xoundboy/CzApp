import { DbQueryController } from './DbQueryController';

export default class InsertLexemePair extends DbQueryController {

	public constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	getQuery(): string {

		const czText = this.req.body.czText;
		const czNotes = this.req.body.czNotes;
		const czType = this.req.body.czType;
		const czWordType = this.req.body.czWordType;
		const czPhraseType = this.req.body.czPhraseType;
		const czGender = this.req.body.czGender;
		const czVerbAspect = this.req.body.czVerbAspect;
		const enText = this.req.body.enText;
		const enNotes = this.req.body.enNotes;
		const enType = this.req.body.enType;
		const enWordType = this.req.body.enWordType;
		const enPhraseType = this.req.body.enPhraseType;
		const pairingNotes = this.req.body.pairingNotes;
		const ip = this.req.ip;
		const query = `CALL insertLexemePair('', '${czText}','${czNotes}','${czType}','${czWordType}','${czPhraseType}','${czGender}','${czVerbAspect}','','${enText}','${enNotes}','${enType}','${enWordType}','${enPhraseType}', '${pairingNotes}', '${ip}', '${this.userId}', @insert_id);`;

		return query;
	}
}