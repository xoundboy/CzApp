import Language from '../enum/Language'; 

export default class LanguageUtil {

    static getLanguageName(language: Language): string {
        switch (language) {
            case Language.Czech: return 'Czech';
            case Language.English: return 'English';
            default: return 'No language';
        }
    } 

    static getOtherLanguage(language: Language): Language { 
        switch (language) {
            case Language.English:
                return Language.Czech;
            case Language.Czech:
                return Language.English;
            default:
                return Language.None;
        }
    }
}
