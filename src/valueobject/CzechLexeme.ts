import LexemeBase from './LexemeBase';
import CzVerbAspect from '../enum/CzVerbAspect';
import CzGender from '../enum/CzGender';

export default class CzechLexeme extends LexemeBase {

	gender: CzGender;
	verbAspect: CzVerbAspect;

	public constructor(
		text: string,
		gender: CzGender = CzGender.NEUTER,
		verbAspect: CzVerbAspect = CzVerbAspect.IMPERFECTIVE,
		notes: string = ''
	) {
		super(text, notes);
		this.gender = gender;
		this.verbAspect = verbAspect;
	}
}