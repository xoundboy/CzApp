import * as React from 'react';
import LanguageUtil from '../../util/LanguageUtil';
import Lexeme from '../../valueobject/Lexeme';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { KeyboardEvent } from 'react';

export interface TranslationViewProps {
    lexeme: Lexeme;
    onSubmit: ((lexeme: Lexeme) => void);
}

export interface TranslationViewState {
    translation: string | null;
    valid: boolean;
}

export default class TranslationView extends React.Component<TranslationViewProps, TranslationViewState> {

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

    render() {
        const languageName = LanguageUtil.getLanguageName(this.props.lexeme.translationLang);
        const placeHolderText = `Enter the ${languageName} translation for ${this.props.lexeme.text}`;

        return (
            <div className="view translationView">
                <div className="content">
                    <div>{this.props.lexeme.text}</div>
                    <div className={this.getFlagClassName()} />
                </div>                        
                <div className="content">
                    <ValidatedTextInput
                        value={this.state.translation}
                        placeholderText={placeHolderText}
                        autofocus={true}
                        onValueChange={this.onValueChange}
                        onKeyUp={this.onKeyUp}
                    />
                    <div className={`flag ${this.props.lexeme.translationLang}`} />
                    <button onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}
