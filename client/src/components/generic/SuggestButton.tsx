import * as React from 'react';
import { Component } from 'react';
import Language from '../../enum/Language';
const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

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
			<button
				onClick={() => {
					fetch(
						`${backendBaseUrl}/translate`,
						{
							method: 'POST',
							mode: 'cors',
							cache: 'no-cache',
							credentials: 'same-origin',
							headers: {
								'Content-Type': 'application/json'
							},
							redirect: 'follow',
							referrer: 'no-referrer',
							body: JSON.stringify({
								'q': this.props.inputText,
								'source': this.props.inputLanguage === Language.CZECH ? 'cs' : 'en',
								'target': this.props.targetLanguage === Language.CZECH ? 'cs' : 'en',
								'format': 'text'
							})
						})
						.then((response) => response.json())
						.then((myJson) => (this.props.onTranslationFetched(myJson.data.translations[0].translatedText)));
				}}
			>
				{this.props.buttonLabel}
			</button>
		);
	}
}