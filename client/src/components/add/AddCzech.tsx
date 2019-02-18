import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer } from '../../AppContext';
import { ChangeEvent } from 'react';
import Language from '../../enum/Language';

export default class AddCzech extends AddLexeme {

	constructor(props: object) {
		super(props);
		this.className = 'addCzech';
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					this.text = context.czechLexeme.text;
					this.notes = context.czechLexeme.notes;
					this.textPlaceholder = context.dictionary.INPUT_LABEL_CZECH_LEXEME;
					this.notesPlaceholder = context.dictionary.SELECT_LABEL_LEXEME_NOTES_CZ_VERSION;
					this.altText = context.englishLexeme.text;
					this.translationSuggestionInputLanguage = Language.ENGLISH;
					this.translationSuggestionTargetLanguage = Language.CZECH;
					return this.renderForm();
				}}
			</AppContextConsumer>
		);
	}

	onLexemeInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		super.onLexemeInputChanged(event);
		this.context.onCzechLexemeTextChanged(event.target.value as string);
	}

	shouldRenderSuggestButton(): boolean {
		return !!(this.context.englishLexeme.text);
	}

	onTranslationFetched(value: string) {
		this.context.onCzechLexemeTextChanged(value);
	}

	onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		this.context.onCzechLexemeNotesChanged(event.target.value as string);
	}
}
