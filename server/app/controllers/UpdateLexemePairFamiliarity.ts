import { DbQueryController } from './DbQueryController';

export default class UpdateLexemePairFamiliarity extends DbQueryController {

	public constructor(requireAuth: boolean) {
		super(requireAuth);
	}

	getQuery(): string {
		const czId = this.req.params.czId;
		const enId = this.req.params.enId;
		const familiarity = this.req.params.familiarity;
		return `CALL updateLexemePairFamiliarity(${czId},${enId},'${familiarity}');`;
	}
}
