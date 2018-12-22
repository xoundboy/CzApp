/* tslint:disable:max-line-length */
import * as React from 'react';
import LexemeType from '../../enum/LexemeType';
import WordType from '../../enum/WordType';
import PhraseType from '../../enum/PhraseType';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';

class MetadataEntryView extends Component {

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					return (
						<div className="view metadataEntryView">
							{this.renderLexemeType(context)}
							{this.renderWordType(context)}
							{this.renderPhraseType(context)}
							{this.renderPairingNotes(context)}
						</div>
					);
				}}
			</AppContextConsumer>
		);
	}

	renderLexemeType(context: IAppContext) {
		return (
			<div className="lexemeType">{context.lexemeType}</div>
		);
	}

	renderPhraseType(context: IAppContext) {
		if (context.lexemeType === LexemeType.PHRASE)
			return (
				<label>{context.dictionary.PHRASE_TYPE_SELECT_LABEL}
				<select className="phraseType" value={context.phraseType} onChange={context.onPhraseTypeChanged}>
					<option value={null}>-</option>
					<option value={PhraseType.COLLOQUIALISM}>{context.dictionary.PHRASE_TYPE_OPTION_COLLOQUIALISM}</option>
					<option value={PhraseType.IDIOM}>{context.dictionary.PHRASE_TYPE_OPTION_IDIOM}</option>
					<option value={PhraseType.OTHER}>{context.dictionary.PHRASE_TYPE_OPTION_OTHER}</option>
					<option value={PhraseType.PROVERB}>{context.dictionary.PHRASE_TYPE_OPTION_PROVERB}</option>
				</select>
			</label>
			);

		return null;
	}

	renderWordType(context: IAppContext) {
		if (context.lexemeType === LexemeType.WORD)
			return (
				<label>{context.dictionary.WORD_TYPE_SELECT_LABEL}
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
				</label>
			);
		
		return null;
	}

	renderPairingNotes(context: IAppContext) {
		return (
			<label>{context.dictionary.SELECT_LABEL_PAIRING_NOTES}
				<textarea
					onChange={context.onPairingNotesChanged}
					value={context.pairingNotes}
				/>
			</label>
		);
	}
}

export default MetadataEntryView;