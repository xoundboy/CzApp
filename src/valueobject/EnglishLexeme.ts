import LexemeBase from './LexemeBase';

export default class EnglishLexeme extends LexemeBase {

	public constructor(text: string, notes: string = null) {
		super(text, notes);
	}
}