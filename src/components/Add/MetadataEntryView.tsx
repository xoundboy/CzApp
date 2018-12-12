/* tslint:disable:max-line-length */
import * as React from 'react';
import Language from '../../enum/Language';
import LanguageButton from './LanguageButton';
import Lexeme from '../../valueobject/Lexeme';
import LexemeType from '../../enum/LexemeType';
import CzGender from '../../enum/CzGender';
import PhraseType from '../../enum/PhraseType';
import WordType from '../../enum/WordType';
import LanguageUtil from '../../util/LanguageUtil';
import { ChangeEvent } from 'react';
import CzVerbAspect from '../../enum/CzVerbAspect';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';

export interface MetadataEntryViewProps extends LocalizedComponentProps {
	lexeme: Lexeme;
	onSubmit: ((lexeme: Lexeme) => void);
}

export interface MetadataEntryViewState {
	text: string;
	language: Language;
	translation: string;
	translationLang: Language;
	type: LexemeType;
	czGender: CzGender;
	czVerbAspect: CzVerbAspect;
	note: string;
	phraseType: PhraseType;
	wordType: WordType;
}

class MetadataEntryView extends LocalizedComponent<MetadataEntryViewProps, MetadataEntryViewState> {

	constructor(props: MetadataEntryViewProps) {
		super(props);
		this.onLanguageButtonCick = this.onLanguageButtonCick.bind(this);
		this.onWordTypeChange = this.onWordTypeChange.bind(this);
		this.onGenderChange = this.onGenderChange.bind(this);
		this.onCzVerbAspectChange = this.onCzVerbAspectChange.bind(this);
		this.onNextButtonClicked = this.onNextButtonClicked.bind(this);
		this.onPhraseTypeChange = this.onPhraseTypeChange.bind(this);
	}

	componentWillMount() {
		this.setState({
			text: this.props.lexeme.text,
			language: this.props.lexeme.language,
			translation: this.props.lexeme.translation,
			translationLang: this.props.lexeme.translationLang,
			type: this.props.lexeme.type,
			czGender: this.props.lexeme.czGender,
			czVerbAspect: this.props.lexeme.czVerbAspect,
			note: this.props.lexeme.note,
			phraseType: this.props.lexeme.phraseType,
			wordType: this.props.lexeme.wordType,
		});
	}

	onLanguageButtonCick(language: Language) {
		this.setState({
			language: language,
			translationLang: LanguageUtil.getOtherLanguage(language)
		});
	}

	onWordTypeChange(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({
			wordType: (event.target.value as WordType),
			phraseType: PhraseType.NULL
		});
		if (this.state.wordType !== WordType.VERB || this.state.language === Language.ENGLISH)
			this.setState({czVerbAspect: CzVerbAspect.NULL});

		if (this.state.wordType !== WordType.NOUN || this.state.language === Language.ENGLISH)
			this.setState({czGender: CzGender.NULL});

	}

	onGenderChange(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({czGender: (event.target.value as CzGender)});
	}

	onCzVerbAspectChange(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({czVerbAspect: (event.target.value as CzVerbAspect)});
	}

	onPhraseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
		this.setState({
			phraseType: (event.target.value as PhraseType),
			wordType: WordType.NULL
		});
	}

	onNextButtonClicked() {
		var lexeme = new Lexeme(this.state.language);
		lexeme.text = this.state.text;
		lexeme.translationLang = this.state.translationLang;
		lexeme.wordType = this.state.wordType;
		lexeme.type = this.state.type;
		lexeme.phraseType = this.state.phraseType;
		lexeme.czGender = this.state.czGender;
		lexeme.czVerbAspect = this.state.czVerbAspect;
		this.props.onSubmit(lexeme);
	}

	render() {
		return (
			<div className="view metadataEntryView">
				{this.renderLexeme()}
				{this.renderLanguage()}
				{this.renderWordType()}
				{this.renderCzGender()}
				{this.renderCzVerbAspect()}
				{this.renderPhraseType()}
				{this.renderNextButton()}
			</div>
		);
	}

	renderPhraseType() {
		if (this.state.language !== Language.NULL && this.state.type === LexemeType.PHRASE)
			return (
				<label>{this.props.dictionary.PHRASE_TYPE_SELECT_LABEL}
				<select className="phraseType" value={this.state.phraseType} onChange={this.onPhraseTypeChange}>
					<option value={PhraseType.NULL}>-</option>
					<option value={PhraseType.COLLOQUIALISM}>{this.props.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
					<option value={PhraseType.IDIOM}>{this.props.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
					<option value={PhraseType.OTHER}>{this.props.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
					<option value={PhraseType.PROVERB}>{this.props.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
				</select>
			</label>
			);

		return null;
	}

	renderNextButton() {
		return (
			<button onClick={this.onNextButtonClicked}>{this.props.dictionary.BUTTON_NEXT}</button>
		);
	}

	renderCzVerbAspect() {
		if (this.state.language === Language.CZECH && this.state.wordType === WordType.VERB)
			return (
				<label>{this.props.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}
					<select className="czVerbAspect" value={this.state.czVerbAspect} onChange={this.onCzVerbAspectChange}>
						<option value={CzVerbAspect.NULL}>-</option>
						<option value={CzVerbAspect.PERFECTIVE}>{this.props.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
						<option value={CzVerbAspect.IMPERFECTIVE}>{this.props.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
					</select>
				</label>
			);

		return null;
	}

	renderCzGender() {
		if (this.state.language === Language.CZECH && this.state.wordType === WordType.NOUN)
			return (
				<label>{this.props.dictionary.CZ_GENDER_SELECT_LABEL}
					<select className="gender" value={this.state.czGender} onChange={this.onGenderChange}>
						<option value={CzGender.NULL}>-</option>
						<option value={CzGender.NEUTER}>{this.props.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
						<option value={CzGender.FEMININE}>{this.props.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
						<option value={CzGender.MASCULINE}>{this.props.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
						<option value={CzGender.MASCULINE_ANIMATUM}>{this.props.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
					</select>
				</label>
			);

		return null;
	}

	renderWordType() {
		if (this.state.type === LexemeType.WORD && this.state.language !== Language.NULL)
			return (
				<label>{this.props.dictionary.WORD_TYPE_SELECT_LABEL}
					<select className="wordType" value={this.state.wordType} onChange={this.onWordTypeChange}>
						<option value={WordType.NULL}>-</option>
						<option value={WordType.VERB}>{this.props.dictionary.WORD_TYPE_OPTION_VERB}</option>
						<option value={WordType.NOUN}>{this.props.dictionary.WORD_TYPE_OPTION_NOUN}</option>
						<option value={WordType.ADJECTIVE}>{this.props.dictionary.WORD_TYPE_OPTION_ADJECTIVE}</option>
						<option value={WordType.ADVERB}>{this.props.dictionary.WORD_TYPE_OPTION_ADVERB}</option>
						<option value={WordType.PRONOUN}>{this.props.dictionary.WORD_TYPE_OPTION_PRONOUN}</option>
						<option value={WordType.PREPOSITION}>{this.props.dictionary.WORD_TYPE_OPTION_PREPOSITION}</option>
						<option value={WordType.CONJUNCTION}>{this.props.dictionary.WORD_TYPE_OPTION_CONJUNCTION}</option>
						<option value={WordType.GERUND}>{this.props.dictionary.WORD_TYPE_OPTION_GERUND}</option>
					</select>
				</label>
			);
		
		return null;
	}

	renderLexeme() {
		return (
			<div className="inputText">{this.props.lexeme.text}</div>
		);
	}

	renderLanguage() {
		if (this.state.language === Language.NULL)
			return (
				<div>
					<div className="whichLang">{this.props.dictionary.WHICH_LANGUAGE}</div>
					<div className="flagButtons">
						<LanguageButton
							language={Language.CZECH}
							onClick={this.onLanguageButtonCick}
							label=""
						/>
						<LanguageButton
							language={Language.ENGLISH}
							onClick={this.onLanguageButtonCick}
							label=""
						/>
					</div>
				</div>
			);

		return null;
	}
}

export default MetadataEntryView;