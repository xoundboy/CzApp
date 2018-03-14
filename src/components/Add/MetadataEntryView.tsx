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

export interface MetadataEntryViewProps {
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

class MetadataEntryView extends React.Component<MetadataEntryViewProps, MetadataEntryViewState> {

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
        this.setState({wordType: (event.target.value as WordType)});
    }

    onGenderChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({czGender: (event.target.value as CzGender)});
    }

    onCzVerbAspectChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({czVerbAspect: (event.target.value as CzVerbAspect)});
    }

    onPhraseTypeChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({phraseType: (event.target.value as PhraseType)});
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
        if (this.state.language !== Language.NONE && this.state.type === LexemeType.PHRASE) {
            return (
                <label>Phrase type
                <select className="phraseType" onChange={this.onPhraseTypeChange}>
                    <option>{PhraseType.NONE}</option>
                    <option>{PhraseType.COLLOQUIALISM}</option>
                    <option>{PhraseType.IDIOM}</option>
                    <option>{PhraseType.MODALVERB}</option>
                    <option>{PhraseType.OTHER}</option>
                    <option>{PhraseType.PHRASALVERB}</option>
                    <option>{PhraseType.PROVERB}</option>
                </select>
            </label>
            );
        }
        return null;
    }

    renderNextButton() {
        if (this.state.language !== Language.NONE && (this.state.wordType !== WordType.NONE 
            || this.state.phraseType !== PhraseType.NONE)) {
            return (
                <button onClick={this.onNextButtonClicked}>Next</button>
            );
        }
        return null;
    }

    renderCzVerbAspect() {
        if (this.state.language === Language.CZECH && this.state.wordType === WordType.VERB) {
            return (
                <label>Czech verb aspect
                    <select className="czVerbAspect" onChange={this.onCzVerbAspectChange}>
                        <option>{CzVerbAspect.UNKNOWN}</option>
                        <option>{CzVerbAspect.PERFECTIVE}</option>
                        <option>{CzVerbAspect.IMPERFECTIVE}</option>
                    </select>
                </label>
            );
        }
        return null;
    }

    renderCzGender() {
        if (this.state.language === Language.CZECH && this.state.wordType === WordType.NOUN) {
            return (
                <label>Gender
                    <select className="gender" onChange={this.onGenderChange}>
                        <option>{CzGender.NEUTER}</option>
                        <option>{CzGender.FEMININE}</option>
                        <option>{CzGender.MASCULINE}</option>
                        <option>{CzGender.MASCULINEANIMATUM}</option>
                    </select>
                </label>
            );
        }
        return null;
    }

    renderWordType() {
        if (this.state.type === LexemeType.WORD && this.state.language !== Language.NONE) {
            return (
                <label>Word type
                    <select className="wordType" onChange={this.onWordTypeChange}>
                        <option>{WordType.NONE}</option>
                        <option>{WordType.VERB}</option>
                        <option>{WordType.NOUN}</option>
                        <option>{WordType.ADJECTIVE}</option>
                        <option>{WordType.ADVERB}</option>
                        <option>{WordType.PRONOUN}</option>
                        <option>{WordType.PREPOSITION}</option>
                        <option>{WordType.CONJUNCTION}</option>
                        <option>{WordType.GERUND}</option>
                    </select>
                </label>
            );
        }
        return null;
    }

    renderLexeme() {
        return (
            <div className="inputText">
                {this.renderLexemeFlag()}
                {this.props.lexeme.text}
            </div>
        );
    }

    renderLexemeFlag() {
        if (this.state.language !== Language.NONE) {
            var className = 'flag '  + this.state.language;
            return (
                <span className={className} />
            );
        }
        return null;
    }

    renderLanguage() {
        if (this.state.language === Language.NONE) {
            return (
                <div>
                    <div className="whichLang">Which language is this?</div>
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
        }
        return null;
    }
}

export default MetadataEntryView;