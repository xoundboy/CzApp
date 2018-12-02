import Language from 'enum/Language';

export default class LocalStorage {

	static get uiLanguage(): Language {
		return localStorage.getItem('uiLanguage') as Language;
	}
	static set uiLanguage(value: Language) {
		localStorage.setItem('uiLanguage', value.toString());
	}
	static get inputLanguage(): Language {
		return localStorage.getItem('inputLanguage') as Language;
	}
	static set inputLanguage(value: Language) {
		localStorage.setItem('inputLanguage', value.toString());
	}
}