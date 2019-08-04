import { DbQueryController } from './DbQueryController';

export default class DeleteLexemePair extends DbQueryController {

	public constructor(requireAuth: boolean) {
		super(requireAuth);
	}

	getQuery(): string {
		const czId = this.req.params.czId;
		const enId = this.req.params.enId;
		return `CALL deleteLexemePair(${czId},${enId});`;
	}
}
