import WordType from '../enum/WordType';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';

export default abstract class LexemeBase {
	public text: string = '';
	public notes: string = '';
	public type: LexemeType = null;
	public wordType: WordType = null;
	public phraseType: PhraseType = null;
	public id: number = null;
	public dateAdded: string = null;
	public userId: string = null;
}
