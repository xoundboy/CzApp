import Language from '../enum/Language';
import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import LanguageUtil from '../util/LanguageUtil';

export interface Props {
    input: string;
    inputLang: Language;
    translation: string;
    translationLang: Language;
    onTranslationSubmit: ((translation: string) => void);
}

export interface State {
    translationValue: string;
}

class TranslationView extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {translationValue: props.translation};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.onTranslationSubmit(this.state.translationValue);
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({translationValue: event.target.value});
    }

    render() {
        var inputFlagClass = 'flag ' + this.props.inputLang;
        var placeholderText = 'Enter the ' + LanguageUtil.getLanguageName(this.props.translationLang) 
            + ' translation for "' + this.props.input + '"';
        return (
            <form className="TranslationView" onSubmit={this.handleSubmit}>
                <div className="inputText half">
                    <span className={inputFlagClass} />
                    <span>{this.props.input}</span>
                </div>
                <div className="inputText half">
                    <input
                        type="text"
                        value={this.state.translationValue}
                        onChange={this.handleInputChange}
                        autoFocus={true}
                        placeholder={placeholderText}
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default TranslationView;