import Language from './enum/Language';
import IDictionary from './api/IDictionary';
import EnglishLexeme from './valueobject/EnglishLexeme';
import CzechLexeme from './valueobject/CzechLexeme';
import { createContext } from 'react';
import ILexemePair from './api/ILexemePair';

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
	onCzechLexemeChanged: (value: CzechLexeme) => void;
	onLexemePairEdited: (value: ILexemePair) => void;
	onPairingNotesChanged: (value: string) => void;
	onSaveCompleted: () => void;
	onClearDataButtonClicked: () => void;
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
	onCzechLexemeChanged: (value: CzechLexeme) => { return; },
	onLexemePairEdited: (value: ILexemePair) => { return; },
	onPairingNotesChanged: (value: string) => { return; },
	onSaveCompleted: () => { return; },
	onClearDataButtonClicked: () => { return; }
};

const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
