import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';
import LexemeType from '../enum/LexemeType';
import CzGender from '../enum/CzGender';
import CzVerbAspect from '../enum/CzVerbAspect';

export default class LexemePairPayload {

	public idToken: string;
	public czText: string;
	public czNotes: string;
	public czWordType: WordType;
	public czPhraseType: PhraseType;
	public czType: LexemeType;
	public czGender: CzGender;
	public czVerbAspect: CzVerbAspect;
	public enText: string;
	public enNotes: string;
	public enWordType: WordType;
	public enPhraseType: PhraseType;
	public enType: LexemeType;
	public pairingNotes: string;

	public constructor() {
		return;
	}
}