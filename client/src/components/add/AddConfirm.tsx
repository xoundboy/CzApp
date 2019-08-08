import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import { Redirect } from 'react-router';
import SaveButton from '../generic/SaveButton';

interface IAddConfirmState {
	saveComplete: boolean;
}

export default class AddConfirm extends Component<object, IAddConfirmState> {

	context: IAppContext;

	public constructor(props: object) {
		super(props);
		this.state = {
			saveComplete: false
		};
	}

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
				<SaveButton/>
			</div>
		);
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
