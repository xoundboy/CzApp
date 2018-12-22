import * as React from 'react';
import { default as AddLexeme } from './AddLexeme';
import WordType from '../../enum/WordType';
import CzVerbAspect from '../../enum/CzVerbAspect';
import CzGender from '../../enum/CzGender';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ValidatedTextInput from '../generic/ValidatedTextInput';

export default class AddCzech extends AddLexeme {

	render() {
		return (
			<AppContextConsumer>
				{
					(context) => {
						return (
							<div className="view addEnglish">
								{this.renderLexemeTextInput(context)}
								{this.renderCzVerbAspect(context)}
								{this.renderCzGender(context)}
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
				{context.dictionary.INPUT_LABEL_CZECH_LEXEME}
			</label>
		);
	}

	renderCzVerbAspect(context: IAppContext) {
		if (context.wordType === WordType.VERB)
			return (
				<label>{context.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}
					<select
						className="czVerbAspect"
						value={context.czechLexeme.verbAspect}
						onChange={context.onCzechLexemeVerbAspectChanged}
					>
						<option value={CzVerbAspect.NULL}>-</option>
						<option value={CzVerbAspect.PERFECTIVE}>{context.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
						<option value={CzVerbAspect.IMPERFECTIVE}>{context.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
					</select>
				</label>
			);

		return null;
	}

	renderCzGender(context: IAppContext) {
		if (context.wordType === WordType.NOUN)
			return (
				<label>{context.dictionary.CZ_GENDER_SELECT_LABEL}
					<select className="gender" value={context.czechLexeme.gender} onChange={context.onCzechLexemeGenderChanged}>
						<option value={CzGender.NULL}>-</option>
						<option value={CzGender.NEUTER}>{context.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
						<option value={CzGender.FEMININE}>{context.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
						<option value={CzGender.MASCULINE}>{context.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
						<option value={CzGender.MASCULINE_ANIMATUM}>{context.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
					</select>
				</label>
			);

		return null;
	}

	renderLexemeTextInput(context: IAppContext) {
		return (
			<label>{this.renderInputLabel(context)}
				<ValidatedTextInput
					value={context.czechLexeme.text}
					placeholderText={context.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH}
					autofocus={true}
					onValueChange={context.onCzechLexemeTextChanged}
				/>
			</label>
		);
	}

	renderNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_LEXEME_NOTES}
				<textarea
					onChange={context.onEnglishLexemeNotesChanged}
					value={context.czechLexeme.notes}
				/>
			</label>
		);
	}
}
