import * as React from 'react';
import { FormEvent } from 'react';

export interface ValidatedTextInputProps {
	value: string;
	placeholderText: string;
	autofocus: boolean;
	onValueChange: ((value: string | null) => void);
}

export interface ValidatedTextInputState {
	valid: boolean;
}

export default class ValidatedTextInput extends React.Component<ValidatedTextInputProps, ValidatedTextInputState> {

	constructor(props: ValidatedTextInputProps) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event: FormEvent<HTMLTextAreaElement>) {
		let element = event.target as HTMLTextAreaElement;
		const value = element.value;
		const returnValue = this.isValid(value) ? value : null;
		this.props.onValueChange(returnValue);
	}

	isValid(value: string) {
		return value.length > 0;
	}

	render() {
		return (
			<textarea
				value={this.props.value}
				onChange={this.handleInputChange}
			/>
		);
	}
}