import WordType from '../enum/WordType';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';

export default abstract class LexemeBase {

	public text: string;
	public notes: string;
	public type: LexemeType;
	public wordType: WordType;
	public phraseType: PhraseType;
	public id: number;
	public dateAdded: string;

	protected constructor(text: string) {
		this.text = text;
	}
}
