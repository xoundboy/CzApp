import * as React from 'react';
import { Route } from 'react-router-dom';
import Lexeme from '../../valueobject/Lexeme';
import LexemeType from '../../enum/LexemeType';
import Language from '../../enum/Language';
import WordType from '../../enum/WordType';
import DictionaryUtil from '../../util/DictionaryUtil';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import PhraseType from 'enum/PhraseType';

export interface ConfirmationViewProps extends LocalizedComponentProps {
	lexeme: Lexeme;
	onCancel: () => void;
	onLexemeEdit: (lexeme: Lexeme) => void;
	onSave: (lexeme: Lexeme) => void;
	onTranslationEdit: (lexeme: Lexeme) => void;
}

export interface ConfirmationViewState {
	lexeme: Lexeme;
}

export default class ConfirmationView extends LocalizedComponent<ConfirmationViewProps, ConfirmationViewState> {

	constructor(props: ConfirmationViewProps) {
		super(props);
		this.onSwitchLanguages = this.onSwitchLanguages.bind(this);
		this.onLexemeEdit = this.onLexemeEdit.bind(this);
		this.onTranslationEdit = this.onTranslationEdit.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	componentWillMount() {
		this.setState({lexeme: Object.assign({}, this.props.lexeme)});
	}

	onSwitchLanguages() {
		let lexeme = Object.assign({}, this.state.lexeme);
		lexeme.language = this.state.lexeme.translationLang;
		lexeme.translationLang = this.state.lexeme.language;
		this.setState({lexeme: lexeme});
	}

	onLexemeEdit() {
		this.props.onLexemeEdit(this.state.lexeme);
	}

	onTranslationEdit() {
		this.props.onTranslationEdit(this.state.lexeme);
	}

	onSave() {
		this.props.onSave(this.state.lexeme);
	}

	render() {
		return (
			<div className="view confirmationView">
				<div className="input">
					<span>{this.state.lexeme.text}</span>
					<button onClick={this.onLexemeEdit}>{this.props.dictionary.BUTTON_EDIT}</button>
					{this.renderWordType()}
					{this.renderCzGender()}
					{this.renderCzVerbAspect()}
					{this.renderPhraseType()}
				</div>
				<p className="translation">
					<span>{this.state.lexeme.translation}</span>
					<button onClick={this.onTranslationEdit}>{this.props.dictionary.BUTTON_EDIT}</button>
					<Route
						render={({history}) => (
							<button
								type="button"
								onClick={() => { history.push('/add/translation'); }}
							>
								{this.props.dictionary.BUTTON_EDIT}
							</button>
							)}
					/>
				</p>

				<p><button onClick={this.onSave}>{this.props.dictionary.BUTTON_SAVE}</button></p>
				<p><button onClick={this.props.onCancel}>{this.props.dictionary.BUTTON_CANCEL}</button></p>
				{/*<p><button type="button" onClick={this.onNotesClicked}>{this.props.dictionary.BUTTON_ADD_NOTE}</button>)</p>*/}
				<p>{this.state.lexeme.note}</p>
				<Route
					render={({history}) => (
						<button
							type="button"
							onClick={() => { history.push('/add/note'); }}
						>
							{this.props.dictionary.BUTTON_ADD_NOTE}
						</button>
					)}
				/>

				<p><button onClick={this.onSwitchLanguages}>{this.props.dictionary.BUTTON_SWITCH_LANGUAGES}</button></p>
			</div>
		);
	}

	renderWordType() {
		if (this.state.lexeme.wordType === WordType.NULL)
			return null;

		if (this.state.lexeme.type === LexemeType.WORD && this.state.lexeme.language !== Language.NULL) {
			const wordTypeLabel = this.props.dictionary.CONFIRMATION_WORD_TYPE;
			const wordType = DictionaryUtil.getWordTypeTranslation(this.state.lexeme.wordType, this.props.dictionary);
			return (
				<div>{wordTypeLabel}: {wordType}</div>
			);
		}
		return null;
	}

	renderPhraseType() {
		if (this.state.lexeme.phraseType === PhraseType.NULL)
			return null;

		if (this.state.lexeme.language !== Language.NULL && this.state.lexeme.type === LexemeType.PHRASE) {
			const phraseTypeLabel = this.props.dictionary.CONFIRMATION_PHRASE_TYPE;
			const phraseType = DictionaryUtil.getPhraseTypeTranslation(
				this.state.lexeme.phraseType,
				this.props.dictionary);
			return (
				<div>{phraseTypeLabel}: {phraseType}</div>
			);
		}
		return null;
	}

	renderCzVerbAspect() {
		if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.VERB) {
			const czVerbAspectLabel = this.props.dictionary.CONFIRMATION_CZ_VERB_ASPECT;
			const czVerbAspect = DictionaryUtil.getCzVerbAspectTranslation(
				this.state.lexeme.czVerbAspect,
				this.props.dictionary);
			return (
				<div>{czVerbAspectLabel}: {czVerbAspect}</div>
			);
		}
		return null;
	}

	renderCzGender() {
		if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.NOUN) {
			const czGenderLabel = this.props.dictionary.CONFIRMATION_CZ_GENDER;
			const czGender = DictionaryUtil.getCzVGenderTranslation(this.state.lexeme.czGender, this.props.dictionary);
			return (
				<div>{czGenderLabel}: {czGender}</div>
			);
		}
		return null;
	}
}
