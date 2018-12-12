import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';
import CzVerbAspect from '../enum/CzVerbAspect';
import CzGender from '../enum/CzGender';
import Dictionary from '../api/Dictionary';

export default class DictionaryUtil {

	public static getWordTypeTranslation(value: WordType, dictionary: Dictionary): string {
		switch (value) {
			case WordType.ADJECTIVE:
				return dictionary.WORD_TYPE_OPTION_ADJECTIVE;
			case WordType.ADVERB:
				return dictionary.WORD_TYPE_OPTION_ADVERB;
			case WordType.CONJUNCTION:
				return dictionary.WORD_TYPE_OPTION_CONJUNCTION;
			case WordType.GERUND:
				return dictionary.WORD_TYPE_OPTION_GERUND;
			case WordType.NOUN:
				return dictionary.WORD_TYPE_OPTION_NOUN;
			case WordType.PREPOSITION:
				return dictionary.WORD_TYPE_OPTION_PREPOSITION;
			case WordType.PRONOUN:
				return dictionary.WORD_TYPE_OPTION_PRONOUN;
			case WordType.VERB:
				return dictionary.WORD_TYPE_OPTION_VERB;
			default:
				return null;
		}
	}

	public static getPhraseTypeTranslation(value: PhraseType, dictionary: Dictionary): string {
		switch (value) {
			case PhraseType.COLLOQUIALISM:
				return dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM;
			case PhraseType.IDIOM:
				return dictionary.PHRASE_TYPE_OPTION_IDIOM;
			case PhraseType.OTHER:
				return dictionary.PHRASE_TYPE_OPTION_OTHER;
			case PhraseType.PROVERB:
				return dictionary.PHRASE_TYPE_OPTION_PROVERB;
			default:
				return null;
		}
	}

	public static getCzVerbAspectTranslation(value: CzVerbAspect, dictionary: Dictionary): string {
		switch (value) {
			case CzVerbAspect.PERFECTIVE:
				return dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE;
			case CzVerbAspect.IMPERFECTIVE:
				return dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE;
			default:
				return null;
		}
	}

	public static getCzVGenderTranslation(value: CzGender, dictionary: Dictionary): string {
		switch (value) {
			case CzGender.FEMININE:
				return dictionary.CZ_GENDER_OPTION_FEMININE;
			case CzGender.MASCULINE:
				return dictionary.CZ_GENDER_OPTION_MASCULINE;
			case CzGender.MASCULINE_ANIMATUM:
				return dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM;
			default:
				return dictionary.CZ_GENDER_OPTION_NEUTER;
		}
	}
}