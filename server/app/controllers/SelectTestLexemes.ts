import { DbQueryController } from './DbQueryController';
import { TestType } from '../../../client/src/enum/TestType';

export default class SelectTestLexemes extends DbQueryController {

	public constructor(requireAuth: boolean) {
		super(requireAuth);
	}

	getQuery(): string {
		const testType = this.req.params.testType as TestType;
		const length = this.req.params.testLength as number;

		switch (testType) {
			case TestType.recent:
				return `CALL selectRecentLexemes('${this.userId}',${length},0);`;
			case TestType.known:
				return `CALL selectKnownLexemes(${length});`;
			case TestType.familiar:
				return `CALL selectFamiliarLexemes(${length});`;
			case TestType.unknown:
				return `CALL selectUnknownLexemes(${length});`;
			case TestType.random:
				return `CALL selectRandomLexemes(${length});`;
			default:
				return '';
		}
	}
}
