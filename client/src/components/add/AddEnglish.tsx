import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer } from '../../AppContext';
import { ChangeEvent } from 'react';
import LexemeType from '../../enum/LexemeType';
import Language from '../../enum/Language';
import WordType from '../../enum/WordType';
import PhraseType from '../../enum/PhraseType';

export default class AddEnglish extends AddLexeme {

	constructor(props: object) {
		super(props);
		this.className = 'addEnglish';
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					this.text = context.englishLexeme.text;
					this.notes = context.englishLexeme.notes;
					this.textPlaceholder = context.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH;
					this.notesPlaceholder = context.dictionary.SELECT_LABEL_LEXEME_NOTES_EN_VERSION;
					this.lexemeType = context.englishLexeme.type;
					this.wordType = context.englishLexeme.wordType;
					this.phraseType = context.englishLexeme.phraseType;
					this.altText = context.czechLexeme.text;
					this.translationSuggestionInputLanguage = Language.CZECH;
					this.translationSuggestionTargetLanguage = Language.ENGLISH;
					return this.renderForm();
				}}
			</AppContextConsumer>);
	}

	renderLanguageInputIdentifier() {
		return <div className="languageIdentifier en" />;
	}

	renderWordMetaData() {
		return this.renderWordType();
	}

	renderPhraseMetaData() {
		return this.renderPhraseType();
	}

	shouldRenderSuggestButton(): boolean {
		return !!(this.context.czechLexeme.text);
	}

	getLexemeWithUpdatedText(value: string) {
		let lexeme = Object.assign({}, this.context.englishLexeme);
		lexeme.text = value;
		return lexeme;
	}

	onLexemeInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		super.onLexemeInputChanged(event);
		this.context.onEnglishLexemeChanged(this.getLexemeWithUpdatedText(event.target.value as string));
	}

	onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		let lexeme = Object.assign({}, this.context.englishLexeme);
		lexeme.notes = event.target.value as string;
		this.context.onEnglishLexemeChanged(lexeme);
	}

	onTranslationFetched(value: string) {
		this.context.onEnglishLexemeChanged(this.getLexemeWithUpdatedText(value));
	}

	onLexemeTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.englishLexeme);
		lexeme.type = event.target.value as LexemeType;
		this.context.onEnglishLexemeChanged(lexeme);
	}

	onWordTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.englishLexeme);
		lexeme.wordType = event.target.value as WordType;
		this.context.onEnglishLexemeChanged(lexeme);
	}

	onPhraseTypeChanged(event: ChangeEvent<HTMLSelectElement>): void {
		let lexeme = Object.assign({}, this.context.englishLexeme);
		lexeme.phraseType = event.target.value as PhraseType;
		this.context.onEnglishLexemeChanged(lexeme);
	}
}
