import * as React from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';

export interface ValidatedTextInputProps {
	value: string;
	placeholderText: string;
	autofocus: boolean;
	onValueChange: ((value: string | null) => void);
	onKeyUp: ((event: KeyboardEvent<HTMLInputElement>) => void);
}

export interface ValidatedTextInputState {
	value: string;
	valid: boolean;
}

export default class ValidatedTextInput extends React.Component<ValidatedTextInputProps, ValidatedTextInputState> {

	constructor(props: ValidatedTextInputProps) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		this.setState({value: this.props.value});
	}

	handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		this.setState({value: value});
		const returnValue = this.isValid(value) ? value : null;
		this.props.onValueChange(returnValue);
	}

	isValid(value: string) {
		return value.length > 0;
	}

	render() {
		const className = !this.state.valid ? 'invalid' : '';
		return (
			<input
				type="text"
				value={this.state.value}
				onChange={this.handleInputChange}
				onKeyUp={this.props.onKeyUp}
				className={className}
				autoFocus={this.props.autofocus}
				placeholder={this.props.placeholderText}
			/>
		);
	}
}