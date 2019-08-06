import { DbQueryController } from './DbQueryController';

export enum TestType {
	recent = 'recent',
	unknown = 'unknown',
	familiar = 'familiar',
	known = 'known',
	random = 'random'
}

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
				return `CALL selectKnownLexemes('${this.userId}',${length},0);`;
			case TestType.familiar:
				return `CALL selectFamiliarLexemes('${this.userId}',${length},0);`;
			case TestType.unknown:
				return `CALL selectUnknownLexemes('${this.userId}',${length},0);`;
			case TestType.random:
				return `CALL selectRandomLexemes('${this.userId}',${length});`;
			default:
				return '';
		}
	}
}
