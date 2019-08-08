import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer } from '../../AppContext';
import { ChangeEvent } from 'react';
import Language from '../../enum/Language';
import WordType from '../../enum/WordType';
import LexemeType from '../../enum/LexemeType';
import CzVerbAspect from '../../enum/CzVerbAspect';
import CzGender from '../../enum/CzGender';
import PhraseType from '../../enum/PhraseType';
import { Redirect } from 'react-router';

export default class AddCzech extends AddLexeme {

	constructor(props: object) {
		super(props);
		this.className = 'addCzech';
		this.onCzVerbAspectChanged = this.onCzVerbAspectChanged.bind(this);
		this.onCzGenderChanged = this.onCzGenderChanged.bind(this);
	}

	render() {
		if (this.state.addTranslationButtonClicked)
			return (
				<Redirect push={true} to="/add/en"/>
			);

		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					this.text = context.czechLexeme.text;
					this.notes = context.czechLexeme.notes;
					this.textPlaceholder = context.dictionary.PLACEHOLDER_INPUT_IN_CZECH;
					this.notesPlaceholder = context.dictionary.SELECT_LABEL_LEXEME_NOTES_CZ_VERSION;
					this.lexemeType = context.czechLexeme.type;
					this.wordType = context.czechLexeme.wordType;
					this.phraseType = context.czechLexeme.phraseType;
					this.altText = context.englishLexeme.text;
					this.translationSuggestionInputLanguage = Language.ENGLISH;
					this.translationSuggestionTargetLanguage = Language.CZECH;
					return this.renderForm();
				}}
			</AppContextConsumer>
		);
	}

	renderLanguageInputIdentifier() {
		return <div className="languageIdentifier cz" />;
	}

	renderTranslationLanguageInputIdentifier() {
		return <div className="languageIdentifier en" />;
	}

	renderWordMetaData() {
		if (this.context.czechLexeme.wordType === WordType.NOUN)
			return (
				<div>
					{this.renderWordType()}
					{this.renderCzGender()}
				</div>);
		else if (this.context.czechLexeme.wordType === WordType.VERB)
			return (
				<div>
					{this.renderWordType()}
					{this.renderCzVerbAspect()}
				</div>);
		else
			return this.renderWordType();
	}

	renderPhraseMetaData() {
		return this.renderPhraseType();
	}

	renderTranslationText() {
		return <div className="translationText">{this.context.englishLexeme.text}</div>;
	}

	renderCzVerbAspect() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}</label>
				<select value={this.context.czechLexeme.verbAspect} onChange={this.onCzVerbAspectChanged}>
					<option value={CzVerbAspect.UNKNOWN}>-</option>
					<option value={CzVerbAspect.PERFECTIVE}>{this.context.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
					<option value={CzVerbAspect.IMPERFECTIVE}>{this.context.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
				</select>
			</div>);
	}

	onCzVerbAspectChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.verbAspect = event.target.value as CzVerbAspect;
		this.context.onCzechLexemeChanged(lexeme);
	}

	renderCzGender() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.CZ_GENDER_SELECT_LABEL}</label>
				<select value={this.context.czechLexeme.gender} onChange={this.onCzGenderChanged}>
					<option value={CzGender.UNKNOWN}>-</option>
					<option value={CzGender.NEUTER}>{this.context.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
					<option value={CzGender.FEMININE}>{this.context.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
					<option value={CzGender.MASCULINE}>{this.context.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
					<option value={CzGender.MASCULINE_ANIMATUM}>{this.context.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
				</select>
			</div>);
	}

	onCzGenderChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.gender = event.target.value as CzGender;
		this.context.onCzechLexemeChanged(lexeme);
	}

	isTranslationPopulated(): boolean {
		return !!(this.context.englishLexeme.text);
	}

	getLexemeWithUpdatedText(value: string) {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.text = value;
		return lexeme;
	}

	onLexemeInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		super.onLexemeInputChanged(event);
		this.context.onCzechLexemeChanged(this.getLexemeWithUpdatedText(event.target.value as string));
	}

	onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.notes = event.target.value as string;
		this.context.onCzechLexemeChanged(lexeme);
	}

	onTranslationFetched(value: string) {
		this.context.onCzechLexemeChanged(this.getLexemeWithUpdatedText(value));
	}

	onLexemeTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.type = event.target.value as LexemeType;
		this.context.onCzechLexemeChanged(lexeme);
	}

	onWordTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.wordType = event.target.value as WordType;
		this.context.onCzechLexemeChanged(lexeme);
	}

	onPhraseTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.czechLexeme);
		lexeme.phraseType = event.target.value as PhraseType;
		this.context.onCzechLexemeChanged(lexeme);
	}
}
