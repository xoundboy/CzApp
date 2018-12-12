import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';
import CzVerbAspect from '../enum/CzVerbAspect';
import CzGender from '../enum/CzGender';

export default class DictionaryUtil {

	public static getWordTypeKey(value: WordType){
		switch (value) {
			case WordType.ADJECTIVE:
				return 'WORD_TYPE_OPTION_ADJECTIVE';
			case WordType.ADVERB:
				return 'WORD_TYPE_OPTION_ADVERB';
			case WordType.CONJUNCTION:
				return 'WORD_TYPE_OPTION_CONJUNCTION';
			case WordType.GERUND:
				return 'WORD_TYPE_OPTION_GERUND';
			case WordType.NOUN:
				return 'WORD_TYPE_OPTION_NOUN';
			case WordType.PREPOSITION:
				return 'WORD_TYPE_OPTION_PREPOSITION';
			case WordType.PRONOUN:
				return 'WORD_TYPE_OPTION_PRONOUN';
			case WordType.VERB:
				return 'WORD_TYPE_OPTION_VERB';
				default:
				return 'WORD_TYPE_OPTION_NONE';
		}
	}

	public static getPhraseTypeKey(value: PhraseType) {
		switch (value) {
			case PhraseType.COLLOQUIALISM:
				return 'PHRASE_TYPE_OPTION_COLLOQUIALISM';
			case PhraseType.IDIOM:
				return 'PHRASE_TYPE_OPTION_IDIOM';
			case PhraseType.OTHER:
				return 'PHRASE_TYPE_OPTION_OTHER';
			case PhraseType.PROVERB:
				return 'PHRASE_TYPE_OPTION_PROVERB';
			default:
				return 'PHRASE_TYPE_OPTION_NONE';
		}
	}

	public static getCzVerbAspectKey(value: CzVerbAspect) {
		switch (value) {
			case CzVerbAspect.PERFECTIVE:
				return 'CZ_VERB_ASPECT_OPTION_PERFECTIVE';
			case CzVerbAspect.IMPERFECTIVE:
				return 'CZ_VERB_ASPECT_OPTION_IMPERFECTIVE';
			default:
				return 'CZ_VERB_ASPECT_OPTION_UNKNOWN';
		}
	}

	public static getCzVGenderKey(value: CzGender) {
		switch (value) {
			case CzGender.FEMININE:
				return 'CZ_GENDER_OPTION_FEMININE';
			case CzGender.MASCULINE:
				return 'CZ_GENDER_OPTION_MASCULINE';
			case CzGender.MASCULINE_ANIMATUM:
				return 'CZ_GENDER_OPTION_MASCULINE_ANIMATUM';
			default:
				return 'CZ_GENDER_OPTION_NEUTER';
		}
	}
}