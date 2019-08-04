import WordType from '../enum/WordType';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';

export default abstract class LexemeBase {
	public text: string = '';
	public notes: string = '';
	public type: LexemeType = LexemeType.UNKNOWN;
	public wordType: WordType = WordType.ADJECTIVE;
	public phraseType: PhraseType = PhraseType.UNKNOWN;
	public id: number = null;
	public dateAdded: string = null;
	public userId: string = null;
}
