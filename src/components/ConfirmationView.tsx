import * as React from 'react';
import Language from '../enum/Language';
import { Component } from 'react';

export interface Props {
    input: string;
    inputLang: Language;
    translation: string;
    translationLang: Language;
    note: string;
    onInputEdit: () => void;
    onTranslationEdit: () => void;
    onNotesClicked: () => void;
    onCancel: () => void;
    onSave: () => void;
    onSwitchLanguages: () => void;
}

class ConfirmationView extends Component<Props, object> {

    render() {
        var inputFlagClass = 'flag ' + this.props.inputLang;
        var translationFlagClass = 'flag ' + this.props.translationLang;
        return (
            <div className="view confirmationView">
                <p className="input">
                    <span className={inputFlagClass} />
                    <span>{this.props.input}</span>
                    <a className="editLink" href="#" onClick={this.props.onInputEdit}>edit</a>
                </p>
                <p className="translation">
                    <span className={translationFlagClass} />
                    <span>{this.props.translation}</span> 
                    <a className="editLink" href="#" onClick={this.props.onTranslationEdit}>edit</a>
                </p>
                <p>{this.props.note}</p>
                <p><button onClick={this.props.onSave}>Save</button></p>
                <p><button onClick={this.props.onCancel}>Cancel</button></p>
                <p><button onClick={this.props.onNotesClicked}>Add notes</button></p>
                <p><button onClick={this.props.onSwitchLanguages}>Switch languages</button></p>
            </div>
        );
    }
}

export default ConfirmationView;
