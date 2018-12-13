/* tslint:disable:max-line-length */
import * as React from 'react';
import LexemeType from '../../enum/LexemeType';
import WordType from '../../enum/WordType';
import { ChangeEvent } from 'react';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import PhraseType from '../../enum/PhraseType';

export interface MetadataEntryViewProps extends LocalizedComponentProps {
	lexemeType: LexemeType;
	wordType: WordType;
	phraseType: PhraseType;
	pairingNotes: string;
	onLexemeTypeChanged: (lexemeType: LexemeType) => void;
	onWordTypeChanged: (wordType: WordType) => void;
	onPhraseTypeChanged: (phraseType: PhraseType) => void;
	onPairingNotesChanged: (pairingNotes: string) => void;
}

class MetadataEntryView extends LocalizedComponent<MetadataEntryViewProps, object> {

	constructor(props: MetadataEntryViewProps) {
		super(props);
		this.onWordTypeChanged = this.onWordTypeChanged.bind(this);
		this.onPhraseTypeChanged = this.onPhraseTypeChanged.bind(this);
		this.onLexemeTypeChanged = this.onLexemeTypeChanged.bind(this);
		this.onPairingNotesChanged = this.onPairingNotesChanged.bind(this);
	}

	onLexemeTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.props.onLexemeTypeChanged(event.target.value as LexemeType);
	}

	onWordTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.props.onWordTypeChanged(event.target.value as WordType);
	}

	onPhraseTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		this.props.onPhraseTypeChanged(event.target.value as PhraseType);
	}

	onPairingNotesChanged(event: ChangeEvent<HTMLTextAreaElement>) {
		this.props.onPairingNotesChanged(event.target.value as string);
	}

	render() {
		return (
			<div className="view metadataEntryView">
				{this.renderLexemeType()}
				{this.renderWordType()}
				{this.renderPhraseType()}
				{this.renderPairingNotes()}
			</div>
		);
	}

	renderLexemeType() {
		return (
			<div className="lexemeType">{this.props.lexemeType}</div>
		);
	}

	renderPhraseType() {
		if (this.props.lexemeType === LexemeType.PHRASE)
			return (
				<label>{this.props.dictionary.PHRASE_TYPE_SELECT_LABEL}
				<select className="phraseType" value={this.props.phraseType} onChange={this.onPhraseTypeChanged}>
					<option value={null}>-</option>
					<option value={PhraseType.COLLOQUIALISM}>{this.props.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
					<option value={PhraseType.IDIOM}>{this.props.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
					<option value={PhraseType.OTHER}>{this.props.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
					<option value={PhraseType.PROVERB}>{this.props.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
				</select>
			</label>
			);

		return null;
	}

	renderWordType() {
		if (this.props.lexemeType === LexemeType.WORD)
			return (
				<label>{this.props.dictionary.WORD_TYPE_SELECT_LABEL}
					<select className="wordType" value={this.props.wordType} onChange={this.onWordTypeChanged}>
						<option value={null}>-</option>
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

	renderPairingNotes() {
		return (
			<label>{this.props.dictionary.SELECT_LABEL_PAIRING_NOTES}
				<textarea onChange={this.onPairingNotesChanged}>{this.props.pairingNotes}</textarea>
			</label>
		);
	}
}

export default MetadataEntryView;