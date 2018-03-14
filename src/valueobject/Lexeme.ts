import CzGender from '../enum/CzGender';
import Language from '../enum/Language';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';
import WordType from '../enum/WordType';
import CzVerbAspect from '../enum/CzVerbAspect';
import LanguageUtil from '../util/LanguageUtil';

export default class Lexeme {
    
    public text: string = '';
    public language: Language = Language.NONE;
    public translation: string = '';
    public translationLang: Language = Language.NONE;
    public type: LexemeType = LexemeType.NONE;
    public czGender: CzGender = CzGender.NEUTER;
    public czVerbAspect: CzVerbAspect = CzVerbAspect.UNKNOWN;
    public note: string = '';
    public phraseType: PhraseType = PhraseType.NONE;
    public wordType: WordType = WordType.NONE;

    constructor(language: Language) {
        this.language = language;
        this.translationLang = language !== Language.NONE ? LanguageUtil.getOtherLanguage(language) : Language.NONE;
    }
}