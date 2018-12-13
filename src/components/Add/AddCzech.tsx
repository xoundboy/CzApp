import * as React from 'react';
import { default as AddLexeme, AddLexemeProps } from './AddLexeme';
import WordType from '../../enum/WordType';
import CzVerbAspect from '../../enum/CzVerbAspect';
import CzGender from '../../enum/CzGender';
import { ChangeEvent } from 'react';

export interface AddCzechProps extends AddLexemeProps {
	wordType: WordType;
	verbAspect: CzVerbAspect;
	gender: CzGender;
	onVerbAspectChanged: (verbAspect: CzVerbAspect) => void;
	onGenderChanged: (gender: CzGender) => void;
}

export default class AddCzech extends AddLexeme<AddCzechProps>  {

	constructor(props: AddCzechProps) {
		super(props);
		this.onVerbAspectChanged = this.onVerbAspectChanged.bind(this);
		this.onGenderChanged = this.onGenderChanged.bind(this);
	}

	onVerbAspectChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.props.onVerbAspectChanged(event.target.value as CzVerbAspect);
	}

	onGenderChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.props.onGenderChanged(event.target.value as CzGender);
	}

	render() {
		return (
			<div className="view addEnglish">
				{this.renderLexemeTextInput()}
				{this.renderCzVerbAspect()}
				{this.renderCzGender()}
				{this.renderNotes()}
			</div>
		);
	}

	renderCzVerbAspect() {
		if (this.props.wordType === WordType.VERB)
			return (
				<label>{this.props.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}
					<select className="czVerbAspect" value={this.props.verbAspect} onChange={this.onVerbAspectChanged}>
						<option value={CzVerbAspect.NULL}>-</option>
						<option value={CzVerbAspect.PERFECTIVE}>{this.props.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
						<option value={CzVerbAspect.IMPERFECTIVE}>{this.props.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
					</select>
				</label>
			);

		return null;
	}

	renderCzGender() {
		if (this.props.wordType === WordType.NOUN)
			return (
				<label>{this.props.dictionary.CZ_GENDER_SELECT_LABEL}
					<select className="gender" value={this.props.gender} onChange={this.onGenderChanged}>
						<option value={CzGender.NULL}>-</option>
						<option value={CzGender.NEUTER}>{this.props.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
						<option value={CzGender.FEMININE}>{this.props.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
						<option value={CzGender.MASCULINE}>{this.props.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
						<option value={CzGender.MASCULINE_ANIMATUM}>{this.props.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
					</select>
				</label>
			);

		return null;
	}
}
