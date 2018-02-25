import CzGender from '../enum/CzGender';
import Language from '../enum/Language';
import LexemeType from '../enum/LexemeType';
import PhraseType from '../enum/PhraseType';
import WordType from '../enum/WordType';
import CzVerbAspect from '../enum/CzVerbAspect';

export default class Lexeme {

    public text: string = '';
    public language: Language = Language.None;
    public translation: string = '';
    public translationLang: Language = Language.None;
    public type: LexemeType = LexemeType.None;
    public czGender: CzGender = CzGender.None;
    public czVerbAspect: CzVerbAspect = CzVerbAspect.Unknown;
    public note: string = '';
    public phraseType: PhraseType = PhraseType.None;
    public wordType: WordType = WordType.None;
}