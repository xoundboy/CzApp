import { ChangeEvent, createContext } from 'react';
import Language from './enum/Language';
import En from './valueobject/En';
import IDictionary from './api/IDictionary';
import EnglishLexeme from './valueobject/EnglishLexeme';
import LexemeType from './enum/LexemeType';
import CzechLexeme from './valueobject/CzechLexeme';
import WordType from './enum/WordType';
import PhraseType from './enum/PhraseType';

export interface IAppContext {
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
	onInputLanguageChanged: (event: ChangeEvent<HTMLInputElement>) => void;
	onUiLanguageChanged: (event: ChangeEvent<HTMLInputElement>) => void;
	onEnglishLexemeTextChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onEnglishLexemeNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onCzechLexemeTextChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onCzechLexemeNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onCzechLexemeVerbAspectChanged: (event: ChangeEvent<HTMLSelectElement>) => void;
	onCzechLexemeGenderChanged: (event: ChangeEvent<HTMLSelectElement>) => void;
	onLexemeTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => void;
	onWordTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => void;
	onPhraseTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => void;
	onPairingNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onSaveCompleted: () => void;
	onSignOut: () => void;
}

const defaultContext = {
	inputLanguage: Language.ENGLISH,
	uiLanguage: Language.ENGLISH,
	dictionary: En,
	englishLexeme: new EnglishLexeme(''),
	czechLexeme: new CzechLexeme(''),
	lexemeType: LexemeType.WORD,
	wordType: WordType.NOUN,
	phraseType: PhraseType.IDIOM,
	pairingNotes: '',
	authToken: '',
	onInputLanguageChanged: (event: ChangeEvent<HTMLInputElement>) => { return; },
	onUiLanguageChanged: (event: ChangeEvent<HTMLInputElement>) => { return; },
	onEnglishLexemeTextChanged: (event: ChangeEvent<HTMLTextAreaElement>) => { return; },
	onEnglishLexemeNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => { return; },
	onCzechLexemeTextChanged: (event: ChangeEvent<HTMLTextAreaElement>) => { return; },
	onCzechLexemeNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => { return; },
	onCzechLexemeVerbAspectChanged: (event: ChangeEvent<HTMLSelectElement>) => { return; },
	onCzechLexemeGenderChanged: (event: ChangeEvent<HTMLSelectElement>) => { return; },
	onLexemeTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => { return; },
	onWordTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => { return; },
	onPhraseTypeChanged: (event: ChangeEvent<HTMLSelectElement>) => { return; },
	onPairingNotesChanged: (event: ChangeEvent<HTMLTextAreaElement>) => { return; },
	onSaveCompleted: () => { return; },
	onSignOut: () => { return; }
};

const AppContext = createContext(defaultContext);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;