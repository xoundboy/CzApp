import * as React from 'react';
import AddEnglish from './AddEnglish';
import AddCzech from './AddCzech';
// import AddConfirm from './AddConfirm';
import AddView from '../../enum/AddView';

import Language from '../../enum/Language';
// import LexemeUtil from '../../util/LexemeUtil';
// import * as QueryString from 'query-string';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import { Route } from 'react-router';
import Dictionary from '../../api/Dictionary';
import LexemeType from '../../enum/LexemeType';
import WordType from '../../enum/WordType';
import PhraseType from '../../enum/PhraseType';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import CzechLexeme from '../../valueobject/CzechLexeme';
import MetadataEntryView from './MetadataEntryView';
import CzVerbAspect from '../../enum/CzVerbAspect';
import CzGender from '../../enum/CzGender';

export interface AddProps extends LocalizedComponentProps {
	dictionary: Dictionary;
	inputLanguage: Language;
	view: AddView;
}

export interface AddState {
	currentView: AddView;
	englishLexeme: EnglishLexeme;
	czechLexeme: CzechLexeme;
	lexemeType: LexemeType;
	wordType: WordType;
	phraseType: PhraseType;
	pairingNotes: string;
}

export default class Add extends LocalizedComponent<AddProps, AddState> {

	oReq: XMLHttpRequest;

	constructor(props: AddProps) {
		super(props);
		this.state = {
			currentView: AddView.ENGLISH,
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			lexemeType: null,
			wordType: null,
			phraseType: null,
			pairingNotes: null
		};

		this.onEnglishLexemeTextChanged = this.onEnglishLexemeTextChanged.bind(this);
		this.onEnglishLexemeNotesChanged = this.onEnglishLexemeNotesChanged.bind(this);
		this.onCzechLexemeTextChanged = this.onCzechLexemeTextChanged.bind(this);
		this.onCzechLexemeNotesChanged = this.onCzechLexemeNotesChanged.bind(this);
		this.onCzechLexemeVerbAspectChanged = this.onCzechLexemeVerbAspectChanged.bind(this);
		this.onCzechLexemeGenderChanged = this.onCzechLexemeGenderChanged.bind(this);
		this.onLexemeTypeChanged = this.onLexemeTypeChanged.bind(this);
		this.onWordTypeChanged = this.onWordTypeChanged.bind(this);
		this.onPhraseTypeChanged = this.onPhraseTypeChanged.bind(this);
		this.onPairingNotesChanged = this.onPairingNotesChanged.bind(this);
	}

	// onCancel() {
	// 	this.setState({
	// 	lexeme: new Lexeme(this.props.inputLanguage),
	// 	currentView: AddView.LEXEME
	// 	});
	// }
	//
	// onSave(lexeme: Lexeme) {
	// 	this.oReq = new XMLHttpRequest();
	// 	this.oReq.open('POST', 'http://localhost:3002/lexemes');
	// 	this.oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	// 	this.oReq.addEventListener('load', this.onSaveCompleted);
	// 	this.oReq.send(QueryString.stringify(this.state.lexeme));
	// 	return false;
	// }
	//
	// onSaveCompleted () {
	// 	console.log('save completed');
	// 	this.oReq = null;
	// }
	//
	// onLanguagesSwitched() {
	// 	console.log(this.state.lexeme);
	// }

	onEnglishLexemeTextChanged(value: string) {
		const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
		newEnglishLexeme.text = value;
		this.setState({englishLexeme: newEnglishLexeme});
	}

	onEnglishLexemeNotesChanged(value: string) {
		const newEnglishLexeme = Object.assign({}, this.state.englishLexeme);
		newEnglishLexeme.notes = value;
		this.setState({englishLexeme: newEnglishLexeme});
	}

	onCzechLexemeTextChanged(value: string) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.text = value;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeNotesChanged(value: string) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.notes = value;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeVerbAspectChanged(value: CzVerbAspect) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.text = value;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onCzechLexemeGenderChanged(value: CzGender) {
		const newCzechLexeme = Object.assign({}, this.state.czechLexeme);
		newCzechLexeme.notes = value;
		this.setState({czechLexeme: newCzechLexeme});
	}

	onLexemeTypeChanged(type: LexemeType) {
		this.setState({lexemeType: type});
	}

	onWordTypeChanged(wordType: WordType) {
		this.setState({wordType: wordType});
	}

	onPhraseTypeChanged(phraseType: PhraseType) {
		this.setState({phraseType: phraseType});
	}

	onPairingNotesChanged(pairingNotes: string) {
		this.setState({pairingNotes: pairingNotes});
	}

	render() {
		return (
			<div className="add">
				{this.renderTabButtons()}
				{this.renderCommonPanel()}
				{this.renderLexemePanel()}
			</div>
		);
	}

	renderCommonPanel() {
		return (
			<MetadataEntryView
				dictionary={this.props.dictionary}
				lexemeType={this.state.lexemeType}
				wordType={this.state.wordType}
				phraseType={this.state.phraseType}
				pairingNotes={this.state.pairingNotes}
				onLexemeTypeChanged={this.onLexemeTypeChanged}
				onWordTypeChanged={this.onWordTypeChanged}
				onPhraseTypeChanged={this.onPhraseTypeChanged}
				onPairingNotesChanged={this.onPairingNotesChanged}
			/>
		);
	}

	renderLexemePanel() {
		switch (this.props.view) {
			case AddView.ENGLISH:
				return (
					<AddEnglish
						dictionary={this.props.dictionary}
						text={this.state.englishLexeme.text}
						notes={this.state.englishLexeme.notes}
						onTextChanged={this.onEnglishLexemeTextChanged}
						onNotesChanged={this.onEnglishLexemeNotesChanged}
					/>
				);
			case AddView.CZECH:
				return (
					<AddCzech
						dictionary={this.props.dictionary}
						text={this.state.czechLexeme.text}
						notes={this.state.czechLexeme.notes}
						onTextChanged={this.onCzechLexemeTextChanged}
						onNotesChanged={this.onCzechLexemeNotesChanged}
						wordType={this.state.wordType}
						verbAspect={this.state.czechLexeme.verbAspect}
						gender={this.state.czechLexeme.gender}
						onVerbAspectChanged={this.onCzechLexemeVerbAspectChanged}
						onGenderChanged={this.onCzechLexemeGenderChanged}
					/>);
			// case AddView.CONFIRM:
			// 	return (
			// 		<AddConfirm
			// 			dictionary={this.props.dictionary}
			// 			lexeme={this.state.lexeme}
			// 			onLexemeEdit={this.onLexemeEdit}
			// 			onTranslationEdit={this.onTranslationEdit}
			// 			onCancel={this.onCancel}
			// 			onSave={this.onSave}
			// 		/>
			// 	);
			default:
				return null;
		}
	}

	renderTabButtons() {
		return (
			<div className="tabButtons">
				<Route
					render={({history}) => (
						<button
							type="button"
							onClick={() => { history.push('/add/english'); }}
						>
							{this.props.dictionary.TAB_ENGLISH}
						</button>
					)}
				/>
				<Route
					render={({history}) => (
						<button
							type="button"
							onClick={() => { history.push('/add/czech'); }}
						>
							{this.props.dictionary.TAB_CZECH}
						</button>
					)}
				/>
				<Route
					render={({history}) => (
						<button
							type="button"
							onClick={() => { history.push('/add/confirm'); }}
						>
							{this.props.dictionary.TAB_CONFIRM}
						</button>
					)}
				/>
			</div>
		);
	}
}
