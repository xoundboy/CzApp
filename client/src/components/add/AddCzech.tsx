import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ValidatedTextInput from '../generic/ValidatedTextInput';

export default class AddCzech extends AddLexeme {

	render() {
		return (
			<AppContextConsumer>
				{(context) => <div className="view addEnglish">
					{this.renderLexemeTextInput(context)}
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
					onValueChange={context.onCzechLexemeTextChanged}
				/>
			</label>
		);
	}

	renderNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_LEXEME_NOTES_CZ_VERSION}
				<textarea
					onChange={context.onCzechLexemeNotesChanged}
					value={context.czechLexeme.notes}
				/>
			</label>
		);
	}
}
