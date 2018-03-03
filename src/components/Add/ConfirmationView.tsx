import * as React from 'react';
import { Component } from 'react';
import Lexeme from '../../valueobject/Lexeme';
import LexemeType from '../../enum/LexemeType';
import Language from '../../enum/Language';
import WordType from '../../enum/WordType';

export interface ConfirmationViewProps {
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

export default class ConfirmationView extends Component<ConfirmationViewProps, ConfirmationViewState> {

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
                    <span className={`flag ${this.state.lexeme.language}`} />
                    <span>{this.state.lexeme.text}</span>
                    <a className="editLink" href="#" onClick={this.onLexemeEdit}>edit</a>
                    {this.renderWordType()}
                    {this.renderCzGender()}
                    {this.renderCzVerbAspect()}
                    {this.renderPhraseType()}
                </div>
                <p className="translation">
                    <span className={`flag ${this.state.lexeme.translationLang}`} />
                    <span>{this.state.lexeme.translation}</span> 
                    <a className="editLink" href="#" onClick={this.onTranslationEdit}>edit</a>
                </p>
                <p>{this.state.lexeme.note}</p>
                <p><button onClick={this.onSave}>Save</button></p>
                <p><button onClick={this.props.onCancel}>Cancel</button></p>
                <p><button onClick={this.onNotesClicked}>Add notes</button></p>
                <p><button onClick={this.onSwitchLanguages}>Switch languages</button></p>
            </div>
        );
    }

    renderPhraseType() {
        if (this.state.lexeme.language !== Language.NONE && this.state.lexeme.type === LexemeType.PHRASE) {
            return (
                <div>Phrase type: {this.state.lexeme.phraseType}</div>
            );
        }
        return null;
    }

    renderCzVerbAspect() {
        if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.VERB) {
            return (
                <div>Verb aspect: {this.state.lexeme.czVerbAspect}</div>
            );
        }
        return null;
    }

    renderCzGender() {
        if (this.state.lexeme.language === Language.CZECH && this.state.lexeme.wordType === WordType.NOUN) {
            return (
                <div>Gender: {this.state.lexeme.czGender}</div>
            );
        }
        return null;
    }

    renderWordType() {
        if (this.state.lexeme.type === LexemeType.WORD && this.state.lexeme.language !== Language.NONE) {
            return (
                <div>Word type: {this.state.lexeme.wordType}</div>
            );
        }
        return null;
    }
}
