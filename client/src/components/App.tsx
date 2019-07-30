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
import CzechLexeme from '../valueobject/CzechLexeme';
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

			onEnglishLexemeChanged: (value: EnglishLexeme) => {
				this.setState({englishLexeme: value});
			},

			onCzechLexemeChanged: (value: CzechLexeme) => {
				this.setState({czechLexeme: value});
			},

			onLexemePairEdited: (value) => {
				this.setState(
					{
						englishLexeme: value.englishLexeme,
						czechLexeme: value.czechLexeme
					}
				);
			},

			onPairingNotesChanged: 	(value) => {
				this.setState({pairingNotes: value});
			},

			onSaveCompleted: () => {
				this.clearForm();
			},

			onClearDataButtonClicked: () => {
				this.clearForm();
			}
		};
	}

	clearForm() {
		this.setState({
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			pairingNotes: ''
		});
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
						{/*<Header />*/}
						{/*<Content />*/}
						{/*<Footer />*/}
						<PageLayer />
						<MenuLayer />
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
