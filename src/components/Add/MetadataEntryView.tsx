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
        var lexeme = new Lexeme();
        lexeme.text = this.state.text;
        lexeme.language = this.state.language;
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
        if (this.state.language !== Language.None && this.state.type === LexemeType.Phrase) {
            return (
                <label>Phrase type
                <select className="phraseType" onChange={this.onPhraseTypeChange}>
                    <option>{PhraseType.None}</option>
                    <option>{PhraseType.Coloquialism}</option>
                    <option>{PhraseType.Idiom}</option>
                    <option>{PhraseType.ModalVerb}</option>
                    <option>{PhraseType.Other}</option>
                    <option>{PhraseType.PhrasalVerb}</option>
                    <option>{PhraseType.Proverb}</option>
                </select>
            </label>
            );
        }
        return null;
    }

    renderNextButton() {
        if (this.state.language !== Language.None && (this.state.wordType !== WordType.None 
            || this.state.phraseType !== PhraseType.None)) {
            return (
                <button onClick={this.onNextButtonClicked}>Next</button>
            );
        }
        return null;
    }

    renderCzVerbAspect() {
        if (this.state.language === Language.Czech && this.state.wordType === WordType.Verb) {
            return (
                <label>Czech verb aspect
                    <select className="czVerbAspect" onChange={this.onCzVerbAspectChange}>
                        <option>{CzVerbAspect.Unknown}</option>
                        <option>{CzVerbAspect.Perfective}</option>
                        <option>{CzVerbAspect.Imperfective}</option>
                    </select>
                </label>
            );
        }
        return null;
    }

    renderCzGender() {
        if (this.state.language === Language.Czech && this.state.wordType === WordType.Noun) {
            return (
                <label>Gender
                    <select className="gender" onChange={this.onGenderChange}>
                        <option>{CzGender.None}</option>
                        <option>{CzGender.Feminine}</option>
                        <option>{CzGender.Masculine}</option>
                        <option>{CzGender.MasculineAnimatum}</option>
                    </select>
                </label>
            );
        }
        return null;
    }

    renderWordType() {
        if (this.state.type === LexemeType.Word && this.state.language !== Language.None) {
            return (
                <label>Word type
                    <select className="wordType" onChange={this.onWordTypeChange}>
                        <option>{WordType.None}</option>
                        <option>{WordType.Verb}</option>
                        <option>{WordType.Noun}</option>
                        <option>{WordType.Adjective}</option>
                        <option>{WordType.Adverb}</option>
                        <option>{WordType.Pronoun}</option>
                        <option>{WordType.Preposition}</option>
                        <option>{WordType.Conjunction}</option>
                        <option>{WordType.Gerund}</option>
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
        if (this.state.language !== Language.None) {
            var className = 'flag '  + this.state.language;
            return (
                <span className={className} />
            );
        }
        return null;
    }

    renderLanguage() {
        if (this.state.language === Language.None) {
            return (
                <div>
                    <div className="whichLang">Which language is this?</div>
                    <div className="flagButtons">
                        <LanguageButton
                            language={Language.Czech}
                            onClick={this.onLanguageButtonCick}
                            label=""
                        />
                        <LanguageButton
                            language={Language.English}
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