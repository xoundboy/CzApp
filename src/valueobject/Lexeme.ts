import CzGender from '../enum/CzGender';
import Language from '../enum/Language';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';
import WordType from '../enum/WordType';
import CzVerbAspect from '../enum/CzVerbAspect';
import LanguageUtil from '../util/LanguageUtil';

export default class Lexeme {
    
    public text: string = '';
    public language: Language = Language.NULL;
    public translation: string = '';
    public translationLang: Language = Language.NULL;
    public type: LexemeType = LexemeType.NULL;
    public czGender: CzGender = CzGender.NULL;
    public czVerbAspect: CzVerbAspect = CzVerbAspect.NULL;
    public note: string = '';
    public phraseType: PhraseType = PhraseType.NULL;
    public wordType: WordType = WordType.NULL;

    constructor(language: Language) {
        this.language = language;
        this.translationLang = language !== Language.NULL ? LanguageUtil.getOtherLanguage(language) : Language.NULL;
    }
}