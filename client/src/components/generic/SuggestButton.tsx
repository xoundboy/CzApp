import * as React from 'react';
import { Component } from 'react';
import Language from '../../enum/Language';

interface ISuggestButtonProps {
	buttonLabel: string;
	inputText: string;
	inputLanguage: Language;
	targetLanguage: Language;
	onTranslationFetched(text: string): void;
}

export default class SuggestButton extends Component<ISuggestButtonProps> {
	render() {
		return (
			<button onClick={this.onSuggestClick.bind(context)}>Suggest</button>
		);
	}
}