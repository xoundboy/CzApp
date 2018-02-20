import * as React from 'react';
import InputViewBase, { InputViewBaseProps, InputViewBaseState } from './InputViewBase';
import Language from '../../enum/Language';
import LanguageUtil from '../../util/LanguageUtil';
import { ChangeEvent } from 'react';

export interface TranslationViewProps extends InputViewBaseProps {
    translation: string;
    translationLang: Language;
}

export interface TranslationViewState extends InputViewBaseState {
    translationValue: string;
}

class TranslationView extends InputViewBase<TranslationViewProps, TranslationViewState> {

    constructor(props: TranslationViewProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
    }

    componentWillMount() {
        this.setState({translationValue: this.props.translation});
    }

    handleSubmit() {
        this.props.onSubmit(this.state.translationValue);
    }

    validateInput() {
        this.valid = this.state.translationValue.length > 0;
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
       this.setState({translationValue: event.target.value});
    }

    render() {
        var translationFlagClass = 'flag ' + this.props.translationLang;
        var placeholderText = 'Enter the ' + LanguageUtil.getLanguageName(this.props.translationLang) 
            + ' translation for "' + this.props.lexeme + '"';
        return (
            <div className="view translationView" onSubmit={this.handleSubmit}>
                <div className="top half">
                    <div className="content">
                        <div>{this.props.lexeme}</div>
                        <div className={this.getFlagClassName()} />
                    </div>                        
                </div>
                <div className="bottom half">
                    <div className="content">
                        <input
                            type="text"
                            value={this.state.translationValue}
                            onChange={this.handleInputChange}
                            autoFocus={true}
                            onKeyPress={this.handleKeyup}
                            placeholder={placeholderText}
                        />
                        <div className={translationFlagClass} />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TranslationView;