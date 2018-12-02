import * as React from 'react';
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
	onNotesClicked: (lexeme: Lexeme) => void;
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
		this.onNotesClicked = this.onNotesClicked.bind(this);
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

	onNotesClicked() {
		this.props.onNotesClicked(this.state.lexeme);
	}

	render() {
		return (
			<div className="view confirmationView">
				<div className="input">
					<span>{this.state.lexeme.text}</span>
					<button onClick={this.onLexemeEdit}>{this.getCopy('BUTTON_EDIT')}</button>
					{this.renderWordType()}
					{this.renderCzGender()}
					{this.renderCzVerbAspect()}
					{this.renderPhraseType()}
				</div>
				<p className="translation">
					<span>{this.state.lexeme.translation}</span>
					<button onClick={this.onTranslationEdit}>{this.getCopy('BUTTON_EDIT')}</button>
				</p>
				<p>{this.state.lexeme.note}</p>
				<p><button onClick={this.onSave}>{this.getCopy('BUTTON_SAVE')}</button></p>
				<p><button onClick={this.props.onCancel}>{this.getCopy('BUTTON_CANCEL')}</button></p>
				<p><button onClick={this.onNotesClicked}>{this.getCopy('BUTTON_ADD_NOTE')}</button></p>
				<p><button onClick={this.onSwitchLanguages}>{this.getCopy('BUTTON_SWITCH_LANGUAGES')}</button></p>
			</div>
		);
	}

	renderPhraseType() {
		if (this.state.lexeme.phraseType === PhraseType.NULL) {
			return null;
		}
		if (this.state.lexeme.language !== Language.NULL && this.state.lexeme.type === LexemeType.PHRASE) {
			const phraseTypeLabel = this.getCopy('CONFIRMATION_PHRASE_TYPE');
			const phraseType = this.getCopy(DictionaryUtil.getPhraseTypeKey(this.state.lexeme.phraseType));
			return (
				<div>{phraseTypeLabel}: {phraseType}</div>
			);
		}
		return null;
	}

	renderCzVerbAspect() {
		if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.VERB) {
			const czVerbAspectLabel = this.getCopy('CONFIRMATION_CZ_VERB_ASPECT');
			const czVerbAspect = this.getCopy(DictionaryUtil.getCzVerbAspectKey(this.state.lexeme.czVerbAspect));
			return (
				<div>{czVerbAspectLabel}: {czVerbAspect}</div>
			);
		}
		return null;
	}

	renderCzGender() {
		if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.NOUN) {
			const czGenderLabel = this.getCopy('CONFIRMATION_CZ_GENDER');
			const czGender = this.getCopy(DictionaryUtil.getCzVGenderKey(this.state.lexeme.czGender));
			return (
				<div>{czGenderLabel}: {czGender}</div>
			);
		}
		return null;
	}

	renderWordType() {
		if (this.state.lexeme.wordType === WordType.NULL) {
			return null;
		}
		if (this.state.lexeme.type === LexemeType.WORD && this.state.lexeme.language !== Language.NULL) {
			const wordTypeLabel = this.getCopy('CONFIRMATION_WORD_TYPE');
			const wordType = this.getCopy(DictionaryUtil.getWordTypeKey(this.state.lexeme.wordType));
			return (
				<div>{wordTypeLabel}: {wordType}</div>
			);
		}
		return null;
	}
}
