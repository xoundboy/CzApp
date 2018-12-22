import * as React from 'react';
import { ChangeEvent } from 'react';

export interface IValidatedTextInputProps {
	value: string;
	placeholderText: string;
	autofocus: boolean;
	onValueChange: ((event: ChangeEvent<HTMLTextAreaElement>) => void);
}

export interface IValidatedTextInputState {
	valid: boolean;
}

export default class ValidatedTextInput extends React.Component<IValidatedTextInputProps, IValidatedTextInputState> {

	constructor(props: IValidatedTextInputProps) {
		super(props);
	}

	isValid(value: string) {
		return value.length > 0;
	}

	render() {
		return (
			<textarea
				value={this.props.value}
				onChange={this.props.onValueChange}
			/>
		);
	}
}