import '../style/App.css';
import * as React from 'react';
import { Component } from 'react';
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
import IDictionary from '../api/IDictionary';
import SignInPage from './SignInPage';

interface IAppProps {
	googleAuth: gapi.auth2.GoogleAuth;
}

export default class App extends Component<IAppProps, IAppContext> {

	constructor(props: IAppProps) {

		super(props);

		this.state = {
			googleAuth: this.props.googleAuth,
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

			onInputLanguageChanged: (value) => {
				LocalStorage.inputLanguage = value;
				this.setState({inputLanguage: value});
			},

			onUiLanguageChanged: (value) => {
				LocalStorage.uiLanguage = value;
				this.setState({
					uiLanguage: value,
					dictionary: this.state.uiLanguage === Language.ENGLISH ? Cz : En
				});
			},

			onEnglishLexemeTextChanged: (value) => {
				const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
				newEnglishLexeme.text = value;
				this.setState({englishLexeme: newEnglishLexeme});
			},

			onEnglishLexemeNotesChanged: (value) => {
				const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
				newEnglishLexeme.notes = value;
				this.setState({englishLexeme: newEnglishLexeme});
			},

			onCzechLexemeTextChanged: (value) => {
				const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
				newCzechLexeme.text = value;
				this.setState({czechLexeme: newCzechLexeme});
			},

			onCzechLexemeNotesChanged: (value) => {
				const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
				newCzechLexeme.notes = value;
				this.setState({czechLexeme: newCzechLexeme});
			},

			onCzechLexemeVerbAspectChanged: (value) => {
				const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
				newCzechLexeme.verbAspect = value;
				this.setState({czechLexeme: newCzechLexeme});
			},

			onCzechLexemeGenderChanged: (value) => {
				const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
				newCzechLexeme.gender = value;
				this.setState({czechLexeme: newCzechLexeme});
			},

			onLexemeTypeChanged: (value) => {
				this.setState({lexemeType: value});
			},

			onWordTypeChanged: (value) => {
				this.setState({wordType: value});
			},

			onPhraseTypeChanged: (value) => {
				this.setState({phraseType: value});
			},

			onPairingNotesChanged: 	(value) => {
				this.setState({pairingNotes: value});
			},

			onSaveCompleted: () => {
				this.setState({
					englishLexeme: new EnglishLexeme(''),
					czechLexeme: new CzechLexeme(''),
					lexemeType: LexemeType.WORD,
					wordType: WordType.NOUN,
					phraseType: PhraseType.IDIOM,
					pairingNotes: ''
				});
			}
		};
	}

	componentWillReceiveProps(nextProps: IAppProps) {
		if (nextProps.googleAuth !== this.props.googleAuth)
			this.setState({googleAuth: nextProps.googleAuth});
	}

	getDictionary(): IDictionary {
		const uiLanguage = LocalStorage.uiLanguage as Language || Language.ENGLISH;
		return uiLanguage === Language.ENGLISH ? En : Cz;
	}

	render() {
		if (this.props.googleAuth.isSignedIn.get())
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
					<SignInPage />
				</AppContextProvider>
			);
	}
}
