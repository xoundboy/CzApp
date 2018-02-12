import Language from '../enum/Language';
import * as React from 'react';
import { ChangeEvent } from 'react';
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

class TranslationView extends React.Component<Props, State> {

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
        var translationFlagClass = 'flag ' + this.props.translationLang;
        var placeholderText = 'Enter the ' + LanguageUtil.getLanguageName(this.props.translationLang) 
            + ' translation for "' + this.props.input + '"';
        return (
            <div className="TranslationView">
                <p>{this.props.input}</p>
                <form onSubmit={this.handleSubmit}>
                    <span className={translationFlagClass} />
                    <input 
                        type="text" 
                        value={this.state.translationValue} 
                        onChange={this.handleInputChange}
                        autoFocus={true}
                        placeholder={placeholderText}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default TranslationView;