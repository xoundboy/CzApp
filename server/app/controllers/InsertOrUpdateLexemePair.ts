import { DbQueryController } from './DbQueryController';

export default class InsertOrUpdateLexemePair extends DbQueryController {

	public constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	getQuery(): string {
		return (this.req.body.czId) ? this.getUpdateQuery() : this.getInsertQuery();
	}

	getInsertQuery() {
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
		// todo - remove the ids from this call..
		console.log('calling insert');
		return `CALL insertLexemePair('', '${czText}','${czNotes}','${czType}','${czWordType}','${czPhraseType}','${czGender}','${czVerbAspect}','','${enText}','${enNotes}','${enType}','${enWordType}','${enPhraseType}', '${pairingNotes}', '${ip}', '${this.userId}', @insert_id);`;
	}

	getUpdateQuery() {
		const czId = this.req.body.czId;
		const czText = this.req.body.czText;
		const czNotes = this.req.body.czNotes;
		const czType = this.req.body.czType;
		const czWordType = this.req.body.czWordType;
		const czPhraseType = this.req.body.czPhraseType;
		const czGender = this.req.body.czGender;
		const czVerbAspect = this.req.body.czVerbAspect;
		const enId = this.req.body.enId;
		const enText = this.req.body.enText;
		const enNotes = this.req.body.enNotes;
		const enType = this.req.body.enType;
		const enWordType = this.req.body.enWordType;
		const enPhraseType = this.req.body.enPhraseType;
		const pairingNotes = this.req.body.pairingNotes;
		const ip = this.req.ip;
		console.log('calling update');
		return `CALL updateLexemePair(${czId}, '${czText}','${czNotes}','${czType}','${czWordType}','${czPhraseType}','${czGender}','${czVerbAspect}',${enId},'${enText}','${enNotes}','${enType}','${enWordType}','${enPhraseType}', '${pairingNotes}', '${ip}', '${this.userId}');`;
	}
}
