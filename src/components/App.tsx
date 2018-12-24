import '../style/App.css';
import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import { AppContextProvider, IAppContext } from '../AppContext';
import Language from '../enum/Language';
import MenuLayer from './MenuLayer';
import PageLayer from './PageLayer';
import LocalStorage from 'model/LocalStorage';
import En from '../valueobject/En';
import Cz from '../valueobject/Cz';
import EnglishLexeme from '../valueobject/EnglishLexeme';
import LexemeType from '../enum/LexemeType';
import CzechLexeme from '../valueobject/CzechLexeme';
import WordType from '../enum/WordType';
import PhraseType from '../enum/PhraseType';
import CzGender from '../enum/CzGender';
import CzVerbAspect from '../enum/CzVerbAspect';
import IDictionary from '../api/IDictionary';
import * as QueryString from 'querystring';
import Payload from '../valueobject/Payload';

export default class App extends Component<object, IAppContext> {

	private payload: Payload;

	constructor(props: object) {
		super(props);

		this.state = {
			inputLanguage: LocalStorage.inputLanguage || Language.ENGLISH,
			uiLanguage: LocalStorage.uiLanguage || Language.ENGLISH,
			dictionary: this.getDictionary(),
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			lexemeType: LexemeType.WORD,
			wordType: WordType.NOUN,
			phraseType: PhraseType.IDIOM,
			pairingNotes: '',
			onInputLanguageChanged: this.onInputLanguageChanged.bind(this),
			onUiLanguageChanged: this.onUiLanguageChanged.bind(this),
			onEnglishLexemeTextChanged: this.onEnglishLexemeTextChanged.bind(this),
			onEnglishLexemeNotesChanged: this.onEnglishLexemeNotesChanged.bind(this),
			onCzechLexemeTextChanged: this.onCzechLexemeTextChanged.bind(this),
			onCzechLexemeNotesChanged: this.onCzechLexemeNotesChanged.bind(this),
			onCzechLexemeVerbAspectChanged: this.onCzechLexemeVerbAspectChanged.bind(this),
			onCzechLexemeGenderChanged: this.onCzechLexemeGenderChanged.bind(this),
			onLexemeTypeChanged: this.onLexemeTypeChanged.bind(this),
			onWordTypeChanged: this.onWordTypeChanged.bind(this),
			onPhraseTypeChanged: this.onPhraseTypeChanged.bind(this),
			onPairingNotesChanged: this.onPairingNotesChanged.bind(this),
			onSaveButtonClicked: this.onSaveButtonClicked.bind(this)
		};
		this.initialiseFields();
		this.payload = new Payload();
	}

	getDictionary(): IDictionary {
		const uiLanguage = LocalStorage.uiLanguage as Language || Language.ENGLISH;
		return uiLanguage === Language.ENGLISH ? En : Cz;
	}

	onInputLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value as Language;
		LocalStorage.inputLanguage = value;
		this.setState({inputLanguage: value});
	}

	onUiLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value as Language;
		LocalStorage.uiLanguage = value;
		const newDictionary = this.state.uiLanguage === Language.ENGLISH ? Cz : En;
		this.setState({
			uiLanguage: value,
			dictionary: newDictionary
		});
	}

	onEnglishLexemeTextChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
		newEnglishLexeme.text = event.target.value as string;
		this.setState({englishLexeme: newEnglishLexeme});
	}

	onEnglishLexemeNotesChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
		newEnglishLexeme.notes = event.target.value as string;
		this.setState({englishLexeme: newEnglishLexeme});
	}

	onCzechLexemeTextChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.text = event.target.value as string;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeNotesChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.notes = event.target.value as string;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeVerbAspectChanged(event: ChangeEvent<HTMLSelectElement>) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.verbAspect = event.target.value as CzVerbAspect;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeGenderChanged(event: ChangeEvent<HTMLSelectElement>) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.gender = event.target.value as CzGender;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onLexemeTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({lexemeType: event.target.value as LexemeType});
	}

	onWordTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({wordType: event.target.value as WordType});
	}

	onPhraseTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({phraseType: event.target.value as PhraseType});
	}

	onPairingNotesChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		this.setState({pairingNotes: event.target.value as string});
	}

	onSaveButtonClicked() {

		this.preparePayload();

		const request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:3002/lexemes');
		request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		request.addEventListener('load', this.onSaveCompleted.bind(this));
		request.send(QueryString.stringify(this.payload));
	}

	onSaveCompleted() {
		alert('Save complete!');
		this.initialiseFields();
	}

	initialiseFields() {
		this.setState({
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			lexemeType: LexemeType.WORD,
			wordType: WordType.NOUN,
			phraseType: PhraseType.IDIOM,
			pairingNotes: ''
		});
	}

	preparePayload() {
		this.payload.wordType = this.state.wordType;
		this.payload.phraseType = this.state.phraseType;
		this.payload.type = this.state.lexemeType;
		this.payload.czGender = this.state.czechLexeme.gender;
		this.payload.czVerbAspect = this.state.czechLexeme.verbAspect;
		this.payload.notes = this.state.pairingNotes;
		this.payload.czText = this.state.czechLexeme.text;
		this.payload.czNotes = this.state.czechLexeme.notes;
		this.payload.enText = this.state.englishLexeme.text;
		this.payload.enNotes = this.state.englishLexeme.notes;

		this.normalisePayload();
	}

	normalisePayload() {
		if (this.state.lexemeType === LexemeType.WORD) {
			this.payload.phraseType = null;
			if (this.state.wordType !== WordType.VERB)
				this.payload.czVerbAspect = null;
			if (this.state.wordType !== WordType.NOUN)
				this.payload.czGender = null;
		} else
			this.payload.wordType = null;
	}

	render() {
		return (
			<AppContextProvider value={this.state}>
				<div className={this.constructor.name}>
					<MenuLayer />
					<PageLayer />
				</div>
			</AppContextProvider>
		);
	}
}
