import * as React from 'react';
import Lexeme from '../../valueobject/Lexeme';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { KeyboardEvent } from 'react';
import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
import Language from '../../enum/Language';

export interface TranslationViewProps extends LocalizedComponentProps {
    lexeme: Lexeme;
    onSubmit: ((lexeme: Lexeme) => void);
}

export interface TranslationViewState {
    translation: string | null;
    valid: boolean;
}

export default class TranslationView extends LocalizedComponent<TranslationViewProps, TranslationViewState> {

    constructor(props: TranslationViewProps) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentWillMount() {
        this.setState({translation: this.props.lexeme.translation});
    }

    onSubmit() {
        if (!this.state.translation) {
            return;
        }
        let lexeme = Object.assign({}, this.props.lexeme);
        lexeme.translation = this.state.translation;
        this.props.onSubmit(lexeme);
    }

    onKeyUp(event: KeyboardEvent<HTMLInputElement>) {
        if (event.which === 13) {
            this.onSubmit();
        }
    }

    onValueChange(value: string | null) {
        this.setState({translation: value});
    }

    getFlagClassName() {
        return 'flag ' + this.props.lexeme.language;
    }

    getPlaceholderText() {
        return (this.props.lexeme.translationLang === Language.ENGLISH) 
            ? this.getCopy('PLACEHOLDER_TRANSLATION_IN_ENGLISH')
            : this.getCopy('PLACEHOLDER_TRANSLATION_IN_CZECH');
    }

    render() {
        return (
            <div className="view translationView">
                <div className="content">
                    <div>{this.props.lexeme.text}</div>
                    <div className={this.getFlagClassName()} />
                </div>                        
                <div className="content">
                    <ValidatedTextInput
                        value={this.state.translation}
                        placeholderText={this.getPlaceholderText()}
                        autofocus={true}
                        onValueChange={this.onValueChange}
                        onKeyUp={this.onKeyUp}
                    />
                    <div className={`flag ${this.props.lexeme.translationLang}`} />
                    <button onClick={this.onSubmit}>{this.getCopy('BUTTON_SUBMIT')}</button>
                </div>
            </div>
        );
    }
}
