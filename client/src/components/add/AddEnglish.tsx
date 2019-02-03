import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import SuggestButton from '../generic/SuggestButton';
import Language from '../../enum/Language';

export default class AddEnglish extends AddLexeme {

	render() {
		return (
			<AppContextConsumer>
				{(context) => <div className="view addEnglish">
					{this.renderLexemeTextInput(context)}
					{this.renderSuggestButton(context)}
					{this.renderNotes(context)}
				</div>}
			</AppContextConsumer>
		);
	}

	renderLexemeTextInput(context: IAppContext) {
		return (
			<label>{context.dictionary.INPUT_LABEL_ENGLISH_LEXEME}
				<ValidatedTextInput
					value={context.englishLexeme.text}
					placeholderText={context.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH}
					autofocus={true}
					onValueChange={(event) => context.onEnglishLexemeTextChanged(
						event.target.value as string)}
				/>
			</label>
		);
	}

	renderSuggestButton(context: IAppContext) {
		return (context.czechLexeme.text) ? (
			<SuggestButton
				buttonLabel={context.dictionary.BUTTON_SUGGEST_TRANSLATION}
				inputText={context.czechLexeme.text}
				inputLanguage={Language.CZECH}
				targetLanguage={Language.ENGLISH}
				onTranslationFetched={context.onEnglishLexemeTextChanged}
			/>
		) : null;
	}

	renderNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_LEXEME_NOTES_EN_VERSION}
				<textarea
					onChange={(event) => context.onEnglishLexemeNotesChanged(
						event.target.value as string)}
					value={context.englishLexeme.notes}
				/>
			</label>
		);
	}
}
