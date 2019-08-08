import CzechLexeme from '../valueobject/CzechLexeme';
import EnglishLexeme from '../valueobject/EnglishLexeme';
import { Familiarity } from '../enum/Familiarity';

export default interface ILexemePair {
	czechLexeme: CzechLexeme;
	englishLexeme: EnglishLexeme;
	dateAdded: string;
	ip: string;
	notes: string;
	userId: string;
	familiarity: Familiarity;
}
