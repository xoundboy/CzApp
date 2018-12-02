import * as React from 'react';
import Lexeme from '../../valueobject/Lexeme';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { KeyboardEvent } from 'react';
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
		this.onSubmit = this.onSubmit.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	componentWillMount() {
		this.setState({text: this.props.lexeme.text});
	}

	onValueChange(value: string | null) {
		this.setState({text: value});
	}

	onSubmit() {
		if (!this.state.text) {
			return;
		}
		let lexeme = Object.assign({}, this.props.lexeme);
		lexeme.text = this.state.text;
		this.props.onSubmit(lexeme);
	}

	onKeyUp(event: KeyboardEvent<HTMLInputElement>) {
		if (event.which === 13) {
			this.onSubmit();
		}
	}

	getPlaceHolderText() {
		switch (this.props.lexeme.language) {
			case Language.ENGLISH:
				return this.getCopy('PLACEHOLDER_INPUT_IN_ENGLISH');
			case Language.CZECH:
				return this.getCopy('PLACEHOLDER_INPUT_IN_CZECH');
			default:
				return this.getCopy('PLACEHOLDER_INPUT_NO_LANGUAGE');
		}
	}

	render() {
		return (
			<div className="view lexemeView">
				<ValidatedTextInput
					value={this.state.text}
					placeholderText={this.getPlaceHolderText()}
					autofocus={true}
					onValueChange={this.onValueChange}
					onKeyUp={this.onKeyUp}
				/>
				<button onClick={this.onSubmit}>{this.getCopy('BUTTON_SUBMIT')}</button>
				<button onClick={this.props.onLanguagesSwitched}>{this.getCopy('BUTTON_SWITCH_LANGUAGES')}</button>
			</div>
		);
	}
}
