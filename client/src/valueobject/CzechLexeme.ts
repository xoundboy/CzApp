import LexemeBase from './LexemeBase';
import CzVerbAspect from '../enum/CzVerbAspect';
import CzGender from '../enum/CzGender';

export default class CzechLexeme extends LexemeBase {

	public gender: CzGender = CzGender.UNKNOWN;
	public verbAspect: CzVerbAspect = CzVerbAspect.UNKNOWN;
}
