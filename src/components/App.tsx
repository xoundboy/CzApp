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
import SignInPage from './SignInPage';

interface IAppProps {
	isSignedIn: boolean;
}

export default class App extends Component<IAppProps, IAppContext> {

	constructor(props: IAppProps) {

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
			authToken: null,
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
			onSaveCompleted: this.onSaveCompleted.bind(this),
			onSignOut: this.onSignOut.bind(this)
		};

		// can't be passed in context as sign in button is not rendered by React
		this.onSignInSuccess =  this.onSignInSuccess.bind(this);
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

	onSaveCompleted() {
		this.setState({
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			lexemeType: LexemeType.WORD,
			wordType: WordType.NOUN,
			phraseType: PhraseType.IDIOM,
			pairingNotes: ''
		});
	}

	onSignInSuccess(googleUser: gapi.auth2.GoogleUser) {
		this.setState({
			authToken: googleUser.getAuthResponse().id_token
		});
	}

	onSignOut() {
		const auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut();
	}

	render() {
		if (this.props.isSignedIn)
			return (
				<AppContextProvider value={this.state}>
					<div className={this.constructor.name}>
						<MenuLayer />
						<PageLayer />
					</div>
				</AppContextProvider>
			);
		else
			return (
				<AppContextProvider value={this.state}>
					<SignInPage onSignInSuccess={this.onSignInSuccess} />
				</AppContextProvider>
			);
	}
}
