import Language from './enum/Language';
import IDictionary from './api/IDictionary';
import EnglishLexeme from './valueobject/EnglishLexeme';
import CzechLexeme from './valueobject/CzechLexeme';
import { createContext } from 'react';

export interface IAppContext {
	googleAuth: gapi.auth2.GoogleAuth;
	inputLanguage: Language;
	uiLanguage: Language;
	dictionary: IDictionary;
	englishLexeme: EnglishLexeme;
	czechLexeme: CzechLexeme;
	pairingNotes: string;
	authToken: string;
	onInputLanguageChanged: (language: Language) => void;
	onUiLanguageChanged: (language: Language) => void;
	onEnglishLexemeChanged: (value: EnglishLexeme) => void;
	// onEnglishLexemeEdited: (id: number) => void;
	onCzechLexemeChanged: (value: CzechLexeme) => void;
	// onCzechLexemeEdited: (id: number) => void;
	onPairingNotesChanged: (value: string) => void;
	onSaveCompleted: () => void;
}

const defaultContext = {
	googleAuth: null as gapi.auth2.GoogleAuth,
	inputLanguage: null as Language,
	uiLanguage: null as Language,
	dictionary: null as IDictionary,
	englishLexeme: null as EnglishLexeme,
	czechLexeme: null as CzechLexeme,
	pairingNotes: null as string,
	authToken: null as string,
	onInputLanguageChanged: (language: Language) => { return; },
	onUiLanguageChanged: (language: Language) => { return; },
	onEnglishLexemeChanged: (value: EnglishLexeme) => { return; },
	// onEnglishLexemeEdited: (id: number) => {return; },
	onCzechLexemeChanged: (value: CzechLexeme) => { return; },
	// onCzechLexemeEdited: (id: number) => {return; },
	onPairingNotesChanged: (value: string) => { return; },
	onSaveCompleted: () => { return; }
};

const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;