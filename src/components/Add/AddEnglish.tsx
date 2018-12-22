import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ValidatedTextInput from '../generic/ValidatedTextInput';

export default class AddEnglish extends AddLexeme {

	render() {
		return (
			<AppContextConsumer>
				{
					(context) => {
						return (
							<div className="view addEnglish">
								{this.renderLexemeTextInput(context)}
								{this.renderNotes(context)}
							</div>
						);
					}
				}
			</AppContextConsumer>
		);
	}

	renderInputLabel(context: IAppContext) {
		return (
			<label>
				{context.dictionary.INPUT_LABEL_ENGLISH_LEXEME}
			</label>
		);
	}

	renderLexemeTextInput(context: IAppContext) {
		return (
			<label>{this.renderInputLabel(context)}
				<ValidatedTextInput
					value={context.englishLexeme.text}
					placeholderText={context.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH}
					autofocus={true}
					onValueChange={context.onEnglishLexemeTextChanged}
				/>
			</label>
		);
	}

	renderNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_LEXEME_NOTES}
				<textarea
					onChange={context.onEnglishLexemeNotesChanged}
					value={context.englishLexeme.notes}
				/>
			</label>
		);
	}
}
