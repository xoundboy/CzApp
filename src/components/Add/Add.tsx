import '../../style/App.css';
import * as React from 'react';
import LexemeView from './LexemeView';
import PageView from '../../enum/PageView';
import MetadataEntryView from './MetadataEntryView';
import Lexeme from '../../valueobject/Lexeme';
import Language from '../../enum/Language';
import LexemeUtil from '../../util/LexemeUtil';
import TranslationView from './TranslationView';
import ConfirmationView from './ConfirmationView';
import NoteView from './NoteView';
import * as QueryString from 'query-string'; 
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import { Route } from 'react-router';

export interface AddProps extends LocalizedComponentProps {
	inputLanguage: Language;
	pageView: PageView;
}

export interface AddState {
	currentView: PageView;
	lexeme: Lexeme;
}

export default class Add extends LocalizedComponent<AddProps, AddState> {

	oReq: XMLHttpRequest;

	constructor(props: AddProps) {
		super(props);
		this.state = {
			currentView: PageView.LEXEME,
			lexeme: new Lexeme(this.props.inputLanguage)
		};
		this.onCancel = this.onCancel.bind(this);
		this.onLexemeEdit = this.onLexemeEdit.bind(this);
		this.onLexemeSubmitted = this.onLexemeSubmitted.bind(this);
		this.onMetadataSubmitted = this.onMetadataSubmitted.bind(this);
		this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
		this.onNotesClicked = this.onNotesClicked.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onTranslationEdit = this.onTranslationEdit.bind(this);
		this.onTranslationSubmit = this.onTranslationSubmit.bind(this);
		this.onLanguagesSwitched = this.onLanguagesSwitched.bind(this);
	}

	onLexemeSubmitted(lexeme: Lexeme) {
		lexeme.type = LexemeUtil.getLexemeType(lexeme.text);
		this.setState({lexeme: lexeme, currentView: PageView.METADATAENTRY});
	}

	onMetadataSubmitted(lexeme: Lexeme) {
		this.setState({lexeme: lexeme, currentView: PageView.TRANSLATION});
	}

	onTranslationSubmit(lexeme: Lexeme) {
		this.setState({lexeme: lexeme, currentView: PageView.CONFIRMATION});
	}

	onLexemeEdit(lexeme: Lexeme) {
		this.setState({currentView: PageView.LEXEME});
	}

	onTranslationEdit(lexeme: Lexeme) {
		this.setState({currentView: PageView.TRANSLATION});
	}

	onNotesClicked(lexeme: Lexeme) {
		this.setState({currentView: PageView.NOTE});
	}

	onNoteSubmitted(lexeme: Lexeme) {
		this.setState({lexeme: lexeme, currentView: PageView.CONFIRMATION});
	}

	onCancel() {
		this.setState({
		lexeme: new Lexeme(this.props.inputLanguage),
		currentView: PageView.LEXEME
		});
	}

	onSave(lexeme: Lexeme) {
		this.oReq = new XMLHttpRequest();
		this.oReq.open('POST', 'http://localhost:3002/lexemes');
		this.oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		this.oReq.addEventListener('load', this.onSaveCompleted);
		this.oReq.send(QueryString.stringify(this.state.lexeme));
		return false;
	}

	onSaveCompleted () {
		console.log('save completed');
		this.oReq = null;
	}

	onLanguagesSwitched() {
		console.log(this.state.lexeme);
	}

	render() {
		return (
			<div>
				<h1 className="formRow">Add Lexeme Pair</h1>
				{this.renderTabs()}
				{this.renderPanel()}
			</div>
		);
	}

	renderTabs() {
		console.log(this.context.TAB_LEXEME_INPUT);
		return (
			<div className="tabs">
				<Route
					render={({history}) => (
						<button
							type="button"
							onClick={() => { history.push('/add/note'); }}
						>
							{/*{this.getCopy(TAB_LEXEME_INPUT)}*/}
						</button>
					)}
				/>

			</div>
		);
	}

	renderPanel() {
		switch (this.props.pageView) {
			case PageView.LEXEME:
				return (
					<LexemeView
						uiLanguage={this.props.uiLanguage}
						lexeme={this.state.lexeme}
						onSubmit={this.onLexemeSubmitted}
						onLanguagesSwitched={this.onLanguagesSwitched}
					/>
				);
			case PageView.METADATAENTRY:
				return (
					<MetadataEntryView
						uiLanguage={this.props.uiLanguage}
						lexeme={this.state.lexeme}
						onSubmit={this.onMetadataSubmitted}
					/>
				);
			case PageView.TRANSLATION:
				return (
					<TranslationView
						uiLanguage={this.props.uiLanguage}
						lexeme={this.state.lexeme}
						onSubmit={this.onTranslationSubmit}
					/>
				);
			case PageView.CONFIRMATION:
				return (
					<ConfirmationView
						uiLanguage={this.props.uiLanguage}
						lexeme={this.state.lexeme}
						onLexemeEdit={this.onLexemeEdit}
						onTranslationEdit={this.onTranslationEdit}
						onCancel={this.onCancel}
						onSave={this.onSave}
					/>
				);
			case PageView.NOTE:
				return (
					<NoteView
						uiLanguage={this.props.uiLanguage}
						lexeme={this.state.lexeme}
						onSubmit={this.onNoteSubmitted}
					/>
				);
			default:
				return null;
		}
	}
}
