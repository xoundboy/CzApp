import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import * as QueryString from 'querystring';
import { Redirect } from 'react-router';
import LexemePairPayload from '../../valueobject/LexemePairPayload';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface IAddConfirmState {
	saveComplete: boolean;
}

export default class AddConfirm extends Component<object, IAddConfirmState> {

	context: IAppContext;

	render() {
			return (
				<AppContextConsumer>
					{(context) => {
						this.context = context;
						if (this.state.saveComplete)
							return(
								<Redirect to={`/add/${context.inputLanguage}`} />
							);
						else
							return (
								<div>
									{this.renderSummary()}
									{this.renderPairingNotes()}
									{this.renderSaveButton()}
								</div>
							);
					}}
				</AppContextConsumer>
			);
	}

	renderSummary() {
		return (
			<div className="summary">
				<div className="englishText">
					<div className="label">{this.context.dictionary.SUMMARY_LABEL_EN_TEXT}</div>
					<div className="text">{this.context.englishLexeme.text}</div>
				</div>
				<div className="englishNotes">
					<div className="notes">{this.context.englishLexeme.notes}</div>
				</div>
				<div className="czechText">
					<div className="label">{this.context.dictionary.SUMMARY_LABEL_CZ_TEXT}</div>
					<div className="text">{this.context.czechLexeme.text}</div>
				</div>
				<div className="czechNotes">
					<div className="notes">{this.context.czechLexeme.notes}</div>
				</div>
			</div>
		);
	}

	renderSaveButton() {
		return (
			<div className="saveButtonContainer">
				<button
					onClick={() => {
						const idToken = this.context.googleAuth.currentUser.get().getAuthResponse().id_token;
						if (this.context.czechLexeme.text === '' && this.context.englishLexeme.text === '')
							return;
						const request = new XMLHttpRequest();
						request.open('POST', `${backendBaseUrl}/lexemes`);
						request.setRequestHeader('Authorization', idToken);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.addEventListener('load', () => {

							// todo - implement toast for confirmation of save
							//alert('Save complete!');

							this.context.onSaveCompleted();
							this.setState({saveComplete: true});
						});
						request.send(QueryString.stringify(this.payload));
					}}
				>
					{this.context.dictionary.BUTTON_SAVE}
				</button>
			</div>
		);
	}

	private get payload(): LexemePairPayload {

		return {
			idToken: this.context.googleAuth.currentUser.get().getAuthResponse().id_token,

			czText: this.context.czechLexeme.text,
			czNotes: this.context.czechLexeme.notes,
			czWordType: this.context.czechLexeme.wordType,
			czPhraseType: this.context.czechLexeme.phraseType,
			czType: this.context.czechLexeme.type,
			czGender: this.context.czechLexeme.gender,
			czVerbAspect: this.context.czechLexeme.verbAspect,

			enText: this.context.englishLexeme.text,
			enNotes: this.context.englishLexeme.notes,
			enWordType: this.context.englishLexeme.wordType,
			enPhraseType: this.context.englishLexeme.phraseType,
			enType: this.context.englishLexeme.type,

			pairingNotes: this.context.pairingNotes
		} as LexemePairPayload;
	}

	renderPairingNotes() {
		return (
			<div className="formRow">
				<label className="label">{this.context.dictionary.SELECT_LABEL_PAIRING_NOTES}</label>
				<textarea
					onChange={(event) => this.context.onPairingNotesChanged(event.target.value as string)}
					value={this.context.pairingNotes}
				/>
			</div>
		);
	}
}
