import * as React from 'react';
import { Component, ReactElement } from 'react';
import { IAppContext } from '../../AppContext';
import Language from '../../enum/Language';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import SuggestButton from '../generic/SuggestButton';
import { ChangeEvent } from 'react';
import PhraseType from '../../enum/PhraseType';
import WordType from '../../enum/WordType';
import LexemeType from '../../enum/LexemeType';

interface IAddLexemeState {
	textFieldPopulated: boolean;
	showMetadata: boolean;
}

export default abstract class AddLexeme extends Component<object, IAddLexemeState> {

	context: IAppContext;
	className: string;
	text: string;
	notes: string;
	textPlaceholder: string;
	notesPlaceholder: string;
	lexemeType: LexemeType;
	wordType: WordType;
	phraseType: PhraseType;
	altText: string;
	translationSuggestionInputLanguage: Language;
	translationSuggestionTargetLanguage: Language;

	constructor(props: object) {

		super(props);

		this.state = {
			textFieldPopulated: false,
			showMetadata: false
		};

		this.onLexemeInputChanged = this.onLexemeInputChanged.bind(this);
		this.onNotesInputChanged = this.onNotesInputChanged.bind(this);
		this.shouldRenderSuggestButton = this.shouldRenderSuggestButton.bind(this);
		this.onTranslationFetched = this.onTranslationFetched.bind(this);
		this.onLexemeTypeChanged = this.onLexemeTypeChanged.bind(this);
		this.onPhraseTypeChanged = this.onPhraseTypeChanged.bind(this);
		this.onWordTypeChanged = this.onWordTypeChanged.bind(this);
	}

	componentDidMount() {
		this.setState({textFieldPopulated: !!this.text});
	}

	abstract render(): ReactElement<object>;
	abstract renderForm(): ReactElement<object>;

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

	renderAddNoteButton() {
		return (
			<button
				onClick={() => {
					return this.setState({showMetadata: !(this.state.showMetadata)}); }}
			>
				{/*todo - dictionary string*/}
				{(this.state.showMetadata) ? 'hide metadata' : 'show metadata'}
			</button>
		);
	}

	renderLexemeType() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.SELECT_LABEL_LEXEME_TYPE}</label>
				<select
					className="lexemeType"
					value={this.lexemeType}
					onChange={this.onLexemeTypeChanged}
				>
					<option value={null} />
					<option value={LexemeType.WORD}>{this.context.dictionary.LEXEME_TYPE_OPTION_WORD}</option>
					<option value={LexemeType.PHRASE}>{this.context.dictionary.LEXEME_TYPE_OPTION_PHRASE}</option>
				</select>
			</div>
		);
	}

	abstract onLexemeTypeChanged(event: ChangeEvent<HTMLSelectElement>): void;

	renderPhraseType() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.PHRASE_TYPE_SELECT_LABEL}</label>
				<select
					className="phraseType"
					value={this.phraseType}
					onChange={this.onPhraseTypeChanged}
				>
					<option value={null} />
					<option value={PhraseType.COLLOQUIALISM}>{this.context.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
					<option value={PhraseType.IDIOM}>{this.context.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
					<option value={PhraseType.OTHER}>{this.context.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
					<option value={PhraseType.PROVERB}>{this.context.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
				</select>
			</div>
		);
	}

	abstract onPhraseTypeChanged(event: ChangeEvent<HTMLSelectElement>): void;

	renderWordType() {
		return (
			<div className="formRow">
				<label>{this.context.dictionary.WORD_TYPE_SELECT_LABEL}</label>
				<select
					className="wordType"
					value={this.wordType}
					onChange={this.onWordTypeChanged}
				>
					<option value={null} />
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
	}

	abstract onWordTypeChanged(event: ChangeEvent<HTMLSelectElement>): void;

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

	abstract onTranslationFetched(value: string): void;
	abstract onNotesInputChanged(event: ChangeEvent<HTMLTextAreaElement>): void;
}