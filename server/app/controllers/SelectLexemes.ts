import { DbQueryController } from './DbQueryController';

const RESULTSET_LENGTH = 50;

export default class SelectLexemes extends DbQueryController {

	public constructor(requireAuth: boolean) {
		super(requireAuth);
	}

	getQuery(): string {
		return `CALL selectRecentLexemes('${this.sanitise(this.userId)}',${RESULTSET_LENGTH},0);`;
	}
}
