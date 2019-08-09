import { Component } from 'react';
import * as QueryString from 'querystring';
import * as React from 'react';
import { AppContextConsumer } from '../../AppContext';
import LexemePairPayload from '../../valueobject/LexemePairPayload';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface ISaveButtonProps {
	onSaveCompleted: () => void;
	onSaveError: () => void;
}

export default class SaveButton extends Component<ISaveButtonProps> {

	render() {
		return (
			<AppContextConsumer>
				{(context) => {

					const payload = {
						idToken: context.googleAuth.currentUser.get().getAuthResponse().id_token,

						czId: context.czechLexeme.id,
						czText: context.czechLexeme.text,
						czNotes: context.czechLexeme.notes,
						czWordType: context.czechLexeme.wordType,
						czPhraseType: context.czechLexeme.phraseType,
						czType: context.czechLexeme.type,
						czGender: context.czechLexeme.gender,
						czVerbAspect: context.czechLexeme.verbAspect,

						enId: context.englishLexeme.id,
						enText: context.englishLexeme.text,
						enNotes: context.englishLexeme.notes,
						enWordType: context.englishLexeme.wordType,
						enPhraseType: context.englishLexeme.phraseType,
						enType: context.englishLexeme.type,

						pairingNotes: context.pairingNotes
					} as LexemePairPayload;

					return (<button
						onClick={() => {
							const idToken = context.googleAuth.currentUser.get().getAuthResponse().id_token;
							if (context.czechLexeme.text === '' && context.englishLexeme.text === '')
								return;
							const request = new XMLHttpRequest();
							request.open('POST', `${backendBaseUrl}/lexemes`);
							request.setRequestHeader('Authorization', idToken);
							request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
							request.addEventListener('load', () => this.props.onSaveCompleted());
							request.addEventListener('error', () => this.props.onSaveError());
							request.send(QueryString.stringify(payload));

						}}
					>
						{context.dictionary.BUTTON_SAVE}
					</button>);
				}}
			</AppContextConsumer>
		);
	}
}
