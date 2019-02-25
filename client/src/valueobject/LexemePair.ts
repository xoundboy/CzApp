import EnglishLexeme from './EnglishLexeme';
import CzechLexeme from './CzechLexeme';
import ILexemePair from '../api/ILexemePair';

export default class LexemePair implements ILexemePair {

	public englishLexeme: EnglishLexeme;
	public czechLexeme: CzechLexeme;
	public dateAdded: string;
	public ip: string;
	public notes: string;
	public userId: string;

	public constructor (englishLexeme: EnglishLexeme, czechLexeme: CzechLexeme) {

		this.englishLexeme = englishLexeme;
		this.czechLexeme = czechLexeme;
	}
}