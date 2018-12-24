import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import CzVerbAspect from '../../enum/CzVerbAspect';
import WordType from '../../enum/WordType';
import CzGender from '../../enum/CzGender';
import LexemeType from '../../enum/LexemeType';
import PhraseType from '../../enum/PhraseType';

export default class AddConfirm extends Component {

	render() {
		return (
			<AppContextConsumer>
				{(context) => <div>
					{this.renderSummary(context)}
					{this.renderMetaDataInput(context)}
					{this.renderPairingNotes(context)}
					{this.renderSaveButton(context)}
				</div>}
			</AppContextConsumer>
		);
	}

	renderSummary(context: IAppContext) {
		return (
			<div className="summary">
				<div className="englishText">
					<div className="label">{context.dictionary.SUMMARY_LABEL_EN_TEXT}</div>
					<div className="summaryValue">{context.englishLexeme.text}</div>
				</div>
				<div className="englishNotes">
					<div className="label">{context.dictionary.SUMMARY_LABEL_EN_NOTES}</div>
					<div className="summaryValue">{context.englishLexeme.notes}</div>
				</div>
				<div className="czechText">
					<div className="label">{context.dictionary.SUMMARY_LABEL_CZ_TEXT}</div>
					<div className="summaryValue">{context.czechLexeme.text}</div>
				</div>
				<div className="czechNotes">
					<div className="label">{context.dictionary.SUMMARY_LABEL_CZ_NOTES}</div>
					<div className="summaryValue">{context.czechLexeme.notes}</div>
				</div>
			</div>
		);
	}

	renderSaveButton(context: IAppContext) {
		return (
			<div className="saveButtonContainer">
				<button
					onClick={(event: MouseEvent<HTMLButtonElement>) => {
						if (context.czechLexeme.text === '' && context.englishLexeme.text === '')
							return;
						context.onSaveButtonClicked();
					}}
				>
					{context.dictionary.BUTTON_SAVE}
				</button>
			</div>
		);
	}

	renderMetaDataInput(context: IAppContext) {
		return (
			<div className="metaDataInput">
				{this.renderLexemeType(context)}
				{this.renderPhraseType(context)}
				{this.renderWordType(context)}
				{this.renderCzVerbAspect(context)}
				{this.renderCzGender(context)}
			</div>
		);
	}

	renderCzVerbAspect(context: IAppContext) {
		if (context.wordType === WordType.VERB)
			return (
				<div className="formRow">
					<label>{context.dictionary.CZ_VERB_ASPECT_SELECT_LABEL}</label>
					<select
						className="czVerbAspect"
						value={context.czechLexeme.verbAspect}
						onChange={context.onCzechLexemeVerbAspectChanged}
					>
						<option value={CzVerbAspect.NULL}>-</option>
						<option value={CzVerbAspect.PERFECTIVE}>{context.dictionary.CZ_VERB_ASPECT_OPTION_PERFECTIVE}</option>
						<option value={CzVerbAspect.IMPERFECTIVE}>{context.dictionary.CZ_VERB_ASPECT_OPTION_IMPERFECTIVE}</option>
					</select>
				</div>
			);

		return null;
	}

	renderCzGender(context: IAppContext) {
		if (context.lexemeType === LexemeType.WORD && context.wordType === WordType.NOUN)
			return (
				<div className="formRow">
					<label>{context.dictionary.CZ_GENDER_SELECT_LABEL}</label>
					<select className="gender" value={context.czechLexeme.gender} onChange={context.onCzechLexemeGenderChanged}>
						<option value={CzGender.NULL}>-</option>
						<option value={CzGender.NEUTER}>{context.dictionary.CZ_GENDER_OPTION_NEUTER}</option>
						<option value={CzGender.FEMININE}>{context.dictionary.CZ_GENDER_OPTION_FEMININE}</option>
						<option value={CzGender.MASCULINE}>{context.dictionary.CZ_GENDER_OPTION_MASCULINE}</option>
						<option value={CzGender.MASCULINE_ANIMATUM}>{context.dictionary.CZ_GENDER_OPTION_MASCULINE_ANIMATUM}</option>
					</select>
				</div>
			);

		return null;
	}

	renderLexemeType(context: IAppContext) {
		return (
			<div className="formRow">
				<label>{context.dictionary.SELECT_LABEL_LEXEME_TYPE}</label>
				<select className="lexemeType" value={context.lexemeType} onChange={context.onLexemeTypeChanged}>
					<option value={LexemeType.WORD}>{context.dictionary.LEXEME_TYPE_OPTION_WORD}</option>
					<option value={LexemeType.PHRASE}>{context.dictionary.LEXEME_TYPE_OPTION_PHRASE}</option>
				</select>
			</div>
		);
	}

	renderPhraseType(context: IAppContext) {
		if (context.lexemeType === LexemeType.PHRASE)
			return (
				<div className="formRow">
					<label>{context.dictionary.PHRASE_TYPE_SELECT_LABEL}</label>
					<select className="phraseType" value={context.phraseType} onChange={context.onPhraseTypeChanged}>
						<option value={null}>-</option>
						<option value={PhraseType.COLLOQUIALISM}>{context.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
						<option value={PhraseType.IDIOM}>{context.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
						<option value={PhraseType.OTHER}>{context.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
						<option value={PhraseType.PROVERB}>{context.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
					</select>
				</div>
			);

		return null;
	}

	renderWordType(context: IAppContext) {
		if (context.lexemeType === LexemeType.WORD)
			return (
				<div className="formRow">
					<label>{context.dictionary.WORD_TYPE_SELECT_LABEL}</label>
					<select className="wordType" value={context.wordType} onChange={context.onWordTypeChanged}>
						<option value={null}>-</option>
						<option value={WordType.VERB}>{context.dictionary.WORD_TYPE_OPTION_VERB}</option>
						<option value={WordType.NOUN}>{context.dictionary.WORD_TYPE_OPTION_NOUN}</option>
						<option value={WordType.ADJECTIVE}>{context.dictionary.WORD_TYPE_OPTION_ADJECTIVE}</option>
						<option value={WordType.ADVERB}>{context.dictionary.WORD_TYPE_OPTION_ADVERB}</option>
						<option value={WordType.PRONOUN}>{context.dictionary.WORD_TYPE_OPTION_PRONOUN}</option>
						<option value={WordType.PREPOSITION}>{context.dictionary.WORD_TYPE_OPTION_PREPOSITION}</option>
						<option value={WordType.CONJUNCTION}>{context.dictionary.WORD_TYPE_OPTION_CONJUNCTION}</option>
						<option value={WordType.GERUND}>{context.dictionary.WORD_TYPE_OPTION_GERUND}</option>
					</select>
				</div>
			);

		return null;
	}

	renderPairingNotes(context: IAppContext) {
		return (
			<div className="formRow">
				<label className="label">{context.dictionary.SELECT_LABEL_PAIRING_NOTES}</label>
				<textarea
					onChange={context.onPairingNotesChanged}
					value={context.pairingNotes}
				/>
			</div>
		);
	}
}