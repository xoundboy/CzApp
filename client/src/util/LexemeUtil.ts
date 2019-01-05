import LexemeType from '../enum/LexemeType';

export default class LexemeUtil {

	static getLexemeType(text: string): LexemeType {
		return text.indexOf(' ') !== -1 ? LexemeType.PHRASE : LexemeType.WORD;
	}

}
