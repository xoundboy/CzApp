import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import CzVerbAspect from '../../enum/CzVerbAspect';
import WordType from '../../enum/WordType';
import CzGender from '../../enum/CzGender';
import LexemeType from '../../enum/LexemeType';
import PhraseType from '../../enum/PhraseType';
import Payload from '../../valueobject/Payload';
import * as QueryString from 'querystring';
import { Redirect } from 'react-router';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface IAddConfirmState {
	saveComplete: boolean;
}

export default class AddConfirm extends Component<object, IAddConfirmState> {

	context: IAppContext;
	private payload: Payload;

	public constructor(props: object) {
		super(props);
		this.state = {
			saveComplete: false
		};
		this.payload = new Payload();
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
									{this.renderMetaDataInput()}
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
					{/*<div className="label">{this.context.dictionary.SUMMARY_LABEL_EN_NOTES}</div>*/}
					<div className="notes">{this.context.englishLexeme.notes}</div>
				</div>
				<div className="czechText">
					<div className="label">{this.context.dictionary.SUMMARY_LABEL_CZ_TEXT}</div>
					<div className="text">{this.context.czechLexeme.text}</div>
				</div>
				<div className="czechNotes">
					{/*<div className="label">{this.context.dictionary.SUMMARY_LABEL_CZ_NOTES}</div>*/}
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
						this.preparePayload();
						const request = new XMLHttpRequest();
						request.open('POST', `${backendBaseUrl}/lexemes`);
						request.setRequestHeader('Authorization', idToken);
						request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						request.addEventListener('load', () => {
							alert('Save complete!');
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

	preparePayload() {
		this.payload.idToken = this.context.googleAuth.currentUser.get().getAuthResponse().id_token;
		this.payload.wordType = this.context.wordType;
		this.payload.phraseType = this.context.phraseType;
		this.payload.type = this.context.lexemeType;
		this.payload.czGender = this.context.czechLexeme.gender;
		this.payload.czVerbAspect = this.context.czechLexeme.verbAspect;
		this.payload.notes = this.context.pairingNotes;
		this.payload.czText = this.context.czechLexeme.text;
		this.payload.czNotes = this.context.czechLexeme.notes;
		this.payload.enText = this.context.englishLexeme.text;
		this.payload.enNotes = this.context.englishLexeme.notes;

		if (this.context.lexemeType === LexemeType.WORD) {
			this.payload.phraseType = null;
			if (this.context.wordType !== WordType.VERB)
				this.payload.czVerbAspect = null;
			if (this.context.wordType !== WordType.NOUN)
				this.payload.czGender = null;
		} else
			this.payload.wordType = null;
	}

	renderMetaDataInput() {
		return (
			<div className="metaDataInput">
				{/*{this.renderLexemeType(this.context)}*/}
				{/*{this.renderPhraseType(this.context)}*/}
				{/*{this.renderWordType(this.context)}*/}
				{/*{this.renderCzVerbAspect(this.context)}*/}
				{/*{this.renderCzGender(this.context)}*/}
			</div>
		);
	}

	renderCzVerbAspect() {
		if (this.context.wordType === WordType.VERB)
			return (
				<div className="formRow">
					<label>{this.context.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}</label>
					<select
						className="czVerbAspect"
						value={this.context.czechLexeme.verbAspect}
						onChange={(event) => this.context.onCzechLexemeVerbAspectChanged(
							event.target.value as CzVerbAspect)}
					>
						<option value={CzVerbAspect.NULL}>-</option>
						<option value={CzVerbAspect.PERFECTIVE}>{this.context.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
						<option value={CzVerbAspect.IMPERFECTIVE}>{this.context.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
					</select>
				</div>
			);

		return null;
	}

	renderCzGender() {
		if (this.context.lexemeType === LexemeType.WORD && this.context.wordType === WordType.NOUN)
			return (
				<div className="formRow">
					<label>{this.context.dictionary.CZ_GENDER_SELECT_LABEL}</label>
					<select
						className="gender"
						value={this.context.czechLexeme.gender}
						onChange={(event) => this.context.onCzechLexemeGenderChanged(event.target.value as CzGender)}
					>
						<option value={CzGender.NULL}>-</option>
						<option value={CzGender.NEUTER}>{this.context.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
						<option value={CzGender.FEMININE}>{this.context.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
						<option value={CzGender.MASCULINE}>{this.context.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
						<option value={CzGender.MASCULINE_ANIMATUM}>{this.context.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
					</select>
				</div>
			);

		return null;
	}

	renderLexemeType() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.SELECT_LABEL_LEXEME_TYPE}</label>
				<select
					className="lexemeType"
					value={this.context.lexemeType}
					onChange={(event) => this.context.onLexemeTypeChanged(event.target.value as LexemeType)}
				>
					<option value={LexemeType.WORD}>{this.context.dictionary.LEXEME_TYPE_OPTION_WORD}</option>
					<option value={LexemeType.PHRASE}>{this.context.dictionary.LEXEME_TYPE_OPTION_PHRASE}</option>
				</select>
			</div>
		);
	}

	renderPhraseType() {
		if (this.context.lexemeType === LexemeType.PHRASE)
			return (
				<div className="formRow">
					<label>{this.context.dictionary.PHRASE_TYPE_SELECT_LABEL}</label>
					<select
						className="phraseType"
						value={this.context.phraseType}
						onChange={(event) => this.context.onPhraseTypeChanged(event.target.value as PhraseType)}
					>
						<option value={null}>-</option>
						<option value={PhraseType.COLLOQUIALISM}>{this.context.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
						<option value={PhraseType.IDIOM}>{this.context.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
						<option value={PhraseType.OTHER}>{this.context.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
						<option value={PhraseType.PROVERB}>{this.context.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
					</select>
				</div>
			);

		return null;
	}

	renderWordType() {
		if (this.context.lexemeType === LexemeType.WORD)
			return (
				<div className="formRow">
					<label>{this.context.dictionary.WORD_TYPE_SELECT_LABEL}</label>
					<select
						className="wordType"
						value={this.context.wordType}
						onChange={(event) => this.context.onWordTypeChanged(event.target.value as WordType)}
					>
						<option value={null}>-</option>
						<option value={WordType.VERB}>{this.context.dictionary.WORD_TYPE_OPTION_VERB}</option>
						<option value={WordType.NOUN}>{this.context.dictionary.WORD_TYPE_OPTION_NOUN}</option>
						<option value={WordType.ADJECTIVE}>{this.context.dictionary.WORD_TYPE_OPTION_ADJECTIVE}</option>
						<option value={WordType.ADVERB}>{this.context.dictionary.WORD_TYPE_OPTION_ADVERB}</option>
						<option value={WordType.PRONOUN}>{this.context.dictionary.WORD_TYPE_OPTION_PRONOUN}</option>
						<option value={WordType.PREPOSITION}>{this.context.dictionary.WORD_TYPE_OPTION_PREPOSITION}</option>
						<option value={WordType.CONJUNCTION}>{this.context.dictionary.WORD_TYPE_OPTION_CONJUNCTION}</option>
						<option value={WordType.GERUND}>{this.context.dictionary.WORD_TYPE_OPTION_GERUND}</option>
					</select>
				</div>
			);

		return null;
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