import * as React from 'react';
import { Component, ReactElement } from 'react';
import { IAppContext } from '../../AppContext';
import Language from '../../enum/Language';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import SuggestButton from '../generic/SuggestButton';
import { ChangeEvent } from 'react';

interface IAddLexemeState {
	textFieldPopulated: boolean;
	showNoteButton: boolean;
}

export default abstract class AddLexeme extends Component<object, IAddLexemeState> {

	context: IAppContext;
	className: string;
	text: string;
	notes: string;
	textPlaceholder: string;
	notesPlaceholder: string;
	altText: string;
	translationSuggestionInputLanguage: Language;
	translationSuggestionTargetLanguage: Language;

	constructor(props: object) {

		super(props);

		this.state = {
			textFieldPopulated: false,
			showNoteButton: false
		};

		this.onLexemeInputChanged = this.onLexemeInputChanged.bind(this);
		this.onNotesInputChanged = this.onNotesInputChanged.bind(this);
		this.shouldRenderSuggestButton = this.shouldRenderSuggestButton.bind(this);
		this.onTranslationFetched = this.onTranslationFetched.bind(this);
	}

	componentDidMount() {
		this.setState({textFieldPopulated: !!this.text});
	}

	abstract render(): ReactElement<object>;

	renderForm() {
		return(
			<div className={`view ${this.className}`} >
				{this.renderLexemeTextInput()}
				{this.shouldRenderSuggestButton() && this.renderSuggestButton()}
				{this.state.textFieldPopulated && this.renderAddNoteButton()}
				{this.state.showNoteButton && this.renderNotes()}
			</div>
		);
	}

	renderLexemeTextInput() {
		return (
			<ValidatedTextInput
				value={this.text}
				autofocus={true}
				onValueChange={this.onLexemeInputChanged}
				placeholder={this.textPlaceholder}
				additionalClasses="text"
			/>
		);
	}

	onLexemeInputChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value as string;
		this.setState({textFieldPopulated: !!value});
	}

	abstract shouldRenderSuggestButton(): boolean;

	renderSuggestButton() {
		return this.shouldRenderSuggestButton() ? (
			<SuggestButton
				buttonLabel={this.context.dictionary.BUTTON_SUGGEST_TRANSLATION}
				inputText={this.altText}
				inputLanguage={this.translationSuggestionInputLanguage}
				targetLanguage={this.translationSuggestionTargetLanguage}
				onTranslationFetched={this.onTranslationFetched}
			/>
		) : null;
	}

	abstract onTranslationFetched(value: string): void;

	renderAddNoteButton() {
		return (
			<button
				onClick={() => {
					return this.setState({showNoteButton: !(this.state.showNoteButton)}); }}
			>
				{/*todo - dictionary string*/}
				{(this.state.showNoteButton) ? 'hide metadata' : 'show metadata'}
			</button>
		);
	}

	renderNotes() {
		return (
			<ValidatedTextInput
				value={this.notes}
				onValueChange={this.onNotesInputChanged}
				placeholder={this.notesPlaceholder}
				additionalClasses="notes"
			/>
		);
	}

	abstract onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>): void;
}