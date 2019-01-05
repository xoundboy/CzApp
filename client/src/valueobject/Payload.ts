import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';
import LexemeType from '../enum/LexemeType';
import CzGender from '../enum/CzGender';
import CzVerbAspect from '../enum/CzVerbAspect';

export default class Payload {
	public idToken: string;
	public wordType: WordType;
	public phraseType: PhraseType;
	public type: LexemeType;
	public czGender: CzGender;
	public czVerbAspect: CzVerbAspect;
	public notes: string;
	public czText: string;
	public czNotes: string;
	public enText: string;
	public enNotes: string;

	public constructor() {
		return;
	}
}