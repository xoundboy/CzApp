import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer } from '../../AppContext';
import { ChangeEvent } from 'react';
import Language from '../../enum/Language';

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
					this.textPlaceholder = context.dictionary.INPUT_LABEL_ENGLISH_LEXEME;
					this.notesPlaceholder = context.dictionary.SELECT_LABEL_LEXEME_NOTES_EN_VERSION;
					this.altText = context.czechLexeme.text;
					this.translationSuggestionInputLanguage = Language.CZECH;
					this.translationSuggestionTargetLanguage = Language.ENGLISH;
					return this.renderForm();
				}}
			</AppContextConsumer>
		);
	}

	onLexemeInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		super.onLexemeInputChanged(event);
		this.context.onEnglishLexemeTextChanged(event.target.value as string);
	}

	shouldRenderSuggestButton(): boolean {
		return !!(this.context.czechLexeme.text);
	}

	onTranslationFetched(value: string) {
		this.context.onEnglishLexemeTextChanged(value);
	}

	onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		this.context.onEnglishLexemeNotesChanged(event.target.value as string);
	}
}
