import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import Language from '../../enum/Language';
import SuggestButton from '../generic/SuggestButton';

export default class AddCzech extends AddLexeme {

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
			<label>{context.dictionary.INPUT_LABEL_CZECH_LEXEME}
				<ValidatedTextInput
					value={context.czechLexeme.text}
					placeholderText={context.dictionary.PLACEHOLDER_INPUT_IN_CZECH}
					autofocus={true}
					onValueChange={(event) => context.onCzechLexemeTextChanged(event.target.value as string)}
				/>
			</label>
		);
	}

	renderSuggestButton(context: IAppContext) {
		return (context.englishLexeme.text) ? (
			<SuggestButton
				buttonLabel={context.dictionary.BUTTON_SUGGEST_TRANSLATION}
				inputText={context.englishLexeme.text}
				inputLanguage={Language.ENGLISH}
				targetLanguage={Language.CZECH}
				onTranslationFetched={context.onCzechLexemeTextChanged}
			/>
		) : null;
	}

	renderNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_LEXEME_NOTES_CZ_VERSION}
				<textarea
					onChange={(event) => context.onCzechLexemeNotesChanged(event.target.value as string)}
					value={context.czechLexeme.notes}
				/>
			</label>
		);
	}
}
