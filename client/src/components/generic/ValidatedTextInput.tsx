import * as React from 'react';
import { ChangeEvent } from 'react';

export interface IValidatedTextInputProps {
	value: string;
	autofocus?: boolean;
	onValueChange: ((event: ChangeEvent<HTMLTextAreaElement>) => void);
	placeholder: string;
	additionalClasses?: string;
}

export interface IValidatedTextInputState {
	valid: boolean;
}

export default class ValidatedTextInput extends React.Component<IValidatedTextInputProps, IValidatedTextInputState> {

	constructor(props: IValidatedTextInputProps) {
		super(props);
	}

	getClassName() {
		return '' + this.props.additionalClasses;
	}

	render() {
		return (
			<textarea
				value={this.props.value}
				onChange={this.props.onValueChange}
				placeholder={this.props.placeholder}
				className={this.getClassName()}
			/>
		);
	}
}