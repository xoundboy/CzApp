import * as React from 'react';
import Lexeme from '../../valueobject/Lexeme';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { FormEvent } from 'react';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import Language from '../../enum/Language';

export interface LexemeViewProps extends LocalizedComponentProps {
	lexeme: Lexeme;
	onSubmit: ((lexeme: Lexeme) => void);
	onLanguagesSwitched: () => void;
}

export interface LexemeViewState {
	text: string | null;
	valid: boolean;
}

export default class LexemeView extends LocalizedComponent<LexemeViewProps, LexemeViewState> {

	constructor(props: LexemeViewProps) {
		super(props);
		this.onValueChange = this.onValueChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({text: this.props.lexeme.text});
	}

	onValueChange(value: string | null) {
		this.setState({text: value});
	}

	onFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!this.state.text)
			return;
		console.log('submit');
		let lexeme = Object.assign({}, this.props.lexeme);
		lexeme.text = this.state.text;
		this.props.onSubmit(lexeme);
	}

	onSubmit() {
		// todo
	}

	getPlaceHolderText() {
		switch (this.props.lexeme.language) {
			case Language.ENGLISH:
				return this.props.dictionary.PLACEHOLDER_INPUT_IN_ENGLISH;
			case Language.CZECH:
				return this.props.dictionary.PLACEHOLDER_INPUT_IN_CZECH;
			default:
				return this.props.dictionary.PLACEHOLDER_INPUT_NO_LANGUAGE;
		}
	}

	render() {
		return (
			<div className="view lexemeView">
				<form onSubmit={this.onFormSubmit}>
					<div className="formRow">
						<ValidatedTextInput
							value={this.state.text}
							placeholderText={this.getPlaceHolderText()}
							autofocus={true}
							onValueChange={this.onValueChange}
						/>
					</div>
					<div className="formRow">
						<button onClick={this.onSubmit}>{this.props.dictionary.BUTTON_SUBMIT}</button>
					</div>
				</form>
			</div>
		);
	}
}
