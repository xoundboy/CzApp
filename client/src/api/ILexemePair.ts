import CzechLexeme from '../valueobject/CzechLexeme';
import EnglishLexeme from '../valueobject/EnglishLexeme';

export default interface ILexemePair {
	czechLexeme: CzechLexeme;
	englishLexeme: EnglishLexeme;
	dateAdded: string;
	ip: string;
	notes: string;
	userId: string;
}