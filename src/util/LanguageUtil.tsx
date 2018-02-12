import Language from '../enum/Language'; 

class LanguageUtil {

    static getLanguageName(language: Language): string {
        switch (language) {
            case Language.Czech: return 'Czech';
            case Language.English: return 'English';
            default: return 'No language';
        }
    } 
}
export default LanguageUtil;