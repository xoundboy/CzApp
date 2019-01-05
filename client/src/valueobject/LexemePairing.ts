import EnglishLexeme from './EnglishLexeme';
import CzechLexeme from './CzechLexeme';
import LexemeType from '../enum/LexemeType';
import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';

export default class LexemePairing {

	englishLexeme: EnglishLexeme;
	czechLexeme: CzechLexeme;
	type: LexemeType;
	wordType: WordType;
	phraseType: PhraseType;
	notes: string;

	public constructor (
		englishLexeme: EnglishLexeme,
		czechLexeme: CzechLexeme,
		type: LexemeType,
		wordType: WordType = null,
		phraseType: PhraseType = null,
		notes: string = null) {

		this.englishLexeme = englishLexeme;
		this.czechLexeme = czechLexeme;
		this.type = type;
		this.wordType = wordType;
		this.phraseType = phraseType;
		this.notes = notes;
	}
}