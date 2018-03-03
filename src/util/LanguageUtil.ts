import Language from '../enum/Language'; 

export default class LanguageUtil {

    static getLanguageName(language: Language): string {
        switch (language) {
            case Language.CZECH: return 'Czech';
            case Language.ENGLISH: return 'English';
            default: return 'No language';
        }
    } 

    static getOtherLanguage(language: Language): Language { 
        switch (language) {
            case Language.ENGLISH:
                return Language.CZECH;
            case Language.CZECH:
                return Language.ENGLISH;
            default:
                return Language.NONE;
        }
    }
}
