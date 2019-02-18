import Language from './enum/Language';
import IDictionary from './api/IDictionary';
import EnglishLexeme from './valueobject/EnglishLexeme';
import LexemeType from './enum/LexemeType';
import CzechLexeme from './valueobject/CzechLexeme';
import WordType from './enum/WordType';
import PhraseType from './enum/PhraseType';
import CzVerbAspect from './enum/CzVerbAspect';
import CzGender from './enum/CzGender';
import { createContext } from 'react';

export interface IAppContext {
	googleAuth: gapi.auth2.GoogleAuth;
	inputLanguage: Language;
	uiLanguage: Language;
	dictionary: IDictionary;
	englishLexeme: EnglishLexeme;
	czechLexeme: CzechLexeme;
	lexemeType: LexemeType;
	wordType: WordType;
	phraseType: PhraseType;
	pairingNotes: string;
	authToken: string;
	onInputLanguageChanged: (language: Language) => void;
	onUiLanguageChanged: (language: Language) => void;
	onEnglishLexemeTextChanged: (value: string) => void;
	onEnglishLexemeNotesChanged: (value: string) => void;
	onEnglishLexemeEdited: (id: number) => void;
	onCzechLexemeTextChanged: (value: string) => void;
	onCzechLexemeNotesChanged: (value: string) => void;
	onCzechLexemeVerbAspectChanged: (value: CzVerbAspect) => void;
	onCzechLexemeGenderChanged: (value: CzGender) => void;
	onCzechLexemeEdited: (id: number) => void;
	onLexemeTypeChanged: (value: LexemeType) => void;
	onWordTypeChanged: (value: WordType) => void;
	onPhraseTypeChanged: (value: PhraseType) => void;
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
	lexemeType: null as LexemeType,
	wordType: null as WordType,
	phraseType: null as PhraseType,
	pairingNotes: null as string,
	authToken: null as string,
	onInputLanguageChanged: (language: Language) => { return; },
	onUiLanguageChanged: (language: Language) => { return; },
	onEnglishLexemeTextChanged: (value: string) => { return; },
	onEnglishLexemeNotesChanged: (value: string) => { return; },
	onEnglishLexemeEdited: (id: number) => {return; },
	onCzechLexemeTextChanged: (value: string) => { return; },
	onCzechLexemeNotesChanged: (value: string) => { return; },
	onCzechLexemeVerbAspectChanged: (value: CzVerbAspect) => { return; },
	onCzechLexemeGenderChanged: (value: CzGender) => { return; },
	onCzechLexemeEdited: (id: number) => {return; },
	onLexemeTypeChanged: (value: LexemeType) => { return; },
	onWordTypeChanged: (value: WordType) => { return; },
	onPhraseTypeChanged: (value: PhraseType) => { return; },
	onPairingNotesChanged: (value: string) => { return; },
	onSaveCompleted: () => { return; }
};

const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;