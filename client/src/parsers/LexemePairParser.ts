import CzechLexeme from '../valueobject/CzechLexeme';
import EnglishLexeme from '../valueobject/EnglishLexeme';
import ILexemePair from '../api/ILexemePair';
import LexemePair from '../valueobject/LexemePair';

export default class LexemePairParser {

	/* tslint:disable no-any */
	public static parse(data: any): ILexemePair | null {
		try {
			const czechLexeme = new CzechLexeme();
			czechLexeme.id = data.cz_id;
			czechLexeme.text = data.cz_text;
			czechLexeme.notes = data.cz_notes;
			czechLexeme.type = data.cz_type;
			czechLexeme.wordType = data.cz_wordType;
			czechLexeme.phraseType = data.cz_phraseType;
			czechLexeme.id = data.cz_id;
			czechLexeme.dateAdded = data.cz_ts;
			czechLexeme.userId = data.cz_userId;
			czechLexeme.gender = data.cz_gender;
			czechLexeme.verbAspect = data.cz_verbAspect;

			const englishLexeme = new EnglishLexeme();
			englishLexeme.id = data.en_id;
			englishLexeme.text = data.en_text;
			englishLexeme.notes = data.en_notes;
			englishLexeme.type = data.en_type;
			englishLexeme.wordType = data.en_wordType;
			englishLexeme.phraseType = data.en_phraseType;
			englishLexeme.id = data.en_id;
			englishLexeme.dateAdded = data.en_ts;
			englishLexeme.userId = data.en_userId;

			const output: ILexemePair = new LexemePair(englishLexeme, czechLexeme);
			output.dateAdded = data.map_dateAdded;
			output.ip = data.map_ip;
			output.notes = data.map_notes;
			output.userId = data.map_userId;

			return output;

		} catch (error) {
			return null;
		}
	}
}
