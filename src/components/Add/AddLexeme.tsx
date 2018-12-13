import * as React from 'react';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { ChangeEvent } from 'react';

export interface AddLexemeProps extends LocalizedComponentProps {
	text: string;
	notes: string;
	onTextChanged: (text: string) => void;
	onNotesChanged: (text: string) => void;
}

export default abstract class AddLexeme<TProps extends AddLexemeProps>
	extends LocalizedComponent<TProps, object> {

	protected constructor(props: TProps) {
		super(props);
		this.onTextChanged = this.onTextChanged.bind(this);
		this.onNotesChanged = this.onNotesChanged.bind(this);
	}

	onTextChanged(value: string | null) {
		this.props.onTextChanged(value);
	}

	onNotesChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		this.props.onNotesChanged(event.target.value as string);
	}

	renderLexemeTextInput() {
		return (
			<ValidatedTextInput
				value={this.props.text}
				placeholderText={this.props.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH}
				autofocus={true}
				onValueChange={this.onTextChanged}
			/>
		);
	}

	renderNotes() {
		return (
			<label>{this.props.dictionary.SELECT_LABEL_LEXEME_NOTES}
			<textarea onChange={this.onNotesChanged}>{this.props.notes}</textarea>
		</label>
		);
	}
}