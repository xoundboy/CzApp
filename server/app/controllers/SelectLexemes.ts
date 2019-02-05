import { DbQueryController } from './DbQueryController';

export default class SelectLexemes extends DbQueryController {

	public constructor(requireAuth: boolean) {
		super(requireAuth);
	}

	getQuery(): string {
		return `CALL selectRecentLexemes('${this.userId}');`;
	}
}